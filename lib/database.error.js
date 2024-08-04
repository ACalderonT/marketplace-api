const databaseError = {
    "22P02": {
        code: 400,
        message: "Invalid params value",
    },
    23502: {
        code: 400,
        message: "Bad request",
    },
    23505: {
        code: 409,
        message: "Duplicate value"
    },
    42601: {
        code: 500,
        message: "Syntaxt Error"
    }

};

const getDatabaseError = (code) => {
    return (
        databaseError[code] || { code: 500, message: "Internal Server Error" }
    );
};

module.exports = getDatabaseError