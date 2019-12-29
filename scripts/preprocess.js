var fs = require("fs");
var d3 = require("d3");

fs.readFile("../data/parks.csv", "utf8", function(error, data) {
  data = d3.csvParse(data);
  let d = data.map((d) => {
    return {
      name: d.Map_Label,
      address: d.Address,
      latitude: d.Latitude,
      longitude: d.Longitude
    }
  })
  console.log(d)
});

fs.readFile("../data/parklet.csv", "utf8", function(error, data) {
  data = d3.csvParse(data);
  let d = data.map((d) => {
    return {
      name: d.Applicant,
      address: d.Permit_Address,
      latitude: d.Latitude,
      longitude: d.Longitude
    }
  })
  console.log(d)
});

fs.readFile("../data/popos.csv", "utf8", function(error, data) {
  data = d3.csvParse(data);
  let d = data.map((d) => {
    return {
      name: d.NAME,
      address: d.POPOS_ADDRESS,
      latLng: d.the_geom
    }
  })
  console.log(d)
});

