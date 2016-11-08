import bodyParser from "body-parser";
import bunyanRequest from "bunyan-request";
import express from "express";

import api from "api";
import * as config from "config";
import log from "services/logger";

express()
    .use(bunyanRequest({
        logger: log
    }))
    .use(api)
    .use(bodyParser.json({
        limit: "10mb"
    }))
    .use(bodyParser.urlencoded({
        limit: "10mb",
        extended: true,
        parameterLimit: 50000
    }))
    .listen(config.PORT, () => {
        log.info(`Server listening on port ${config.PORT}`);
        // Setup external deps
    });
