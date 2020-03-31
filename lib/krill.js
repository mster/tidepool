const { workerData, parentPort } = require("worker_threads");

let prt;

parentPort.on("message", value => {
  if (value && value.port) {
    //console.log("value", value);
    prt = value.port;
    prt.postMessage("echo");
  }
  if (value && value.load) {
    console.log(value.load);
    try {
      const payload = require(value.load);
      console.log(payload);

      prt.postMessage(payload(10000));

      //   const client = new payload();
      //   client
      //     .get("http://example.com")
      //     .then(console.log)
      //     .catch(console.error);
    } catch (error) {
      console.error(error);
    }
  }
});
