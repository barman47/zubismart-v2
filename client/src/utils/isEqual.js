// function to compare two objects for equality

export default (object1, object2) => {
    const object1Keys = Object.keys(object1);
    const object2Keys = Object.keys(object2);

    if (object1Keys.length !== object2Keys.length) {
        return false;
    }

    for (let objectKey of object1Keys) {
        if (object1[objectKey] !== object2[objectKey]) {
            return false;
        }
    }

    return true;
}