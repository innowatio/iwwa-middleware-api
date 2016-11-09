import {
    expect
} from "chai";
import nock from "nock";

import {
    apiRequests
} from "services/api-requests";

import {
    WRITE_API_ENDPOINT
} from "config";

describe("Translate readings", () => {

    const reading = {
        "sensorId": "IT001E00030554",
        "date": "2015-10-14T15:08:16.652Z",
        "source": "reading",
        "measurements": [{
            "type": "activeEnergy",
            "value": 18,
            "unitOfMeasurement": "kWh"
        }]
    };

    const matchPost = (body) => {
        return !!(body.sensorId && body.date && body.source);
    };

    beforeEach(() => {
        nock(WRITE_API_ENDPOINT)
            .persist()
            .post("/readings", matchPost)
            .reply(201, "Element created");
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it("send translated readings", async () => {

        const payload = [reading];

        await expect(apiRequests(payload)).to.be.not.rejected;
    });

    it("invalid reading object", async () => {

        const payload = [{
            sensorId: true
        }];

        await expect(apiRequests(payload)).to.be.rejected;
    });

});
