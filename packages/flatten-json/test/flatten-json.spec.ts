import flattenJSON from '../src/flatten-json';

describe('flattenJSON', () => {
  it('should flatten a JSON object with a single property', () => {
    const json = { name: 'Ruslan' };
    const expected = { name: 'Ruslan' };

    expect(flattenJSON(json)).toEqual(expected);
  });

  it('should flatten a JSON object with multiple properties', () => {
    const json = {
      name: 'Ruslan',
      age: 30,
      hobbies: ['programming', 'music'],
    };
    const expected = {
      name: 'Ruslan',
      age: 30,
      'hobbies[0]': 'programming',
      'hobbies[1]': 'music',
    };

    expect(flattenJSON(json)).toEqual(expected);
  });

  it('should flatten a nested JSON object', () => {
    const json = {
      person: {
        name: 'Ruslan',
        age: 30,
      },
      hobbies: ['programming', 'music'],
    };
    const expectedOutput = {
      'person.name': 'Ruslan',
      'person.age': 30,
      'hobbies[0]': 'programming',
      'hobbies[1]': 'music',
    };

    const output = flattenJSON(json);

    expect(output).toEqual(expectedOutput);
  });

  it('should flatten an array of objects with nested JSON object', () => {
    const json = [
      {
        person: { name: 'Ruslan', age: 30 },
        hobbies: ['programming', 'music'],
      },
      {
        person: {
          name: 'John',
          age: 25,
        },
        hobbies: ['reading', 'running'],
      },
    ];

    const expectedOutput = {
      '[0].person.name': 'Ruslan',
      '[0].person.age': 30,
      '[0].hobbies[0]': 'programming',
      '[0].hobbies[1]': 'music',
      '[1].person.name': 'John',
      '[1].person.age': 25,
      '[1].hobbies[0]': 'reading',
      '[1].hobbies[1]': 'running',
    };

    const output = flattenJSON(json);

    expect(output).toEqual(expectedOutput);
  });

  it('should flatten a very nested JSON object', () => {
    const json = [
      {
        person: { name: 'Ruslan', age: 30 },
        hobbies: ['programming', 'music'],
      },
      {
        person: {
          name: 'John',
          age: 25,
        },
        hobbies: ['reading', 'running'],
        parents: [
          {
            person: { name: 'Ruslan', age: 30 },
            hobbies: ['programming', 'music'],
          },
        ],
      },
    ];

    const expectedOutput = {
      '[0].person.name': 'Ruslan',
      '[0].person.age': 30,
      '[0].hobbies[0]': 'programming',
      '[0].hobbies[1]': 'music',
      '[1].person.name': 'John',
      '[1].person.age': 25,
      '[1].hobbies[0]': 'reading',
      '[1].hobbies[1]': 'running',
      '[1].parents[0].person.name': 'Ruslan',
      '[1].parents[0].person.age': 30,
      '[1].parents[0].hobbies.[0]': 'programming',
      '[1].parents[0].hobbies.[1]': 'music',
    };

    const output = flattenJSON(json);

    expect(output).toEqual(expectedOutput);
  });

  test.each([true, false, null, undefined, 1, 'string'])(
    'test %p as a primitive value should return empty object {}',
    (primitive) => {
      expect(flattenJSON(primitive)).toEqual({});
    },
  );
});
