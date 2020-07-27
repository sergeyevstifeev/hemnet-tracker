const axios = require('axios');
const functions = require('firebase-functions');
const hemnetConfig = functions.config().hemnet;

const SEARCH_URL = hemnetConfig.url;
const SUBSCRIPTION_URL = hemnetConfig.subscription_url;

const fetchData = async () => {
    return await axios.get(SEARCH_URL);
}

const fetchSubscriptionPage = async () => {
    const cookie = hemnetConfig.cookie;
    const response = await axios.get(SUBSCRIPTION_URL, {
        headers: {
            'Cookie': cookie
        }
    });
    return response;
}

module.exports = {
    fetchData,
    fetchSubscriptionPage
}