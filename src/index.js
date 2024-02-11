import Api from './tools/Api'

import 'normalize.css';
import './index.css';

const api = new Api({
  baseUrl: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

const tableContainer = document.querySelector('[data-table]');
const form = document.querySelector('[data-form]');
const dobInput = form.querySelector('[data-form-date]');
const fullNameInput = form.querySelector('[data-form-name]');
const groupInput = form.querySelector('[data-form-group]');

function deleteStudent(id) {
  api.deleteStudent(id)
  .then(() => {
    document.getElementById(id).remove();
  })
}

function addStudent() {
  const inputValues = {};
  inputValues.fullName = fullNameInput.value;
  inputValues.dob = dobInput.value;
  inputValues.group = groupInput.value;
  api.addStudent(inputValues)
  .then((res) => {
    const addedRow = renderRow(res.student);
    tableContainer.append(addedRow);
  })
}

function renderRow(item) {
  const cellElem = document.querySelector('[data-row-template]').content.cloneNode(true);
  cellElem.querySelector('[data-cell-delete]').addEventListener('click', () => {
    deleteStudent(item.id);
  });
  cellElem.querySelector('[data-cell-name]').textContent = item.fullname;
  cellElem.querySelector('[data-cell-date]').textContent = item.dob;
  cellElem.querySelector('[data-cell-group]').textContent = item.educationgroup;
  cellElem.querySelector('[data-row]').id = item.id;
  return cellElem;
}

api.getStudents()
.then((res) => {
  res.students.forEach(item => {
    const row = renderRow(item);
    tableContainer.append(row);
  });
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addStudent();
})
