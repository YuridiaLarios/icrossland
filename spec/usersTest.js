const express = require("express");
const request = require("supertest"); //http testing in jasmine, simulates making request to my app
var proxyquire = require("proxyquire");
const index = proxyquire("../server/index", {
  mongoose: {
    set: function() {
      console.log("set overrided");
    },
    connect: function() {
      console.log("connect override");
    }
  }
});
// console.log({ index });

describe("A suite is just a function", function() {
  var a;

  it("and so is a spec", function() {
    a = true;

    expect(a).toBe(true);
  });
});

describe("public route test", function() {
  it("responds with json", async function() {
    const res = await request(index.app)
      .get("/api/public")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
