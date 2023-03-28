let locale = "ru"
if (location.host === "my.lordswm.com" || navigator.language.includes("uk")) {
    locale = "ua"
}
if (location.host === "www.lordswm.com") {
    locale = "en"
}
export class LocalizedTextMap {
    constructor() {
        this.allTexts = new Map()
    }

    addText(localizedText) {
        this.allTexts[localizedText.id] = localizedText
    }

    get(id) {
        return this.allTexts[id][locale]
    }
}

export class LocalizedText {
    constructor(id, en = null, ru = null, ua = null) {
        this.id = id;
        this.en = en;
        this.ru = ru;
        this.ua = ua;
    }
}