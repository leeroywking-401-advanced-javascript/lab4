const Products = require('../categories/products.js');

describe('Products Model', () => {

    let products;

    beforeEach(() => {
        products = new Products();
    });

    // How might we repeat this to check on types?
    it('sanitize() returns undefined with missing requirements', () => {
        const schema = products.schema;
        var testRecord = {};
        for (var field in schema) {
            if (schema[field].required) {
                testRecord[field] = null;
            }
        }
        console.log(products.sanitize(testRecord))
        expect(products.sanitize(testRecord)).toBeUndefined();
    });

    it('can post() a new category', () => {
        let obj = { name: 'Test Category' };
        return products.create(obj)
            .then(record => {
                Object.keys(obj).forEach(key => {
                    expect(record[key]).toEqual(obj[key]);
                });
            })
            .catch(e => console.error);
    });

    it('can get() a category', () => {
        let obj = { name: 'Test Category' };
        products.create(obj)
            .then(record => {
                products.get(record._id)
                    .then(category => {
                        Object.keys(obj).forEach(key => {
                            expect(category[0][key]).toEqual(obj[key]);
                        });
                    });
            })
            .catch(err => console.error);
    });

    it('can delete() a category', () => {
        let obj = { name: 'Test Category' };
        products.create(obj)
            .then(record => {
                return products.delete(record._id)
                    .then(category => {
                        expect(products.get(record._id).name).toBeFalsy();
                    });
            })
            .catch(err => console.error);
    });

    it('can update a category', () => {
        let obj = { name: 'Test Category', zoo: true };
        products.create(obj)
            .then(record => {
                products.update(record.id, { name: 'New Test Category', id: 55 })
                    .then(category => {
                        products.get(55)
                            .then(zz => {
                                expect(zz.name).toEqual('New Test Category');
                            }).catch(err => console.error)
                    });
            })
            .catch(err => console.error);
    });

    it('rejects bad type checks', () => {
        let obj = { name: 555 };
        products.create(obj)
            .then(record => {
                expect(record.id).toBeUndefined();
            })
            .catch(err => console.error);
    });
});
