const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    createProxyMiddleware(['https://staging1.farmec.ro/rest/V1/farmec/deeparProducts/','https://staging1.farmec.ro'], { target: "https://farmec.herokuapp.com/" })
  );
};