module.exports = (errors) => {
    let errorsArray = [];
    errors.forEach(error => {
        errorsArray.push(error.msg);
    });
    return errorsArray;
}