import test from 'ava';
import sinon from 'sinon';
import request from 'supertest';

import app from '../../app';
import * as controller from '../../controllers/user';
import { isParamsInValidationErrors } from '../../utils/validation/validationError';
import UserBuilder from '../testBuilders/userBuilder';

test('POST /api/user/', async t => {
    sinon.stub(controller, 'create').returns(new Promise(resolve => resolve()));

    const data = new UserBuilder()
        .withName('foo')
        .withSurname('bar')
        .withAge(42)
        .withEmail('foo@bar.com')
        .build();

    const res = await request(app).post('/api/user').send(data);

    t.is(res.status, 201);
});

test('POST /api/user/ - BAD REQUEST NO VALUES', async t => {
    const res = await request(app).post('/api/user').send({});

    t.is(res.status, 400);
    t.true(isParamsInValidationErrors(['name', 'surname', 'age'], res.body.errors));
});

test('POST /api/user/ - BAD REQUEST - WRONG VALUES', async t => {
    const data = new UserBuilder()
        .withName(1 as any)
        .withSurname(1 as any)
        .withAge('aaa' as any)
        .withEmail('fake')
        .build();

    const res = await request(app).post('/api/user').send(data);

    t.is(res.status, 400);
    t.true(
        isParamsInValidationErrors(
            ['name', 'surname', 'age', 'email'],
            res.body.errors,
        ),
    );
});

test('PUT /api/user/:id', async t => {
    sinon.stub(controller, 'update').returns(new Promise(resolve => resolve()));

    const fakeId = '5c1f6cd4-d336-48d9-b01a-f015d72f2095';
    const data = new UserBuilder()
        .withName('foo')
        .withSurname('bar')
        .withAge(42)
        .withEmail('foo@bar.com')
        .build();

    const res = await request(app).put(`/api/user/${fakeId}`).send(data);

    t.is(res.status, 200);
});

test('PUT /api/user/:id - BAD REQUEST - WRONG VALUES', async t => {
    const fakeId = '1';
    const data = new UserBuilder()
        .withName(1 as any)
        .withSurname(1 as any)
        .withAge('aaa' as any)
        .withEmail('fake')
        .build();

    const res = await request(app).put(`/api/user/${fakeId}`).send(data);

    t.is(res.status, 400);
    t.true(
        isParamsInValidationErrors(
            ['id', 'name', 'surname', 'age', 'email'],
            res.body.errors,
        ),
    );
});

test('DELETE /api/user/:id', async t => {
    sinon.stub(controller, 'remove').returns(new Promise(resolve => resolve()));

    const fakeId = '5c1f6cd4-d336-48d9-b01a-f015d72f2095';
    const res = await request(app).delete(`/api/user/${fakeId}`);

    t.is(res.status, 204);
});

test('DELETE /api/user/:id - WRONG ID', async t => {
    const fakeId = '1';
    const res = await request(app).delete(`/api/user/${fakeId}`);

    t.is(res.status, 400);
    t.true(isParamsInValidationErrors(['id'], res.body.errors));
});

test('GET /api/user/:id', async t => {
    sinon.stub(controller, 'getById').returns(new Promise(resolve => resolve()));

    const fakeId = '5c1f6cd4-d336-48d9-b01a-f015d72f2095';
    const res = await request(app).get(`/api/user/${fakeId}`);

    t.is(res.status, 200);
});

test('GET /api/user/:id - WRONG ID', async t => {
    const fakeId = '1';
    const res = await request(app).get(`/api/user/${fakeId}`);

    t.is(res.status, 400);
    t.true(isParamsInValidationErrors(['id'], res.body.errors));
});

test('GET /api/user/', async t => {
    sinon.stub(controller, 'getAll').returns(new Promise(resolve => resolve()));

    const res = await request(app).get('/api/user?page=1&size=20');

    t.is(res.status, 200);
});

test('GET /api/user/ - WRONG QUERY PARAMS', async t => {
    const res = await request(app).get('/api/user?page=a&size=aa');

    t.is(res.status, 400);
    t.true(isParamsInValidationErrors(['size', 'page'], res.body.errors));
});
