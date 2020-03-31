"use strict";

const debug = require("util").debuglog("tidepool");

const Urchin = require("./urchin.js");

const {
  Worker,
  MessageChannel,
  MessagePort,
  isMainThread,
  parentPort
} = require("worker_threads");

class Tidepool {
  constructor(options) {
    this.pid = process.pid;
    this.threads = [];

    debug("new tidepool created");
  }

  spinUp(options) {
    const urchin = new Urchin(options);

    let { port1, port2 } = new MessageChannel();
    urchin.postMessage({ port: port1 }, [port1]);

    port2.on("message", console.log);

    this.threads.push({ pid: urchin.pid, urchin });
    console.log(
      this.threads.map(urch => {
        return urch.pid;
      })
    );
    return urchin;
  }
}

module.exports = Tidepool;
