const PROXY_CONFIG = [
    {
      context: [
        "/interfisa/cuenta-digital-web/api/",
      ],
      "target": "https://desa02.konecta.com.py:",
      "secure": false,
      "logLevel": "debug",
      "changeOrigin": true,
      "pathRewrite": {
        "^/": ""
      }
    }
  ];
  
  module.exports = PROXY_CONFIG;
  