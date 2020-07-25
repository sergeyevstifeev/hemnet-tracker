const functions = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.database();
const logger = functions.logger;

const saveApartment = (apartment) => {
    const id = apartment['id'];
    var ref = db.ref(`apartments/${id}`);
    ref.once("value", async (snapshot) => {
        if (!snapshot.exists()) {
            const apartmentRef = db.ref(`apartments/${id}`);

            await apartmentRef.set(apartment);
            logger.info('Saved apartment with id:', id);
        }
    });
}

const saveLastSuccess = async (timestamp) => {
    const lastSuccessRef = db.ref(`hemnet/lastSuccess`);

    await lastSuccessRef.set(timestamp);
    logger.info('Saved last success:', timestamp);
}

module.exports = {
    saveApartment,
    saveLastSuccess
}