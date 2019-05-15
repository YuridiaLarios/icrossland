const express = require("express");
const supertest = require("supertest");

describe("A suite to fail", function() {
  var a;

  it("and so is a spec", function() {
    a = false;

    expect(a).toBe(true);
  });

  it("number testing is a spec", function() {
    a = 3;

    expect(a).toBe(5);
  });
});
