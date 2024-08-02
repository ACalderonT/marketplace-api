const bcript = require('bcryptjs');

const handleHashPassword = async (password) => {
    const passwordHash = await bcript.hash(password, 10);
    return passwordHash;
}

const handleVerifyPasswordHash = async (password, passwordHashed) => {
    const isMatch = await bcript.compare(password, passwordHashed);
    return isMatch;
}

module.exports = {handleHashPassword, handleVerifyPasswordHash }