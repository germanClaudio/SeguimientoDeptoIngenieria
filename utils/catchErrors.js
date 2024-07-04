function catchError400(req, res, next) {
    const err = new Error('No existen Proyectos Cargados')
    err.dirNumber = 400
    return next(err)
}

function catchError500(err, req, res, next) {
    err.dirNumber = 500
    return next(err)
}

module.exports = {
    catchError400,
    catchError500
}