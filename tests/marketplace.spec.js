const request = require('supertest');
const server = require('../index');
const jwt = require('jsonwebtoken');

describe("Operaciones CRUD de productos", () => {
    it("Should return a status of 201 when post is created", async () => {
        const newPost = {
            payload:{
                productName: 'new title',
                price: Math.floor(Math.random() * 9999),
                creatorId: 1,
                category: 1
            }
        }

        const payload = { email: 'SomeEmail'};
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        const { statusCode: status } = await request(server)
            .post(`/profile/posts`)
            .set("Authorization", `Bearer ${token}`)
            .send(newPost)

        expect(status).toBe(201)
    })

    it("Should return a status code of 200 and the response should be an array with at least one object", async () => {
        const { statusCode: status, body: posts } = await request(server).get("/posts").send()

        expect(status).toBe(200);
        expect(posts.data).toBeInstanceOf(Object)
    })

    it("Should return a status of 401 when it's no jwt provided", async () => {
        const id = Math.floor(Math.random() * 9999);
        const { statusCode: status } = await request(server).delete(`/profile/posts/:${id}`).send()

        expect(status).toBe(401)
    })

    it("Should return a status of 404 when try to delete a posts that doesn't exists", async () => {
        const id = Math.floor(Math.random() * 9999);
        const payload = { email: 'SomeEmail'};
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        const { status } = await request(server)
            .delete(`/profile/posts/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect(status).toBe(404)
    })
})

