import isISBN from 'validator/lib/isISBN';

import {
  charFieldRules,
  requiredCharFieldRules,
  tagsFieldRules,
} from './fieldRules';

const publicationFields = [
  {
    type: 'id',
    field: 'id',
  },
  {
    type: 'charField',
    label: 'Title',
    field: 'title',
    rules: [charFieldRules, requiredCharFieldRules],
  },
  {
    type: 'charField',
    label: 'Author',
    field: 'author',
    rules: [charFieldRules],
  },
  {
    type: 'yearField',
    label: 'Year',
    field: 'year',
    rules: [
      {
        type: 'number',
        range: {
          min: 0,
          max: new Date().getFullYear(),
        },
        message: 'Please enter a valid year!',
      },
    ],
  },
  {
    type: 'charField',
    label: 'ISBN',
    field: 'isbn',
    rules: [
      charFieldRules,
      {
        validator: (rule, value, callback) =>
          !value || isISBN(value) ? callback() : callback(false),
        message: 'Please enter a valid ISBN-10 or ISBN-13!',
      },
    ],
  },
];

const textFields = [
  {
    type: 'id',
    field: 'id',
  },
  {
    type: 'charField',
    label: 'Title',
    field: 'title',
    rules: [charFieldRules, requiredCharFieldRules],
  },
  {
    type: 'tagsField',
    label: 'Languages',
    field: 'languages',
    rules: [tagsFieldRules],
  },
  {
    type: 'textField',
    label: 'Transliteration',
    field: 'transliteration',
    rules: [],
  },
  {
    type: 'textField',
    label: 'Translation',
    field: 'translation',
    rules: [],
  },
];

export { publicationFields, textFields };
