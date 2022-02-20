const { it } = require('@jest/globals');
const request = require('supertest')
const app = require('../server')
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        userId: 1,
        title: 'test is cool',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('post')
  });
  it("should return post by id", async () => {
    const res = await request(app)
    .get(`/api/posts/${1}`)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('post')
  })
  it('should update a post', async () => {
    const res = await request(app)
      .put('/api/posts/1')
      .send({
        userId: 1,
        title: 'updated title',
        content: 'Lorem ipsum',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('post');
    expect(res.body.post).toHaveProperty('title', 'updated title');
  });

  it('should delete a post', async () => {
    const res = await request(app).delete('/api/posts/1');
    expect(res.statusCode).toEqual(204);
  });

  it('should respond with status code 404 if resource is not found', async () => {
    const postId = 1;
    const res = await request(app).get(`/api/posts/${postId}`);
    expect(res.statusCode).toEqual(404);
  });
});