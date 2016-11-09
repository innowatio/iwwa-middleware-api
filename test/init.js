import * as stdTranslator from "clv-standard-translator";

import {
    getMongoClient
} from "services/mongo-db";

import * as config from "config";

import devices from "./devices.json";

export async function setUp() {

    const db = await getMongoClient();

    await db.createCollection(config.ANAGRAPHICS_COLLECTION);
    await db.collection(config.ANAGRAPHICS_COLLECTION).insert(devices);

    await stdTranslator.SetupFromDBPromise(config.DB_URL, config.DB_NAME);
    stdTranslator.EnableScheduledCaching("*/5 * * * *", config.DB_URL, config.DB_NAME);
}

export async function tearDown() {
    const db = await getMongoClient();
    await db.dropCollection(config.ANAGRAPHICS_COLLECTION);
}
