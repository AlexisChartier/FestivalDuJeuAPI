module.exports = (req) => {
    return req.user.role === 4;
}