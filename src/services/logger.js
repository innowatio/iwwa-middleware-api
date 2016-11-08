import bunyan from "bunyan";

export default bunyan.createLogger({
    name: "iwwa-middleware-api",
    streams: [
        {
            stream: process.stdout
        }
    ].filter(i => !!i)
});
