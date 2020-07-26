const axios = require('axios');
const functions = require('firebase-functions');
const hemnetConfig = functions.config().hemnet;

const SEARCH_URL = hemnetConfig.url;

const fetchData = async (timestamp) => {
    const cookie = hemnetConfig.cookie;
    const response = await axios.get(SEARCH_URL, {
        headers: {
            'Cookie': cookie
        }
    });
    return response;
}

module.exports = {
    fetchData
}