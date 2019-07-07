const Categories = require('../categories/categories.js');

describe('Categories Model', () => {

  let categories;

  beforeEach(() => {
    categories = new Categories();
  });

  // How might we repeat this to check on types?
  it('sanitize() returns undefined with missing requirements', () => {
    const schema = categories.schema;
    var testRecord = {};
    for (var field in schema) {
      if (schema[field].required) {
        testRecord[field] = null;
      }
    }
    expect(categories.sanitize(testRecord)).toBeUndefined();
  });

  it('can post() a new category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        Object.keys(obj).forEach(key => {
          expect(record[key]).toEqual(obj[key]);
        });
      })
      .catch(e => console.error('ERR', e));
  });

  it('can get() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.get(record._id)
          .then(category => {
            Object.keys(obj).forEach(key => {
              expect(category[0][key]).toEqual(obj[key]);
            });
          });
      });
  });

  it('can delete() a category', () => {
    let obj = { name: 'Test Category' };
    return categories.create(obj)
      .then(record => {
        return categories.delete(record._id)
          .then(category => {
            expect(categories.get(record._id).name).toBeFalsy()
          })
      })
  })

  it('can update a category', () => {
    let obj = { name: 'Test Category', zoo:true };
     categories.create(obj)
      .then(record => {
        categories.update(record.id, { name: 'New Test Category', id: 55 })
          .then(category => {
            categories.get(55)
              .then(zz => {
                expect(zz.name).toEqual('New Test Category')
              })
              .catch(err => console.err)
          })
      })
  })

  it('rejects bad type checks', () => {
    let obj = { name: 555};
    categories.create(obj)
      .then(record => {
        expect(record.id).toBeUndefined()
      })
      .catch(err => console.error)
  })
})
