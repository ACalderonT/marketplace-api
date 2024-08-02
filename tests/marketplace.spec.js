const request = require('supertest');
const server = require('../index');

describe("Operaciones CRUD de productos", () => {
    it("Should return a status code of 200 and the response should be an array with at least one object", async () => {
        const { statusCode: status, body: posts } = await request(server).get("/posts").send()

        expect(status).toBe(200);
        expect(posts.data).toBeInstanceOf(Object)
    })

    it("Should ")
})

