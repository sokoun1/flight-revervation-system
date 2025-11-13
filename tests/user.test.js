const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const User = require("../models/user");
const should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach((done) => {
    // Before each test we empty the database
    User.remove({}, (err) => {
      done();
    });
  });

  describe("/POST register", () => {
    it("it should register a new user", (done) => {
      let user = {
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      };
      chai
        .request(server)
        .post("/api/users/register")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("User registered successfully");
          done();
        });
    });
  });

  describe("/POST login", () => {
    it("it should login a user", (done) => {
      let user = new User({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });
      user.save((err, user) => {
        chai
          .request(server)
          .post("/api/users/login")
          .send({ email: user.email, password: "password123" })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Logged in successfully");
            done();
          });
      });
    });
  });
});
