"use strict";

const reqi = require("reqi");
const Tidepool = require("./index.js");

const tide = new Tidepool();

let urchin = tide.spinUp({ keepAlive: true });

function fn() {
  console.log("hello wurld");
}

let fn2 = Object.assign({}, { fn });
console.log(fn2);

urchin.postMessage({
  load: "/home/m/code/worker-threads/tidepool/lib/prime.js"
});
