export let pl_id = getCookie("pl_id");
export let pl_lvl = get("hero_combat_lvl", 0)
export let my_sign = get("my_sign", null)
export let host = location.host;
export let cdnHost = host.includes("my.") ? "cfcdn.lordswm.com" : "dcdn.heroeswm.ru"

export let heroCreatures = {};

export function $(id, where = document) {
    return where.getElementById(id);
}

export function get(key, def) {
    let result = JSON.parse(typeof localStorage[key] === "undefined" || localStorage[key] === "undefined" ? null : localStorage[key]);
    return result == null ? def : result;
}

export function set(key, val) {
    localStorage[key] = JSON.stringify(val);
}

export function getScrollHeight() {
    return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
}

export function findAll(regexPattern, sourceString) {
    let output = []
    let match
    let regexPatternWithGlobal = RegExp(regexPattern, [...new Set("g" + regexPattern.flags)].join(""))
    while (match = regexPatternWithGlobal.exec(sourceString)) {
        delete match.input
        output.push(match)
    }
    return output
}

export function sortByKey(array, key, asc = 1) {
    return array.sort((a, b) => {
        let x = a[key];
        let y = b[key];
        return ((x < y) ? -1 * asc : ((x > y) ? 1 * asc : 0));
    });
}

export function mapToArray(map) {
    let result = []
    for (const [key, value] of Object.entries(map)) {
        result.push([parseInt(key), value])
    }
    return result
}

export function arrayToMapByKey(array, key){
    let result = {}
    array.forEach(item => {
        result[item[key]] = item
    })
    return result
}

export function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

export function groupByKey(array, key) {
    return array
        .reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, {[obj[key]]: (hash[obj[key]] || []).concat(obj)})
        }, {})
}

export function encode(str) {
    let customEncode = (e) => {
        return "%" +
            (parseInt(e.charAt(1) + e.charAt(5), 16) + 16 * ((x) => -(2 * x ** 3) / 3 + 20 * x ** 2 - (595 * x) / 3 + 650)(parseInt(e.charAt(4), 16)).toFixed())
                .toString(16)
    };
    return Array.from(str)
        .map(c => c.charCodeAt(0) >= 1040 && c.charCodeAt(0) <= 1103 ? customEncode(encodeURIComponent(c)) : encodeURIComponent(c))
        .join("")
}

export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export let allClasses = [
    [1, 'Рыцарь', 0, 'r1.png', 1],
    [1, 'Рыцарь света', 1, 'r101.png', 101],
    [2, 'Некромант', 0, 'r2.png', 2],
    [2, 'Некромант - повелитель смерти', 1, 'r102.png', 102],
    [3, 'Маг', 0, 'r3.png', 3],
    [3, 'Маг - разрушитель', 1, 'r103.png', 103],
    [4, 'Эльф', 0, 'r4.png', 4],
    [4, 'Эльф - заклинатель', 1, 'r104.png', 104],
    [5, 'Варвар', 0, 'r5.png', 5],
    [5, 'Варвар крови', 1, 'r105.png', 105],
    [5, 'Варвар - шаман', 2, 'r205.png', 205],
    [6, 'Темный эльф', 0, 'r6.png', 6],
    [6, 'Темный эльф - укротитель', 1, 'r106.png', 106],
    [7, 'Демон', 0, 'r7.png', 7],
    [7, 'Демон тьмы', 1, 'r107.png', 107],
    [8, 'Гном', 0, 'r8.png', 8],
    [8, 'Гном огня', 1, 'r108.png', 108],
    [9, 'Степной варвар', 0, 'r9.png', 9],
    [10, 'Фараон', 0, 'r10.png', 10]
];

export let allFactions = [
    [-1, 'All', ''],
    [1, 'Рыцарь', 'r1.png'],
    [2, 'Некромант', 'r2.png'],
    [3, 'Маг', 'r3.png'],
    [4, 'Эльф', 'r4.png'],
    [5, 'Варвар', 'r5.png'],
    [6, 'Темный эльф', 'r6.png'],
    [7, 'Демон', 'r7.png'],
    [8, 'Гном', 'r8.png'],
    [9, 'Степной варвар', 'r9.png'],
    [10, 'Фараон', 'r10.png'],
    [0, 'Нейтрал', 'r_neut.png']
];