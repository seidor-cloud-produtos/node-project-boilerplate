import sinon from 'sinon';
import request from 'supertest';
import { container } from 'tsyringe';

import app from '../../app';
import UserService from '../../services/user';
import UserBuilder from '../testBuilders/userBuilder';
import { User } from '../../database/entities/User';

describe('User Route context', () => {
    let UserServiceSpy: sinon.SinonStubbedInstance<UserService>;

    beforeEach(() => {
        sinon.restore();
        UserServiceSpy = sinon.createStubInstance(UserService);
    });

    it('should be call controller with user data and returns status 201', async () => {
        const user = new UserBuilder()
            .withId('4e3f95d1-b029-466b-91fc-9eca0dbc8248')
            .withName('Jonh Joe')
            .withSurname('Silva')
            .withEmail('jonhjoe.silva@email.com')
            .withCreatedAt(new Date())
            .withUpdatedAt(new Date())
            .build() as User;

        UserServiceSpy.create.resolves(<any>user);
        sinon.stub(container, 'resolve').returns(UserServiceSpy);

        const res = await request(app).post('/api/user').send(user);

        expect(res.status).toBe(201);
        expect(UserServiceSpy.create.calledWithExactly(user));
    });

    it('should be return status 400 when not send params', async () => {
        sinon.stub(container, 'resolve').returns(UserServiceSpy);

        const res = await request(app).post('/api/user');

        expect(res.status).toBe(400);
        expect(UserServiceSpy.create.notCalled).toBeTruthy();
    });

    it('should be return status 400 when send invalid params', async () => {
        const data = new UserBuilder()
            .withId(1 as any)
            .withName(1 as any)
            .withSurname(1 as any)
            .withEmail(1 as any)
            .build() as User;

        sinon.stub(container, 'resolve').returns(UserServiceSpy);

        const res = await request(app).post('/api/book').send(data);

        expect(res.status).toBe(400);
        expect(UserServiceSpy.create.notCalled).toBeTruthy();
    });
});
