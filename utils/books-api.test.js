const { default: mongoose } = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Book = require('../models/Book')


const api = supertest(app)

let token

const newBook = {
    title: "test book 1",
    author: "test author 1"
}

beforeAll(async () => {
    await Book.deleteMany({})
    const res = await api.post('/users/login')
        .send({ username: "testUser", password: "test123" })
    token = `bearer ${res.body.token}`
})

test('can create a book', async () => {
    await api.post('/books')
        .send(newBook)
        .set('Authorization', token)
        .expect(201)
        .expect(res => {
            expect(res.body.title).toBe('test book 1')
        })
})

test('get all books', async () => {
    const res = await api.get('/books')
        .set('Authorization', token)
        .expect(200)
    expect(res.body[0].title).toBe('test book 1')
    newBook._id = res.body[0]._id

})

test('can get a book by id', async () => {
    await api.get(`/books/${newBook._id}`)
        .set('Authorization', token)
        .expect(200)
        .expect(res => {
            expect(res.body.author).toBe('test author 1')
        })
})

afterAll(async () => {
    await mongoose.connection.close()
})