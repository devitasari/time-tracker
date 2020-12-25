module.exports = (err, req, res, next) => {
    let status, error = []
    console.log(err.name)

    if (err.name === 'ValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        status = 400
        for (let key in err.errors) {
            error.push(err.errors[key].message)
        }
    } else if (err.name === 'CastError') {
        status = 404
        error.push('Data not found')
    } else {
        status = 400
        error.push(err.message)
    }

    res.status(status).json({error})
}