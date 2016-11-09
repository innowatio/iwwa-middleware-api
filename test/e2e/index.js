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

        it("success for valid kerberos readings object", async () => {
            await request(server)
                .post("/readings/kerberos/2")
                .send({
                    "hn": "TESTDATA",
                    "items": [
                        {
                            "sn": "ZTH01",
                            "iName": "LQI",
                            "ts": "2016-06-27T15:24:59Z",
                            "qu": 0,
                            "va": 60,
                            "un": ""
                        },
                        {
                            "sn": "ZTH01",
                            "iName": "Temperature",
                            "ts": "2016-06-17T15:24:59Z",
                            "qu": 0,
                            "va": 18.000002,
                            "un": "ï¿½C"
                        },
                        {
                            "sn": "ZTH01",
                            "iName": "Humidity",
                            "ts": "2016-06-17T15:24:59Z",
                            "qu": 0,
                            "va": 55,
                            "un": ""
                        },
                        {
                            "sn": "ZTH01",
                            "iName": "Light",
                            "ts": "2016-06-17T15:24:59Z",
                            "qu": 0,
                            "va": 0,
                            "un": "lx"
                        },
                        {
                            "sn": "ZTH01",
                            "iName": "Voltage",
                            "ts": "2016-06-17T15:24:59Z",
                            "qu": 0,
                            "va": 3.29,
                            "un": "V"
                        }
                    ]
                })
                .expect(201);
        });

        it("success for valid standard readings object", async () => {
            await request(server)
                .post("/readings/standard/2")
                .send({
                    "ID": 47,
                    "D": "2016-07-14T00:00:42+02:00",
                    "S": 0,
                    "devices": [{
                        "clv_cod": "LUX1648",
                        "iwwa_cod": "",
                        "values": "TRUE;39210;2e01;2;0;0;0;1;100"
                    }, {
                        "clv_cod": "ANZ01",
                        "iwwa_cod": "",
                        "values": "235;0;0;235;0;235;49990;35;37;34;37;40;36;-330;0;0;-3;-3;-2;-2;8;22518200;-467950;0;-970;1000;-540;1"
                    }, {
                        "clv_cod": "ASTR01",
                        "iwwa_cod": "",
                        "values": "0;0;50;2016-07-18T05:48:49;2016-07-18T20:59:04;2016-07-18T05:13:08;2016-07-18T21:34:45;50"
                    }, {"clv_cod": "LUX01", "iwwa_cod": "", "values": "FALSE;1334970;51;2;0;0;0"}],
                    "ERR": {}
                })
                .expect(201);
        });
    });
});
