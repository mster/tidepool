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
    this.threads.push({ pid: urchin.pid, urchin });
    console.log(
      this.threads.map(urch => {
        return urch.pid;
      })
    );
  }
}

module.exports = Tidepool;
