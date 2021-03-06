import {v4} from "node-uuid";

import {apiRequests} from "services/api-requests";
import log from "services/logger";

const standardTranslator = "standard";
const kerberosTranslator = "kerberos";
const translatorEnum = [standardTranslator, kerberosTranslator];

export const path = "/readings/:translator/:installationId";
export const method = "post";
export const description = "Send and translate new readings";
export const parameters = [
    {
        name: "installationId",
        in: "path",
        required: true
    }, {
        name: "translator",
        in: "path",
        required: true,
        schema: {
            type: "string",
            enum: [...translatorEnum]
        }
    }
];

export const responses = {
    "201": {
        description: "Readings traslated"
    }
};

export async function handler(req, res) {

    const {
        installationId,
        translator
    } = req.params;

    log.info({
        installationId,
        translator
    });

    let readings = [req.body];

    switch (translator) {
        case standardTranslator:
            // invoke clv-standard-translator
            break;
        case kerberosTranslator:
            // invoke clv-kerberos-translator
            break;
    }

    await apiRequests(readings);

    res.status(201).send({id: v4()});
}
