const express = require("express");
const request = require("supertest");
const http = require("http"); // install/create a dummy server
// var proxyquire = require("proxyquire");
const index = require("../server/index");
// const index = proxyquire("../server/index", {
//   mongoose: {
//     set: function() {
//       console.log("set overrided");
//     },
//     connect: function() {
//       console.log("connect override");
//     }
//   }
// });
const server = http.createServer(index.app);

describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});

describe("public route test", function() {
  it("responds with json", async function() {
    console.log("DEBUG", JSON.stringify(index.app, null, 2));
    console.log("DEBUGINDEX", JSON.stringify(index, null, 2));

    const res = await request(server)
      .get("/api/public")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    console.log("res **** ", res);
    // expect(false).toBe(true);
    // done();
  });
});
