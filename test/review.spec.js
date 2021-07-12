const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

let new_reviewId;

// post one
it ("POST /api/review success", async () => {
    const response = await request(app).post('/api/review').send({
        title: "풍경이 좋아요",
        content: "최고의 뷰에요! 다음에 또 올래요."
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success");
    expect(response.body).toBeDefined(); // not undefined

    new_reviewId = response.body.reviewId;
});

// get all
it ("GET /api/review", async () => {
    const response = await request(app).get('/api/review').send();

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined(); // not undefined
    expect(response.body.message).toBe("success");
    expect(Array(response.body.reviews)).toBeTruthy();
});

// get one
it ("GET /api/review/:reviewId", async () => {
    const response = await request(app).get(`/api/review/${new_reviewId}`).send();

    expect(response.statusCode).toBe(201);
    expect(response.body).toBeDefined(); // not undefined
    expect(response.body.message).toBe("success");
    expect(response.body.review.title).toBe("풍경이 좋아요");
});

// get one with wrong id
it("GET with wrong ID. returns error", async () => {
    const response = await request(app).get('/api/review/wrong234').send();

    expect(response.statusCode).toBe(501);
    expect(response.body).toBeDefined(); // not undefined
    expect(response.body.message).toBe("fail");
    expect(response.body.err.name).toBe("CastError");
});

it("PUT /api/review/:reviewId", async () => {
    const response = await request(app).put(`/api/review/${new_reviewId}`).send({
        title: "위치가 좋아요",
        content: "서울에서 가까워요. 주차장이 커요."
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success");
});

it("PUT with wrong id. return error", async () => {
    const response = await request(app).put('/api/review/wrong234').send({
        title: "위치가 좋아요",
        content: "서울에서 가까워요. 주차장이 커요."
    });

    expect(response.statusCode).toBe(501);
    expect(response.body.message).toBe("fail");
    expect(response.body.err.name).toBe("CastError");
});

it("DELETE /api/review/:reviewId", async () => {
    const response = await request(app).delete(`/api/review/${new_reviewId}`).send({
        title: "위치가 좋아요",
        content: "서울에서 가까워요. 주차장이 커요."
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("success");
});

it("DELETE with wrong id. return error", async () => {
    const response = await request(app).put('/api/review/wrong123').send({
        title: "위치가 좋아요",
        content: "서울에서 가까워요. 주차장이 커요."
    });

    expect(response.statusCode).toBe(501);
    expect(response.body.message).toBe("fail");
    expect(response.body.err.name).toBe("CastError");
});

afterAll((done) => {
    mongoose.connection.close();
    done();
})