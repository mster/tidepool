const { workerData, parentPort } = require("worker_threads");

let prt;
let fn;

parentPort.on("message", value => {
  if (value && value.port) {
    prt = value.port;
    prt.postMessage("message chann established");
  }
  if (value && value.load) {
    console.log("asked to load", value.load);
    try {
      const payload = require(value.load);
      fn = payload;
      console.log("fn", fn);
    } catch (error) {
      console.error(error);
    }
  }

  if (value && value.exec && fn) {
    console.log("exec fn with value", value.exec);
    let res = fn(value.exec);
    console.log(res);
  }
});
