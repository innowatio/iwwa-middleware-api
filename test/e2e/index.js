import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import express from "express";
import nock from "nock";
import request from "supertest-as-promised";

import api from "api";

const server = express().use(api);

chai.use(chaiAsPromised);

import {
    WRITE_API_ENDPOINT
} from "config";

describe("Expose middleware APIs", () => {

    describe("On readings", () => {

        const matchPost = (body) => {
            return !!(body.sensorId && body.date && body.source && body.measurements);
        };

        nock(WRITE_API_ENDPOINT)
            .post("/readings", matchPost)
            .reply(201, "Element created");

        it("fail for invalid translator", async () => {
            await request(server)
                .post("/readings/wrong/01")
                .expect(400);
        });

        it("fail for invalid readings object", async () => {
            await request(server)
                .post("/readings/kerberos/2")
                .send({
                    asd: true
                })
                .expect(500);
        });

        it("send translated readings", async () => {
            const reading = {
                "sensorId": "IT001E00030554",
                "date": "2015-10-14T15:08:16.652Z",
                "source": "reading",
                "measurements": [{
                    "type": "activeEnergy",
                    "value": 7,
                    "unitOfMeasurement": "kWh"
                }]
            };

            await request(server)
                .post("/readings/standard/1")
                .send(reading)
                .expect(201);
        });
    });
});
