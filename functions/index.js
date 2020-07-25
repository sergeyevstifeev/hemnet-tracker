const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const hemnetCrawler = require('./hemnetCrawler');
const firebaseDb = require('./firebaseDb');
const telegram = require('./telegram');

const REGION = 'europe-west1';
const logger = functions.logger;

const scheduledFunction = functions.region(REGION).pubsub.schedule('every 5 minutes').onRun(async (context) => {
    logger.debug(`Context: ${JSON.stringify(context)}`);
    const hemnetResponse = await hemnetCrawler.fetchData();
    logger.debug('Got response from Hemnet successfully');
    const parsedData = JSON.parse(JSON.stringify(hemnetResponse.data));

    const apartments = parsedData['properties'];
    apartments.forEach((apartment) => {
        firebaseDb.saveApartment(apartment);
    });

    firebaseDb.saveLastSuccess(context['timestamp']);

    return null;
});

const notifyOfNewApartmentsFunction = functions.region(REGION).database.ref('apartments/{apartmentId}').onCreate(async (snap, context) => {
    const apartment = snap.val();
    logger.log('Apartment has been created, id: ', apartment.id);
    await telegram.sendMessage(apartment);
});

module.exports = {
    scheduledFunction,
    notifyOfNewApartmentsFunction
}