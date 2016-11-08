import axios from "axios";
import {
    map
} from "bluebird";

import {
    WRITE_API_ENDPOINT
} from "config";

export async function apiRequests(readings) {
    return await map(readings, async (reading) => {
        const result = await axios.post(`${WRITE_API_ENDPOINT}/readings`, reading);
    });
}
