'use strict';

const uuid = require('uuid/v4');
const fs = require('fs');

class Model {

  constructor() {
    this.database = [];
    fs.readFile('data/persons.db', (err,data) => {
      let buff = data.toString();
      if (err){console.log}
      // else {console.log(buff)}
    })
  }

  saveToFs() {
    fs.writeFile('data/persons.db', this.database, function (err) {
      if (err) throw err;
    });
  }

  get(id) {
    let response = id ? this.database.filter((record) => record.id === id) : this.database;
    return Promise.resolve(response);
  }

  create(entry) {
    entry.id = uuid();
    let record = this.sanitize(entry);
    if (record) {
      if (record.id) { this.database.push(record); }
    }
    this.saveToFs()
    return Promise.resolve(record);

  }

  update(id, entry) {
    let record = this.sanitize(entry);
    if (record.id) { this.database = this.database.map((item) => (item.id === id) ? record : item); }
    this.saveToFs()
    return Promise.resolve(record);
  }

  delete(id) {
    this.database = this.database.filter((record) => record.id !== id);
    this.saveToFs()
    return Promise.resolve();
  }

  sanitize(entry) {
    let valid = true;
    let record = entry;
    Object.keys(this.schema).forEach(field => {
      if (this.schema[field].required && !record[field]) {
        console.log(`false on ${this.schema[field]}`)
        valid = false;
      }
      if (record[field] && this.schema[field].type && !(typeof record[field] === this.schema[field].type)) {
        console.log(`false on ${this.schema[field]}`)
        valid = false;
      }
    })
    console.log(record, valid)
    return valid ? record : undefined;
  }

}

module.exports = Model;





