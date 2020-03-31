"use strict";

const Tidepool = require("./index.js");

const tide = new Tidepool();

let urchin = tide.spinUp({ keepAlive: true });
let speedyUrchin = tide.spinUp({ keepAlive: true });

urchin.postMessage({
  load: "./prime.js"
});

speedyUrchin.postMessage({
  load: "./prime.js"
});

urchin.postMessage({
  exec: 11111111111
});

speedyUrchin.postMessage({
  exec: 9999999999
});

setTimeout(() => {
  let lateUrchin = tide.spinUp({ keepAlive: true });
  lateUrchin.postMessage({ load: "./prime.js" });
  lateUrchin.postMessage({ exec: 42042069 });
}, 20000);
