export const immutableDelete = (obj: object, id: number | string): object => {
    if (obj[id]) {
        const copy = { ...obj };
        delete copy[id];
        return copy;
    }
    return obj;
};
