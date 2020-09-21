var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var FileHelper = require('./helpers/Files.js');
const URL = "http://localhost:5000/api/v1";
let city = "";
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

describe('Weather', function () {
    this.timeout(3000);

    it("Location", function (done) {
        chai.request(URL)
            .get("/location")
            .end(function (err, res) {
                FileHelper.saveToFile(__dirname + '/data/location.json', JSON.stringify(res));
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('city');
                chai.expect(JSON.parse(res.text)).to.have.property('region');
                chai.expect(JSON.parse(res.text)).to.have.property('country_name');
                chai.expect(JSON.parse(res.text)).to.have.property('latitude');
                chai.expect(JSON.parse(res.text)).to.have.property('longitude');
                city = JSON.parse(res.text).city;
                done();
            });
    });

    it("Current + city", function (done) {
        chai.request(URL)
            .get("/current/Liniers")
            .end(function (err, res) {
                FileHelper.saveToFile(__dirname + '/data/currentCity.json', JSON.stringify(res));
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('weather');
                chai.expect(JSON.parse(res.text)).to.have.property('main');
                chai.expect(JSON.parse(res.text)).to.have.property('name');
                chai.expect(JSON.parse(res.text).name).equal("Liniers");
                done();
            });
    });
    it("Current no city", function (done) {
        chai.request(URL)
            .get("/current")
            .end(function (err, res) {
                FileHelper.saveToFile(__dirname + '/data/currentCityNo.json', JSON.stringify(res));
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('weather');
                chai.expect(JSON.parse(res.text)).to.have.property('main');
                chai.expect(JSON.parse(res.text)).to.have.property('name');
                let currentCity = removeAccents(JSON.parse(res.text).name);
                chai.expect(currentCity).equal(city);
                done();
            });
    });

    it("forecast + city", function (done) {
        chai.request(URL)
            .get("/forecast/Ramos Mejía")
            .end(function (err, res) {
                FileHelper.saveToFile(__dirname + '/data/forecastCity.json', JSON.stringify(res));
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('list');
                chai.expect(JSON.parse(res.text)).to.have.property('city');
                chai.expect(JSON.parse(res.text).city).to.have.property('name');
                chai.expect(JSON.parse(res.text).city.name).equal("Ramos Mejía");
                done();
            });
    });

    it("Forecast no city", function (done) {
        chai.request(URL)
            .get("/forecast")
            .end(function (err, res) {
                FileHelper.saveToFile(__dirname + '/data/forecastCityNo.json', JSON.stringify(res));
                chai.expect(res.status).to.equal(200);
                chai.expect(res).to.be.json;
                chai.expect(res).to.have.property('status');
                chai.expect(res).to.have.property('text');
                chai.expect(JSON.parse(res.text)).to.have.property('list');
                chai.expect(JSON.parse(res.text)).to.have.property('city');
                chai.expect(JSON.parse(res.text).city).to.have.property('name');
                let currentCity = removeAccents(JSON.parse(res.text).city.name);
                chai.expect(currentCity).equal(city);
                done();
            });
    });

    after(function (done) {
        done();
    });

});