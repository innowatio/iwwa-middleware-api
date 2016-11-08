import axios from "axios";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";

import { apiRequests } from "services/api-requests";

import nock from "nock";

chai.use(chaiAsPromised);

import {
    HOST,
    WRITE_API_ENDPOINT
} from "config";

describe("Expose middleware APIs", () => {

    nock(WRITE_API_ENDPOINT)
        .post("/readings")
        .reply(201, "Element created");

    describe("On readings", () => {

        it("fail for invalid translator", async () => {
            await expect(axios.post(`http://${HOST}/readings/wrong/01`)).to.be.rejectedWith("Request failed with status code 400");
        });

        it("send translated readings", async () => {

            const readings = {
                "sensorId": "IT001E00030554",
                "date": "2015-10-14T15:08:16.652Z",
                "source": "reading",
                "measurements": [{
                    "type": "activeEnergy",
                    "value": 12,
                    "unitOfMeasurement": "kWh"
                }]
            };

            await expect(apiRequests([readings])).to.be.not.rejected;
        });

    });
});
