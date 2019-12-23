export default (text) => {
    let returnText;
    try {
        returnText = text.charAt(0) + text.substring(1).toLowerCase();
    } catch (err) {

    }

    return returnText;
}