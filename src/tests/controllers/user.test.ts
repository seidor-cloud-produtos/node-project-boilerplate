import test from 'ava';
import sinon from 'sinon';

import * as controller from '../../controllers/user';
import * as repository from '../../repositories/user';
import * as builder from '../../utils/builders/typeorm';
import { UserInterface } from '../../interfaces/user';

test.afterEach.always(t => {
    sinon.restore();
});

test('create', async t => {
    const data: UserInterface = { name: 'foo', surname: 'bar', age: 42 };

    const spy = sinon.stub(repository, 'create').resolves(data);
    const result = await controller.create(data);

    t.deepEqual(result, data);
    t.true(spy.calledOnceWithExactly(data));
});

test.serial('getById', async t => {
    const id = 'fake_id';
    const fakeResponse: any = { x: true };

    const spy = sinon.stub(repository, 'getById').resolves(fakeResponse);
    const result = await controller.getById(id);

    t.deepEqual(result, fakeResponse);
    t.true(spy.calledOnceWithExactly(id));
});

test.serial('getById not found', async t => {
    const id = 'fake_id';

    const spy = sinon.stub(repository, 'getById').resolves(undefined);

    await t.throwsAsync(controller.getById(id), { message: 'User not found' });
    t.true(spy.calledOnceWithExactly(id));
});

test('getAll', async t => {
    const fakeOptions: any = { y: false };
    const fakeResponse: any = { x: true };

    const spyBuilder = sinon
        .stub(builder, 'buildGetAllOptions')
        .returns(fakeOptions);
    const spyRepo = sinon.stub(repository, 'getAll').resolves(fakeResponse);

    const result = await controller.getAll({});

    t.deepEqual(result, fakeResponse);
    t.true(spyBuilder.calledOnceWithExactly({}));
    t.true(spyRepo.calledOnceWithExactly(fakeOptions));
});

test.serial('update', async t => {
    const id = 'fake_id';
    const fakeData: any = { y: true };
    const fakeResponse: any = { x: true };

    const spy = sinon.stub(repository, 'update').resolves(fakeResponse);
    const result = await controller.update(fakeData, id);

    t.deepEqual(result, fakeResponse);
    t.true(spy.calledOnceWithExactly(fakeData, id));
});

test.serial('update not found', async t => {
    const id = 'fake_id';
    const fakeData: any = { y: true };

    const spy = sinon.stub(repository, 'update').resolves(undefined);

    await t.throwsAsync(controller.update(fakeData, id), {
        message: 'User not found',
    });
    t.true(spy.calledOnceWithExactly(fakeData, id));
});

test.serial('remove', async t => {
    const id = 'fake_id';
    const fakeResponse: any = { affected: 1 };

    const spy = sinon.stub(repository, 'remove').resolves(fakeResponse);
    await controller.remove(id);

    t.true(spy.calledOnceWithExactly(id));
});

test.serial('remove not found', async t => {
    const id = 'fake_id';
    const fakeResponse: any = { affected: 0 };

    const spy = sinon.stub(repository, 'remove').resolves(fakeResponse);

    await t.throwsAsync(controller.remove(id), { message: 'User not found' });
    t.true(spy.calledOnceWithExactly(id));
});
