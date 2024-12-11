const express = require("express");
const multer = require("multer");
const { ref, set, push, get } = require("firebase/database");
const database = require("../firebase-config");
const sanitizeEmailForFirebase = require("../utils/sanitizeEmail");
const upload = multer();

const resourceRouter = express.Router();

resourceRouter.get("/history", upload.none(), async (req, res) => {
  const email = req.query.email;
  const sanitizedEmail = sanitizeEmailForFirebase(email);
  try {
    const historyRef = ref(database, `users/${sanitizedEmail}/history`);
    const snapshot = await get(historyRef);
    const history = snapshot.exists() ? snapshot.val() : null;
    const historyData = history
      ? Object.entries(history).map(([key, value]) => ({
          id: key,
          ...value,
        }))
      : {};

    return res.status(200).json({ data: historyData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to push the data", error: error.message });
  }
});

resourceRouter.post("/favourite", upload.none(), async (req, res) => {
  const email = req.body.email;
  const sanitizedEmail = sanitizeEmailForFirebase(email);
  const dataId = req.body.id;
  try {
    const snapshot = await get(
      ref(database, `users/${sanitizedEmail}/history/${dataId}`)
    );
    if (!snapshot.val().favourite) {
      await set(
        ref(database, `users/${sanitizedEmail}/history/${dataId}/favourite`),
        true
      );
    } else {
      await set(
        ref(database, `users/${sanitizedEmail}/history/${dataId}/favourite`),
        false
      );
    }
    return res.status(200).json({ message: "success!!" });
  } catch (error) {
    return res.status(200).json({ message: "failed!!", error: error.message });
  }
});

resourceRouter.delete("/history", upload.none(), async (req, res) => {
  const email = req.body.email;
  const sanitizedEmail = sanitizeEmailForFirebase(email);
  try {
    await set(ref(database, `users/${sanitizedEmail}/history`), null);
    return res.status(200).json({ message: "History deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete history.", error: error.message });
  }
});

resourceRouter.get("/favourite", upload.none(), async (req, res) => {
  const email = req.query.email;
  const sanitizedEmail = sanitizeEmailForFirebase(email);

  try {
    const snapshot = await get(
      ref(database, `users/${sanitizedEmail}/history`)
    );

    const historyData = snapshot.val();
    const favourites = Object.entries(historyData ? historyData : {})
      .filter(([key, value]) => value.favourite === true)
      .map(([key, value]) => ({ id: key, ...value }));

    return res.status(200).json({ data: favourites });
  } catch (error) {
    return res.json({
      Message: "failed to fetch the favourite data",
      error: error.message,
    });
  }
});

module.exports = resourceRouter;
