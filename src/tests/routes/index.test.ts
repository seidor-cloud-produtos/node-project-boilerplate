import test from 'ava';
import request from 'supertest';
import sinon from 'sinon';
import express from 'express';

import app from '../../app';
import { swaggerSpec } from '../../swagger';
import { HttpError } from '../../utils/errors/HttpError';

const mockedTest = test;

mockedTest.serial.afterEach.always(() => {
    sinon.restore();
});

test('GET /', async t => {
    const expected = 'Service 1.0.0';

    const res = await request(app).get('/');
    t.is(res.status, 200);
    t.deepEqual(res.text, expected);
});

test('GET / (without x-powered-by)', async t => {
    const res = await request(app).get('/');
    t.is(res.status, 200);
    t.is(res.get('X-Powered-By'), undefined);
});

mockedTest.serial('GET / aleatory throws', async t => {
    sinon.stub(express.response, 'send').throws('throw');

    const res = await request(app).get('/');
    t.is(res.status, 500);
});

mockedTest.serial('GET / http error throws', async t => {
    sinon.stub(express.response, 'send').throws(new HttpError(400, 'http error'));

    const res = await request(app).get('/');
    t.is(res.status, 400);
});

test('GET /api-docs', async t => {
    const res = await request(app).get('/api-docs');
    t.is(res.status, 200);
    t.is(res.get('Content-Type'), 'application/json; charset=utf-8');
    t.is(res.text, JSON.stringify(swaggerSpec));
});
