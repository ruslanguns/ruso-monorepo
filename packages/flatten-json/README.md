# FlattenJSON

FlattenJSON is a utility function for flattening JSON objects into a single-level object with keys representing the accessor path to the value.

## Installation

To install FlattenJSON, you can use the npm or yarn package managers.

```bash
$ npm install @ruso/flatten-json

# or

$ yarn add @ruso/flatten-json
```

## Usage

To use `FlattenJSON`, you can import the `flattenJSON` function from the `@ruso/flatten-json` package and pass a JSON object as the first argument. The function will return a flattened version of the input object, with keys representing the accessor path to the value.

```ts
import { flattenJSON } from '@ruso/flatten-json';

const json = {
	numbers: [1, 2, 3],
	person: {
		name: 'Ruslan',
		hobbies: ['programming', 'music']
	}
};

const flattenedJSON = flattenJSON(json);

console.log(flattenedJSON);

/**
Output:
{ 
  "numbers[0]": 1,
  "numbers[1]": 2,
  "numbers[2]": 3,
  "person.name": "Ruslan",
  "person.hobbies[0]":
  "programming",
  "person.hobbies[1]": "music"
}
*/
```

If you want to flatten a JSON array instead of a JSON object, you can use the flattenJSON function in the following way:

```ts
import { flattenJSON } from 'flatten-json';

const jsonArray = [
	{
		name: 'Ruslan',
		age: 30
	},
	{
		name: 'Sara',
		age: 28
	}
];

const flattenedJSON = flattenJSON(jsonArray);

console.log(flattenedJSON);
/*
Output:
{
  "[0].name": "Ruslan",
  "[0].age": 30,
  "[1].name": "Sara",
  "[1].age": 28
}
*/
```

## Use cases

- Extracting specific data from a JSON object.
- Transforming JSON data for use in different formats or systems.
- Simplifying the manipulation of complex JSON data.
- Generating accessor paths for JSON data.
- Debugging or inspecting JSON data.

  > These use cases illustrate some of the potential benefits of using the flattenJSON library, such as the ability to extract specific data from a JSON object, to transform the data for use in different contexts, and to simplify the manipulation of complex JSON data. The flattenJSON function can also be useful for generating accessor paths for JSON data, and for debugging or inspecting JSON data.

## Inspiration

The `flattenJSON` function is inspired by the way that data visualization tools like Kibana and Grafana represent JSON objects using a hierarchical structure. These tools use the keys of the JSON object as labels for the nested levels of the hierarchy, which allows users to easily access and explore the data contained in the object.

However, when working with JSON objects in a programmatic environment, it is often more convenient to access the data using a flattened representation of the object, where the keys represent the accessor path to the value. This allows users to easily access and manipulate the data contained in the JSON object, without having to navigate the hierarchical structure of the object.

The `flattenJSON` function provides this flattened representation of a JSON object, using the keys of the object as the accessor paths to the values. This allows users to easily access and manipulate the data contained in the JSON object, using a simple and intuitive key-value format.

## Contributions

The `flattenJSON` function is an open-source library, and we welcome contributions from the community. If you have suggestions for improving the function, or if you have found a bug or an issue, you can open an issue on the GitHub repository for the library.

We also welcome pull requests from users who want to contribute code or other changes to the library. If you want to submit a pull request, please make sure to follow the guidelines and conventions used in the project, and to include tests for your changes. This will help us review and merge your changes more efficiently, and ensure that the library remains stable and reliable.

Thank you for your interest in contributing to the `flattenJSON` function, and we look forward to your feedback and contributions.

## Author

- Ruslan Gonzalez
- Twitter: [@ruslangonzalez](https://twitter.com/ruslanguns)
