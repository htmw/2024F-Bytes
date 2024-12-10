const sanitizeEmailForFirebase = (email) => {
    return email.replace(/[@.]/g, (match) => {
        if (match === '@') return '_at_';
        if (match === '.') return '_dot_';
    });
};

module.exports = sanitizeEmailForFirebase;