import axios from "axios";
import {
    map
} from "bluebird";

import log from "services/logger";

import {
    WRITE_API_ENDPOINT
} from "config";

export async function apiRequests(readings) {
    return await map(readings, async (reading) => {
        await axios.post(`${WRITE_API_ENDPOINT}/readings`, reading);
    }).catch(error => {
        log.info(error);
        throw error;
    });
}
