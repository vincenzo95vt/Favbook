export function getSearchUrl(value, controller) {
    if (!value || !controller) {
        throw new Error('You dont provide any params to build a URL');
    }

    return `http://localhost:4000/${value}/${controller}`;
}
export function fetchMethods(type, header, body = null) {
    if (!type || !header) {
        throw new Error('Methods and headers are necessary to config methods');
    }
    const methods = {
        method: type,
        headers: header,
    };
    if (body !== null) {
        methods.body = JSON.stringify(body);
    }

    return methods;
}