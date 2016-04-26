export const linkFormatter = (cell, row) =>
`<a href="thesis/${row.id}">${row.title}</a>`;

export const studyFieldNameFormatter = (cell, row) =>
row.StudyField.name;

export const dateFormatter = (cell, row) => {
  console.log(row);
  const origDate = new Date(row.deadline);
  return `${origDate.getDate()}/${origDate.getMonth()}/${origDate.getFullYear()}`;
};
