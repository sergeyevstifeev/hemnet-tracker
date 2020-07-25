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
            logger.info('Saved apartment', { id });
        }
    });
}

const saveLastStatus = async (timestamp, status) => {
    const lastStatusRef = db.ref(`hemnet/lastStatus`);
    const statusRecord = { timestamp, status };

    await lastStatusRef.set(statusRecord);
    logger.info('Saved last status', statusRecord);
}

module.exports = {
    saveApartment,
    saveLastStatus
}