"use strict";

const reqi = require("reqi");
const Tidepool = require("./index.js");

const tide = new Tidepool();

tide.spinUp({ keepAlive: true });

console.log(tide.threads);

/* make an async request after ~5 seconds after start-up*/
setTimeout(() => {
  tide.threads[0].urchin.runFn(async () => {
    const client = new reqi({ json: true });
    const res = await client.get("http://example.com");
    return res.statusCode;
  });
}, 5 * 1e3);

/* make am async request ~10 seconds after start-up */
setTimeout(() => {
  tide.threads[0].urchin.runFn(async () => {
    const client = new reqi({ json: true });
    const res = await client.get("http://example.com");
    return res.statusCode;
  });
}, 10 * 1e3);
