var fs = require("fs");
var d3 = require("d3");

let dataArr = [];

// fs.writeFile("data.json", JSON.stringify(filteredDataArr), function(err) {
//   console.log("file written");
// });

// function readParklets(filename, enc) {
//   return new Promise(function(resolve, reject) {
//       fs.readFile(filename, enc, function(err, data){
//           if (err) 
//               reject(err); 
//           else
//               resolve(data);
//       });
//   });
// };

var readParkletFile = new Promise(
  function (resolve, reject) {
    fs.readFile("../data/parklet.csv", "utf8", function(error, data) {
      let parsedData = d3.csvParse(data, function(d) {
        return {
          name: d.Applicant,
          address: d.Permit_Address,
          lngLat: [parseFloat(d.Longitude), parseFloat(d.Latitude)]
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
          name: d.Map_Label,
          address: d.Address,
          lngLat: [parseFloat(d.Longitude), parseFloat(d.Latitude)]
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
          name: d.NAME,
          address: d.POPOS_ADDRESS,
          lngLat: [parseFloat(rawLngLat[1]), parseFloat(rawLngLat[2])]
        }
      })
      resolve(parsedData);
    });
  }
);

var processFiles = function () {
  Promise.all([readParkletFile, readParksFile, readPoposFile]).then(function(values) {
    dataArr = values[0].concat(values[1]).concat(values[2])
    console.log(dataArr[53])
    fs.writeFile("data.json", JSON.stringify(dataArr), function(err) {
      console.log("file written");
    });
  });
};

processFiles();
