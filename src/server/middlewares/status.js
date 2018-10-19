function status(req, res, next) {
    res.status(200).json({status: 'up'})
}

export default status;
