const express = require("express");
const request = require("supertest"); //http testing in jasmine, simulates making request to my app
const axios = require("axios");
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

// describe("private route test", function() {
//   it("responds with error if no token is provided", async function() {
//     // different language comes from request from supertest
//     const res = await request(index.app)
//       .get("/private")
//       .expect(401);
//   });
// });

describe("private route test", function() {
  let token;
  beforeAll(async function() {
    console.log("inside beforeAll");

    const options = {
      method: "POST",
      url: "https://princess-minina.auth0.com/oauth/token",
      headers: { "content-type": "application/json" },
      data: {
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: process.env.AUTH0_AUDIENCE,
        grant_type: "client_credentials"
      }
    };

    const res = await axios(options);
    // console.log(res);
    token = res.data.access_token;
    // console.log({ token });
  });
  afterAll(function() {
    // TODO: expire the token after we are done!!!
  });
  it("responds with message if token is provided", async function() {
    // different language comes from request from supertest
    const res = await request(index.app)
      .get("/private")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    // different language: JASMINE
    expect(res.body).toEqual({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
    });
  });
});
