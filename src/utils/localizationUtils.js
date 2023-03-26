export class LocalizedTextMap {
    constructor() {
        this.allTexts = new Map()
    }

    addText(localizedText) {
        this.allTexts[localizedText.id] = localizedText
    }

    get(id) {
        return this.allTexts[id][navigator.language.includes("uk") ? "ua" : navigator.language.includes("en") ? "en" : "ru"]
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