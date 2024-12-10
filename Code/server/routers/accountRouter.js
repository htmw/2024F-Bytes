const express = require("express");
const multer = require("multer");
const { ref, set, get, push, remove } = require('firebase/database');
const database = require("../firebase-config");
const sanitizeEmailForFirebase = require("../utils/sanitizeEmail");
const upload = multer();
const accountRouter = express.Router();


// sign up endpoint
accountRouter.post("/signup", upload.none(), async (req, res) => {
    const email = req.body.email;
    const sanitizedEmail = sanitizeEmailForFirebase(email); 
    const password = req.body.password;
    const name = req.body.name;

    try {
        const snapshot = await get(ref(database, `users/${sanitizedEmail}`));
        if (snapshot.exists()) {
            return res
                .status(400)
                .json({ "message": "The user already exists, log in." });
        }

        await set(ref(database, `users/${sanitizedEmail}`), {
            name: name,
            password: password,
            theme : "light",
        });

        return res.status(200).json({ "message": "You are signed up!!!" });
    } catch (error) {
        return res.json({ "message": "Server failed!!!", "error": error.message });
    }
});

// log in endpoint
accountRouter.post("/login", upload.none(), async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const sanitizedEmail = sanitizeEmailForFirebase(email); 
    try{
        const snapshot = await get(ref(database, `users/${sanitizedEmail}`));
        if(!snapshot.exists()){
            return res
            .status(400)
            .json({ "message": "Wrong Credentials!!!" });
        }
        if(snapshot.val().password===password){
            return res.status(200).json({ "message": "You are logged in!!!" });
        }else{
            return res
            .status(400)
            .json({ "message": "Wrong Credentials!!!" });
        }
    }catch(error){
        return res.json({"error": error.message});
    }
});

module.exports = accountRouter;
