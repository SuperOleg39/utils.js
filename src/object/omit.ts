import curryN from '../function/curryN';
import objectKeys from './keys';

type Omitted<T, K extends string> = Pick<T, Exclude<keyof T, K>>;

interface Omit {
    <T, K extends string>(names: ReadonlyArray<K>, obj: T): Omitted<T, K>;
    <K extends string>(names: ReadonlyArray<K>): <T>(obj: T) => Omitted<T, K>;
}

/**
 * Returns a partial copy of an object omitting the keys specified.
 *
 * @param {Array} props an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with properties from `names` not on it.
 * @example
 *
 *      omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
 */
export default curryN(2, (props = [], obj = {}) => {
    const propsSet = Object.create(null);

    for (let i = 0; i < props.length; i++) {
        propsSet[props[i]] = true;
    }

    const result = {};
    const keys = objectKeys(obj);

    for (let i = 0; i < keys.length; i++) {
        const prop = keys[i];

        if (!propsSet[prop]) {
            result[prop] = obj[prop];
        }
    }

    return result;
}) as Omit;
