import {
    MongoClient
} from "mongodb";

import {
    DB_URL,
    DB_NAME
} from "../config";

var mongoClientInstance;

export async function getMongoClient() {

    if (!mongoClientInstance) {
        mongoClientInstance = await MongoClient.connect(`${DB_URL}/${DB_NAME}`);
    }

    return mongoClientInstance;
}
