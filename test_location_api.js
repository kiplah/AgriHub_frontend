const axios = require('axios');

async function testApi() {
    try {
        const query = "londiani";
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=ke&addressdetails=1&limit=15`;
        console.log(`Fetching: ${url}`);
        const response = await axios.get(url, { headers: { 'User-Agent': 'AgroMart-Test/1.0' } }); // Nominatim requires User-Agent
        console.log("Status:", response.status);
        console.log("Data length:", response.data.length);
        console.log("First 3 results:");
        response.data.slice(0, 3).forEach(item => {
            console.log(`- ${item.display_name}`);
        });
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testApi();
