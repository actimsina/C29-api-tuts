const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/User')

const api = supertest(app)

const user = {
    username: "testUser1",
    password: "test123"
}

beforeAll(async () => {
    await User.deleteMany({})
})

test('user registration', async () => {
   await api.post('/users/register')
    .send(user)
    .expect(201)
    .expect(res => {
        // console.log(res.body)
        expect(res.body.status).toContain('success')
    })
})



afterAll(async () => {
    await mongoose.connection.close()
})