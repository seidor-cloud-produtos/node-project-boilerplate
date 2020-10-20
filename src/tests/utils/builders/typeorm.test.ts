import test from 'ava';

import { buildGetAllOptions } from '../../../utils/typeorm';

test('buildGetAllOptions default', t => {
    const options = buildGetAllOptions({});
    const expected = { take: 20, skip: 0 };

    t.deepEqual(options, expected);
});

test('buildGetAllOptions custom values', t => {
    const options = buildGetAllOptions({
        size: '100',
        page: '3',
    });

    const expected = { take: 100, skip: 2 };

    t.deepEqual(options, expected);
});
