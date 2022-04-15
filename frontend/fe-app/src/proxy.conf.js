const PROXY_CONFIG = [
  {
    context: [
      "/auth/**"
    ],
    target: "http://localhost:8180",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  },
  {
    context: [
      "/books"
    ],
    target: "http://localhost:8400",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
]

module.exports = PROXY_CONFIG;
