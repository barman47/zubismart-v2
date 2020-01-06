const firstName = (name) => {
    let firstName = name.split(' ');
    firstName = firstName[1].toString();
    return firstName;    
}

export default firstName;