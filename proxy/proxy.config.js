const PROXY_KEYS = require('./proxy-keys');

module.exports = {
  [PROXY_KEYS.PROXY_PATH]: {
    target: "http://localhost:3000/api/v1",
    secure: false,
    changeOrigin: true,
    pathRewrite: PROXY_KEYS.PROXY_PATH_REWRITE,
    logLevel: "debug"
  }
};
