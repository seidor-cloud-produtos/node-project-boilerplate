import anyTest, { TestInterface } from 'ava';

import connect from '../../database/connection/connection';
import { UserInterface } from '../../interfaces/user';
import * as repository from '../../repositories/user';
import UserBuilder from '../testBuilders/userBuilder';

const testBD = anyTest as TestInterface<{ removable: UserInterface[] }>;
testBD.before(async t => {
    await connect();
    // eslint-disable-next-line no-param-reassign
    t.context.removable = [];
});

testBD.after.always('Cleanup Created Users', async t => {
    for (let i = 0; i < t.context.removable.length; i += 1) {
        const user = t.context.removable[i];
        await repository.remove(user.id!);
    }
});

testBD('User Create', async t => {
    const data = new UserBuilder()
        .withName('foo')
        .withSurname('bar')
        .withAge(42)
        .withEmail('foo@bar.com')
        .build();

    const created = await repository.create(data as UserInterface);

    t.truthy(created.id);
    t.is(created.name, data.name);
    t.is(created.surname, data.surname);
    t.is(created.age, data.age);
    t.is(created.email, data.email);

    t.context.removable.push(created);
});

testBD('User Create without Email', async t => {
    const data = new UserBuilder()
        .withName('foo')
        .withSurname('bar')
        .withAge(42)
        .build();

    const created = await repository.create(data as UserInterface);

    t.truthy(created.id);
    t.falsy(created.email);
    t.is(created.name, data.name);
    t.is(created.surname, data.surname);
    t.is(created.age, data.age);

    t.context.removable.push(created);
});

testBD('User Create Error Required Fields', async t => {
    const promises = [];
    const builder = new UserBuilder();

    let data = builder.build();
    promises.push(
        t.throwsAsync(repository.create(data as UserInterface), {
            message: 'null value in column "name" violates not-null constraint',
        }),
    );

    data = builder.withName('foo').build();
    promises.push(
        t.throwsAsync(repository.create(data as UserInterface), {
            message: 'null value in column "surname" violates not-null constraint',
        }),
    );

    data = builder.withName('foo').withSurname('bar').build();
    promises.push(
        t.throwsAsync(repository.create(data as UserInterface), {
            message: 'null value in column "age" violates not-null constraint',
        }),
    );

    await Promise.all(promises);
});
