const getLogs = (req, res) => {

    req.logger.fatal("Prueba fatal");
    req.logger.error("Prueba error");
    req.logger.warning("Prueba warning");
    req.logger.info("Prueba info");
    req.logger.http("Prueba http");
    req.logger.debug("Prueba debug");
    res.send({message: 'Logger test'})
};

export { getLogs };
