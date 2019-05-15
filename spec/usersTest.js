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
    // different language comes from request from supertest
    const res = await request(index.app)
      .get("/public")
      .expect(200)
      .expect("Content-Type", /json/);

    // console.log(res);
    // different language: JASMINE
    expect(res.body).toEqual({
      message:
        "Hello from a public endpoint! You don't need to be authenticated to see this."
    });
  });
});

describe("private route test", function() {
  it("responds with error if no token is provided", async function() {
    // different language comes from request from supertest
    const res = await request(index.app)
      .get("/private")
      .expect(401);
  });
});
