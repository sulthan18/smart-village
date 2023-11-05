const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/smartGovernmentData.json');

// Membaca data Smart Government dari berkas JSON
function getSmartGovernmentData() {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
}

module.exports = {
  getServices: (req, res) => {
    const smartGovernmentData = getSmartGovernmentData();
    res.json(smartGovernmentData.services);
  }
};
