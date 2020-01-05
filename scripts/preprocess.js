var fs = require("fs");
var d3 = require("d3");

// TODO: 
// Add more error handling
// At d3 type casting
// Refactor to call datasf API instead of using CSVs

let geojsonData = {
  "type": "FeatureCollection",
  "features": []
}

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
            name: d.envista_project_name_full,
            type: 'Parklet',
            address: titleCase(d.Permit_Address),
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
            type: 'Park',
            address: d.Address,
            description: `Park subtype: ${d.PropertyType}`
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
            type: 'Privately Owned Public Open Space',
            address: d.POPOS_ADDRESS,
            description: d.Description
          }
        }
      })
      resolve(parsedData);
    });
  }
);

var processFiles = function () {
  Promise.all([readParkletFile, readParksFile, readPoposFile]).then(function(values) {
    geojsonData.features = values[0].concat(values[1]).concat(values[2])
    fs.writeFile("../src/data/locations.geojson", JSON.stringify(geojsonData), function(err) {
      if(err === null) {
        console.log("File written successfully");
      }
    });
  });
};

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}


processFiles();
