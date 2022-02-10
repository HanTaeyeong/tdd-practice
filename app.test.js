const request = require('supertest')
const app = require('./app.js')

describe('Todos API', () => {
    it('GET /todos -> todos array', async () => {
        const res = await request(app).get('/todos')
        expect(res.body).toBeInstanceOf(Array)
        expect(res.body[0]).toBeInstanceOf(Object);
        expect(res.body).toEqual([{ id: 123, name: 'adsf', done: false }])
        expect(res.status).toBe(200)
    })

    it('GET/ todos/id -> todo by ID', async () => {
        const res = await request(app).get('/todos/123')
        expect(res.status).toBe(200)
        expect(res.body).toEqual({ id: 123, name: 'adsf', done: false })
    })

    it('GET/ todos/id -> 404 not found todo by ID', async () => {
        const res = await request(app).get('/todos/153534999')
        expect(res.status).toBe(404)
    })

    it('POST /todos -> create todo', async () => {
        const res = await request(app).post('/todos')
            .send({ name: 'read book' })
        expect(res.status).toBe(201)
        expect(res.body.id).not.toBe(undefined)
        const resultAfterCreate = await request(app).get('/todos')
        expect(resultAfterCreate.body.length).toBeGreaterThan(1)
    })
})