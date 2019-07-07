'use strict';
const DataModel = require('../file.js');


class Persons extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: {required: true},
      name: { required: true, type: 'string' },
      height: { required: true, type: 'integer' },
      limbs: { required: false, type: 'integer' },
      eyes: { required: false, type: 'integer' },
    };
  }
}


module.exports = Persons;