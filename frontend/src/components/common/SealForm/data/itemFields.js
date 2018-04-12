import { charFieldRules, requiredCharFieldRules } from './fieldRules';

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
    type: 'charField',
    label: 'Year',
    field: 'year',
    rules: [
      charFieldRules,
      {
        pattern: /^\d{4}$/,
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
        pattern: /(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})[-●0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)/,
        message: 'Please enter a valid ISBN-10 or ISBN-13!',
      },
    ],
  },
];

export { publicationFields };
