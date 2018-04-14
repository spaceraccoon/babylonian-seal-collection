const publicationDetails = [
  {
    type: 'id',
    label: 'ID',
    field: 'id',
  },
  {
    type: 'charField',
    label: 'Title',
    field: 'title',
  },
  {
    type: 'charField',
    label: 'Author',
    field: 'author',
  },
  {
    type: 'yearField',
    label: 'Year',
    field: 'year',
  },
  {
    type: 'charField',
    label: 'ISBN',
    field: 'isbn',
  },
];

const textDetails = [
  {
    type: 'id',
    label: 'ID',
    field: 'id',
  },
  {
    type: 'charField',
    label: 'Title',
    field: 'title',
  },
  {
    type: 'tagsField',
    label: 'Languages',
    field: 'languages',
  },
  {
    type: 'textField',
    label: 'Transliteration',
    field: 'transliteration',
  },
  {
    type: 'textField',
    label: 'Translation',
    field: 'translation',
  },
];

export { publicationDetails, textDetails };
