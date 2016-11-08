import convexpress from "convexpress";

import * as config from "config";
import * as readingsConvroute from "api/readings/post";

const options = {
    info: {
        title: "iwwa-middleware-api",
        version: "0.0.1"
    },
    host: config.HOST
};

export default convexpress(options)
    .serveSwagger()
    // Readings
    .convroute(readingsConvroute);
