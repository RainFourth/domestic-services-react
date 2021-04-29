
//const morgan = require("morgan");


const proxy = require("http-proxy-middleware");

module.exports = app => {
    /*app.use(
        "/",
        proxy.createProxyMiddleware({
            target: "http://localhost:5000",
            changeOrigin: true,
        })
    );*/

    //app.use(morgan('combined'));
};

/*
Note:
You do not need to import this file anywhere.
It is automatically registered when you start the development server.

Note:
This file only supports Node's JavaScript syntax.
Be sure to only use supported language features (i.e. no support for Flow, ES Modules, etc).

Note:
Passing the path to the proxy function allows you to use globbing and/or pattern matching on the path,
which is more flexible than the express route matching.
 */





/*
With this configuration,
a request made to http://localhost:3000/api/foo
will be forwarded to http://localhost:4000/api/v1/foo.
 */
/*
module.exports = app => {
    app.use(
        "/api",
        proxy({
            target: "http://localhost:3000",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "/api/v1"
            }
        })
    );

    app.use(morgan('combined'));
};*/
