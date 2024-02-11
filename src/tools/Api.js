export default class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
  }
  
  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }

  getStudents() {
    return fetch(`${this._baseUrl}/students`, {
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  addStudent(inputValues) {
    return fetch(`${this._baseUrl}/students`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        student: inputValues
      }),
    })
    .then(this._checkResponse)
  }

  deleteStudent(id) {
    return fetch(`${this._baseUrl}/students/${id}`, {
        method: 'DELETE',
        headers: this._headers
    })
    .then(this._checkResponse)
  }
}