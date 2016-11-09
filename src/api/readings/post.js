import {
    v4
} from "node-uuid";

import {
    apiRequests
} from "services/api-requests";
import log from "services/logger";

import * as kerTranslator from "clv-kerberos-translator";
import * as stdTranslator from "clv-standard-translator";

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

    let readings;

    try {
        switch (translator) {
            case standardTranslator:
                readings = stdTranslator.ParsingFunction(req.body, installationId);
                break;
            case kerberosTranslator:
                readings = kerTranslator.ParsingFunction(req.body, installationId);
                break;
        }
    } catch (error) {
        log.info(error);
        throw error;
    }

    await apiRequests(readings);

    res.status(201).send({
        id: v4()
    });
}
