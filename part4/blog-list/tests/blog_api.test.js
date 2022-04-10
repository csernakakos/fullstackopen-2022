const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

// GET_blogs.rest
test("all blog posts are fetched", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
}, 10000)


// POST_blog.rest
test("add blog", async () => {

    const newBlog = {
        title: "TEST newBlog",
        author: "TA",
        url: "ta:ta",
        likes: 3,
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
})

test("add blog without specifying 'likes' should make 'likes'=0", async () => {

    const newBlog = {
        title: "TEST newBlog",
        author: "TA",
        url: "ta:ta",
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
})

afterAll(() => {mongoose.connection.close()});