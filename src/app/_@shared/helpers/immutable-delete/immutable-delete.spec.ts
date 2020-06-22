import { immutableDelete } from './immutable-delete';

describe('immutableDelete', () => {
    it('removes item with id', () => {
        const obj = { a: 'foo', b: 'bar' };
        const result = immutableDelete(obj, 'a');
        expect(result).toEqual({ b: 'bar' });
    });

    it('original object is not modified', () => {
        const obj = { a: 'foo', b: 'bar' };
        immutableDelete(obj, 'a');
        expect(obj).toEqual({ a: 'foo', b: 'bar' });
    });

    it('return original object if id doesnt exist', () => {
        const obj = { a: 'foo', b: 'bar' };
        immutableDelete(obj, 'c');
        expect(obj).toEqual({ a: 'foo', b: 'bar' });
    });
});
