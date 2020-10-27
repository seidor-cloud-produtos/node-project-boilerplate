import test from 'ava';
import sinon from 'sinon';
import { UserInterface } from '../../../interfaces/user';

import * as userRepository from '../../../repositories/user';
import CreateUserService from '../../../services/user/createUser';
import { ValidateError } from '../../../utils/errors/ValidateError';
import UserBuilder from '../../testBuilders/userBuilder';

test.beforeEach(() => {
    sinon.restore();
});

test('CreateUserService - Throw ValidateError - Not send required params and send invalid params', async t => {
    const user_data = new UserBuilder().withEmail('invalid-email').build();

    await t.throwsAsync(CreateUserService(user_data as UserInterface), {
        message: 'Validate error',
        instanceOf: ValidateError,
    });
});

test('CreateUserService - Success', async t => {
    const user_data = new UserBuilder()
        .withAge(22)
        .withName('John Doe')
        .withSurname('Fake Surname')
        .withEmail('johndoe@mail.com')
        .build();

    const createUserSpy = sinon
        .stub(userRepository, 'create')
        .returns(new Promise(resolve => resolve(user_data as UserInterface)));

    const user_response = await CreateUserService(user_data as UserInterface);

    t.true(createUserSpy.calledWithExactly(user_data as UserInterface));
    t.deepEqual(user_data, user_response);
});
