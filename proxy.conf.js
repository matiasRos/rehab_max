const PROXY_CONFIG = [
    {
      context: [
        "/stock-pwfe",
      ],
      "target": "https://gy7228.myfoscam.org:8443",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true,
      "pathRewrite": {
        "^/": ""
      }
    }
  ];
  
  module.exports = PROXY_CONFIG;
  