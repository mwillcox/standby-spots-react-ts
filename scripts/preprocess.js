var fs = require("fs");
var d3 = require("d3");

// TODO: 
// Add more error handling
// At d3 type casting
// Refactor to call datasf API instead of using CSVs

let dataArr = [];

var readParkletFile = new Promise(
  function (resolve, reject) {
    fs.readFile("../data/parklet.csv", "utf8", function(error, data) {
      let parsedData = d3.csvParse(data, function(d) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(d.Longitude), parseFloat(d.Latitude)]
          },
          properties: {
            name: d.Applicant,
            address: d.Permit_Address,
          }
        };
      });
      resolve(parsedData);
    });
  }
);

var readParksFile = new Promise(
  function (resolve, reject) {
    fs.readFile("../data/parks.csv", "utf8", function(error, data) {
      let parsedData = d3.csvParse(data, function(d) {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(d.Longitude), parseFloat(d.Latitude)]
          },
          properties: {
            name: d.Map_Label,
            address: d.Address
          }
        }
      });
      resolve(parsedData);
    });
  }
);

var readPoposFile = new Promise(
  function (resolve, reject) {
    fs.readFile("../data/popos.csv", "utf8", function(error, data) {
      let parsedData = d3.csvParse(data, function(d) {
        let rawLngLat = d.the_geom.replace(/[POINT()]/g, '').split(" ");
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(rawLngLat[1]), parseFloat(rawLngLat[2])]
          },
          properties: {
            name: d.NAME,
            address: d.POPOS_ADDRESS
          }
        }
      })
      resolve(parsedData);
    });
  }
);

var processFiles = function () {
  Promise.all([readParkletFile, readParksFile, readPoposFile]).then(function(values) {
    dataArr = values[0].concat(values[1]).concat(values[2])
    fs.writeFile("../src/data/locations.json", JSON.stringify(dataArr), function(err) {
      if(err === null) {
        console.log("File written successfully");
      }
    });
  });
};

processFiles();
