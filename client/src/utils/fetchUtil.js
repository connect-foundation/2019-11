export const Async = (url, option, callback) => {
    fetch(url, option)
        .then((res) => {
            return res.json();
        }).then((json) => {
            if (callback !== undefined)
                callback(json)
        })
}

export const Await = async (url, option) => {
    return await fetch(url, option)
        .then((res) => {
            return res.json();
        }).then((json) => {
            return json;
        })
}

export const Option = {
    get: { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } },
    post: { method: 'POST', headers: { 'User-Agent': 'Mozilla/5.0' } },
    put: { methoe: 'PUT', headers: { 'User-Agent': 'Mozilla/5.0' } },
    postJson: { method: 'POST', headers: { 'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json' } },
    putJson: { method: 'PUT', headers: { 'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json' } }
}


export default { Async, Await, Option }