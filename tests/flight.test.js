const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const Flight = require("../models/flight");
const should = chai.should();
chai.use(chaiHttp);

describe("Flights", () => {
  beforeEach(async () => {
    await Flight.deleteMany({});
  });

  describe("/GET flights", () => {
    it("it should GET all the flights", (done) => {
      chai
        .request(server)
        .get("/api/flights")
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a("object");
          // res.body.flights.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST flight", () => {
    it("it should POST a new flight", (done) => {
      let flight = {
        FlightNumber: "C12345",
        DepartureDateTime: "2023-10-10T10:00:00Z",
        ArrivalDateTime: "2023-10-10T14:00:00Z",
        OriginAirportCode: "JFK",
        DestinationAirportCode: "LAX",
        AvailableSeats: 200,
        AirlineID: "60e5f4c8f75b444b4e5fc4c7",
      };
      chai
        .request(server)
        .post("/api/flights")
        .send(flight)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.flight.should.be.a("object");
          // res.body.should.have.property("flight");
          res.body.flight.should.have.property("FlightNumber");
          res.body.flight.should.have.property("DepartureDateTime");
          res.body.flight.should.have.property("ArrivalDateTime");
          res.body.flight.should.have.property("OriginAirportCode");
          res.body.flight.should.have.property("DestinationAirportCode");
          res.body.flight.should.have.property("AvailableSeats");
          res.body.flight.should.have.property("AirlineID");
          done();
        });
    });
  });
});
