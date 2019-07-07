'use strict';

const DataModel = require('../memory.js');

class Categories extends DataModel {
  constructor() {
    super();
    this.schema = {
      id: { required: true },
      name: { required: true, type:'string' },
      zoo: {required: false, type:'boolean'},
    };
  }
}

module.exports = Categories;