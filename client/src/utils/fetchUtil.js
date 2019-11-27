export default {
    fetchAsync(url, option, callback) {
        fetch(url, option)
            .then((res) => {
                return res.json();
            }).then((json) => {
                if (callback !== undefined)
                    callback(json)
            })
    },
    async fetchAwait(url, option) {
        const res = await fetch(url, option)
            .then((res) => {
                return res.json();
            }).then((json) => {
                return json;
            })

        return res;
    },
    option: {
        get: { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } },
        post: { method: 'POST', headers: { 'User-Agent': 'Mozilla/5.0' } },
        post_json: { method: 'POST', headers: { 'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json' } }
    }
}