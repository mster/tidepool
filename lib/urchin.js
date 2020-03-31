"use strict";

const { Promisify } = require("util");
const crypto = require("crypto");
const path = require("path");
const debug = require("util").debuglog("urchin");

const { Worker } = require("worker_threads");

class Urchin extends Worker {
  constructor(options) {
    if (!options) options = {};

    super(path.resolve(__dirname, "krill.js"));

    this.pid = crypto.randomBytes(3).toString("hex");
    this.keepAlive = options.keepAlive || false;

    this.heartbeat = this.keepAlive ? this.filterFeed() : null;
    this.beats = 0;

    this.busy = false;
  }

  filterFeed = () => {
    return setInterval(() => {
      this.beats++;
      if (this.beats % 10 === 0) {
        /* depends on how annoying you want it to be */
        debug(`urchin ${this.pid}: filter feeding... ${this.beats}`);
      }
    }, 1000);
  };

  runFn = fn => {
    console.log("runFn");
    this.postMessage(fn);
    // let result = fn(data);
    // console.log(this.pid, result);
    // cb(null, data);
    // this.busy = true;
    // if (fn.constructor.name === "AsyncFunction") {
    //   clearTimeout(this.heartbeat);
    //   fn().then(res => {
    //     debug(`ran async fn and got: ${res}`);
    //     this.heartbeat = this.filterFeed();
    //     this.busy = false;
    //     this.emit("complete", res);
    //   });
    // } else {
    //   let res = fn();
    //   debug(`ran fn and got: ${res}`);
    //   this.busy = false;
    //   this.emit("complete", res);
    // }
  };
}

module.exports = Urchin;
