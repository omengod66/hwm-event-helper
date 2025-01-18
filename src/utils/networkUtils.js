const HWM_EVENTS_SERVER = "https://hwm.achepta.com"
const DAILY_SERVER = "https://daily.lordswm.com/api"

function doRequest(url, method, body, html) {
    return new Promise((resolve => {
        let http = new XMLHttpRequest;

        if (html) {
            http.overrideMimeType("text/html; charset=windows-1251");
            http.open(method, url, true)
        } else {
            if (url.includes(".php")) {
                http.open(method, `${DAILY_SERVER}/${url}`, true)

            } else {

            http.open(method, `${HWM_EVENTS_SERVER}/${url}`, true)
            }
        }
        http.send(body);
        http.onreadystatechange = function () {
            if (http.readyState === 4) {
                if (http.status === 200 || http.status === 201) {
                    let response = null
                    if (html) {
                        response = new DOMParser().parseFromString(http.responseText, "text/html")
                    } else {
                        try {
                            response = JSON.parse(http.responseText)
                        } catch (e) {}
                    }
                    resolve(response)
                } else {
                    resolve(http.responseText)
                }
            }
        };
    }))
}

export async function doGet(url, html = false) {
    return doRequest(url, "GET", null, html)
}

export async function doPost(url, params, html = false) {
    return doRequest(url, "POST", params, html)
}
