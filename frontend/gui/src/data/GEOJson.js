const countyData = require("./CountyData.json");

const countyGEOJson = countyData.map((county) => ({
  description:
    county.CountyName + ", population: " + String(county.PopulationCensus16),
  type: "County",
  icon: {
    url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
  },
  properties: {
    id: county.CountyName,
    number: county.PopulationCensus16,
  },
  geometry: {
    type: "Point",
    pos: {
      lat: parseFloat(county.Lat),
      lng: parseFloat(county.Long),
    },
  },
}));

const GEOJson = countyGEOJson;

export default GEOJson;
