const request = require('supertest');
const app = require('../server');
const path = require('path');

let token;
let testContactId;

const testImage = path.join(__dirname, 'fixtures', 'test-image.jpg');

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({ username: 'admin', password: 'admin' });
  token = res.body.token;

  const created = await request(app)
    .post('/api/contacts')
    .set('Authorization', `Bearer ${token}`)
    .field('name', 'Contato Teste')
    .field('contact', '900000001')
    .field('email', 'teste.put@example.com')
    .attach('picture', testImage);
  testContactId = created.body.id;
});

afterAll(async () => {
  if (testContactId) {
    await request(app)
      .delete(`/api/contacts/${testContactId}`)
      .set('Authorization', `Bearer ${token}`);
  }
});

describe('POST /api/contacts', () => {
  it('retorna 401 quando não há token', async () => {
    const res = await request(app).post('/api/contacts');
    expect(res.status).toBe(401);
  });

  it('retorna 400 com erro em errors.name quando nome tem 5 caracteres ou menos', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'abc')
      .field('contact', '123456789')
      .field('email', 'valid@email.com');
    expect(res.status).toBe(400);
    expect(res.body.errors.name).toBeDefined();
  });

  it('retorna 400 com erro em errors.contact quando contato não tem 9 dígitos', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Nome Valido')
      .field('contact', '12345678')
      .field('email', 'valid@email.com');
    expect(res.status).toBe(400);
    expect(res.body.errors.contact).toBeDefined();
  });

  it('retorna 400 com erro em errors.email quando email é inválido', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Nome Valido')
      .field('contact', '123456789')
      .field('email', 'emailsemarroba');
    expect(res.status).toBe(400);
    expect(res.body.errors.email).toBeDefined();
  });

  it('retorna 400 com erro em errors.picture quando imagem não é enviada', async () => {
    const res = await request(app)
      .post('/api/contacts')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Nome Valido')
      .field('contact', '123456789')
      .field('email', 'valid@email.com');
    expect(res.status).toBe(400);
    expect(res.body.errors.picture).toBeDefined();
  });
});

describe('PUT /api/contacts/:id', () => {
  it('retorna 404 para id inexistente', async () => {
    const res = await request(app)
      .put('/api/contacts/999999')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Nome Valido')
      .field('contact', '123456789')
      .field('email', 'valid@email.com');
    expect(res.status).toBe(404);
  });

  it('retorna 400 com erro em errors.name quando nome tem 5 caracteres ou menos', async () => {
    const res = await request(app)
      .put(`/api/contacts/${testContactId}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'abc')
      .field('contact', '123456789')
      .field('email', 'valid@email.com');
    expect(res.status).toBe(400);
    expect(res.body.errors.name).toBeDefined();
  });

  it('retorna 400 com erro em errors.contact quando contato não tem 9 dígitos', async () => {
    const res = await request(app)
      .put(`/api/contacts/${testContactId}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Nome Valido')
      .field('contact', '12345678')
      .field('email', 'valid@email.com');
    expect(res.status).toBe(400);
    expect(res.body.errors.contact).toBeDefined();
  });

  it('retorna 400 com erro em errors.email quando email é inválido', async () => {
    const res = await request(app)
      .put(`/api/contacts/${testContactId}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Nome Valido')
      .field('contact', '123456789')
      .field('email', 'emailsemarroba');
    expect(res.status).toBe(400);
    expect(res.body.errors.email).toBeDefined();
  });
});
