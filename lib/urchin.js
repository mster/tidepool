"use strict";

const crypto = require("crypto");
const path = require("path");
const debug = require("util").debuglog("urchin");

const { Worker } = require("worker_threads");

class Urchin extends Worker {
  constructor(options) {
    if (!options) options = {};

    super(path.resolve(__dirname, "noop.js"));

    this.pid = crypto.randomBytes(3).toString("hex");
    this.keepAlive = options.keepAlive || false;

    this.heartbeat = this.keepAlive ? this.filterFeed() : null;
    this.beats = 0;
  }

  filterFeed = () => {
    return setInterval(() => {
      this.beats++;
      if (this.beats % 1 === 0) {
        /* depends on how annoying you want it to be */
        debug(`urchin ${this.pid}: filter feeding... ${this.beats}`);
      }
    }, 1000);
  };

  runFn = async fn => {
    if (fn.constructor.name === "AsyncFunction") {
      clearTimeout(this.heartbeat);
      fn().then(res => {
        debug(`ran async fn and got: ${res}`);
        this.heartbeat = this.filterFeed();
        return res;
      });
    } else {
      let res = fn();
      debug(`ran fn and got: ${res}`);
      return res;
    }
  };
}

module.exports = Urchin;
