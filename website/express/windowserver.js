let Service = require("node-windows").Service;

let svc = new Service({
  name: "WebClientTest", //服务名称
  description: "WebClient项目NodeJs服务器", //描述
  script: "D:/WebClient/Code/webclient-javascript-vue/express/server/bin/www", //nodejs项目要启动的文件路径
});

svc.on("install", () => {
  svc.start();
});

svc.on("uninstall", function() {
  console.log("Uninstall complete.");
  console.log("The service exists: ", svc.exists);
});

svc.install();
// Uninstall the service.
// svc.uninstall();
