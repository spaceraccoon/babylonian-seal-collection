import isISBN from 'validator/lib/isISBN';

import {
  charFieldRules,
  requiredCharFieldRules,
  tagsFieldRules,
} from './fieldRules';

const publicationFields = [
  {
    type: 'id',
    label: 'ID',
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
        validator: (rule, value, callback) =>
          !value || (!isNaN(value) && value > 0) ? callback() : callback(false),
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
    label: 'ID',
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

const imageFields = [
  {
    type: 'id',
    label: 'ID',
    field: 'id',
  },
  {
    type: 'charField',
    label: 'Name',
    field: 'name',
    rules: [charFieldRules],
  },
  {
    type: 'charField',
    label: 'Source',
    field: 'source',
    rules: [charFieldRules],
  },
  {
    type: 'textField',
    label: 'Description',
    field: 'description',
    rules: [],
  },
  {
    type: 'image',
    label: 'Upload',
    field: 's3_key',
    rules: [{ required: true, message: 'Please upload an image!' }],
  },
];

const historicalRelationshipFields = [
  {
    type: 'id',
    label: 'ID',
    field: 'id',
  },
  {
    type: 'textField',
    label: 'Remarks',
    field: 'remarks',
    rules: [],
  },
  {
    type: 'id',
    label: 'Person ID',
    field: 'historical_person.id',
  },
  {
    type: 'charField',
    label: 'Person Name',
    field: 'historical_person.name',
    rules: [charFieldRules, requiredCharFieldRules],
  },
  {
    type: 'textField',
    label: 'Person Remarks',
    field: 'historical_person.remarks',
    rules: [],
  },
];

export {
  publicationFields,
  textFields,
  imageFields,
  historicalRelationshipFields,
};
