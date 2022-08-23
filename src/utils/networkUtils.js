let OUTER_REQUESTS
if (typeof GM_xmlHttpRequest !== "undefined") {
    OUTER_REQUESTS = GM_xmlHttpRequest
} else if (typeof GM_xmlhttpRequest !== "undefined") {
    OUTER_REQUESTS = GM_xmlhttpRequest
} else if (typeof GM !== "undefined" && typeof GM.xmlHttpRequest !== "undefined") {
    OUTER_REQUESTS = GM.xmlHttpRequest
} else if (typeof GM !== "undefined" && typeof GM.xmlhttpRequest !== "undefined") {
    OUTER_REQUESTS = GM.xmlhttpRequest
}

const HWM_EVENTS_SERVER = "http://hwm.events"

export function doGet(url, callback, html = false) {
    OUTER_REQUESTS({
        method: "GET",
        url: `${HWM_EVENTS_SERVER}/${url}`,
        onload: function (res) {
            if (html) {
                callback(new DOMParser().parseFromString(res.responseText, "text/html"))
            } else {
                callback(JSON.parse(res.responseText))
            }
        }
    });
}

export function doPost(url, params, callback, html = false) {
    OUTER_REQUESTS({
        method: "POST",
        url: `${HWM_EVENTS_SERVER}/${url}`,
        data: params,
        onload: function (res) {
            if (html) {
                callback(new DOMParser().parseFromString(res.responseText, "text/html"))
            } else {
                callback()
            }
        }
    });
}

export function doHWMGet(url, callback) {
    let http = new XMLHttpRequest;
    http.open('GET', url, true)
    http.overrideMimeType("text/html; charset=windows-1251");
    http.send(null);
    http.onreadystatechange = function () {//Call a function when the state changes
        if (http.readyState === 4 && http.status === 200) {
            callback(new DOMParser().parseFromString(http.responseText, "text/html"))
        }
    };
}

export function doHWMPost(url, params, callback) {
    let http = new XMLHttpRequest;
    http.open('POST', url, true)
    http.overrideMimeType("text/html; charset=windows-1251");
    http.send(params);
    http.onreadystatechange = function () {//Call a function when the state changes
        if (http.readyState === 4 && http.status === 200) {
            callback(new DOMParser().parseFromString(http.responseText, "text/html"))
        }
    };
}

