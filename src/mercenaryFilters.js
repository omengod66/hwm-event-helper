import {$, get, set} from "./utils/commonUtils";

export function addFilteringArea() {
    document.querySelector(".Global").insertAdjacentHTML("afterend",
        getFilteringAreaTemplate())
    setBlockedWavesListener()
    setAllowedWavesListener()
    setBlockedHeroesListener()
    setAllowedHeroesListener()
    setBlockedLeadershipListener()

    function setBlockedWavesListener() {
        $('blocked-waves-list').addEventListener('input', (event) => {
            set("blocked_waves_1", event.target.value.split(",").filter(item => item !== "").map(item => item.trim()))
        })
    }

    function setAllowedWavesListener() {
        $('allowed-waves-list').addEventListener('input', (event) => {
            set("allowed_waves_1", event.target.value.split(",").filter(item => item !== "").map(item => item.trim()))
        })
    }

    function setBlockedHeroesListener() {
        $('blocked-heroes-list').addEventListener('input', (event) => {
            set("blocked_heroes_1", event.target.value.split(",").filter(item => item !== "").map(item => item.trim()))
        })
    }

    function setAllowedHeroesListener() {
        $('allowed-heroes-list').addEventListener('input', (event) => {
            set("allowed_heroes_1", event.target.value.split(",").filter(item => item !== "").map(item => item.trim()))
        })
    }

    function setBlockedLeadershipListener() {
        $('blocked-leadership').addEventListener('input', (event) => {
            set("blocked_leadership", event.target.value.trim())
        })
    }

    function getFilteringAreaTemplate() {
        return `
                <style>
                    .filters-container {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .filtering-item {}
                    .filtering-item textarea {
                        min-width: 400px;
                        resize: none;
                        overflow-x: visible;
                        border-radius: 5px;
                    }
                    .filtering-item:nth-child(n+1) {
                        margin-top: 10px;
                    }
                </style>
                <br/>
                <div class="filters-container">
                    <div><b>Фильтры (сохраняется автоматически):</b></div>
                    <div class="filtering-item">
                        <textarea id="blocked-waves-list" placeholder="Нежеланные волны через запятую">${get("blocked_waves_1", []).join(",")}</textarea>
                    </div>
                    <div class="filtering-item">
                        <textarea id="allowed-waves-list" placeholder="Желанные волны через запятую">${get("allowed_waves_1", []).join(",")}</textarea>
                    </div>
                    <div class="filtering-item">
                        <textarea id="blocked-heroes-list" placeholder="Нежеланные никнеймы через запятую">${get("blocked_heroes_1", []).join(",")}</textarea>
                    </div>
                    <div class="filtering-item">
                        <textarea id="allowed-heroes-list" placeholder="Желанные никнеймы через запятую">${get("allowed_heroes_1", []).join(",")}</textarea>
                    </div>
                    <div class="filtering-item">
                        <textarea id="blocked-leadership" placeholder="Нижний порог по лидерству">${get("blocked_leadership", "")}</textarea>
                    </div>
                </div>
                <br/>`
    }
}

export function processFilters() {
    if (document.querySelector("#lre_merc_block > div")) {
        window.leader_rogues_event_state_handle = function () {
            if (this.readyState == 4) {
                var txt = this.responseText;
                var short_txt = txt.substring(0, 11);
                if (short_txt != '|merc_stat|') {
                    window.location = 'leader_rogues.php';
                    return 0;
                }
                var data = txt.split('|merc_stat|');
                if (data && data[1] && document.getElementById('lre_merc_block')) {
                    let doc = new DOMParser().parseFromString(data[1], "text/html")
                    let trs = Array.from(doc.querySelector("div").childNodes)
                        .filter(node => node.innerText.length > 0)
                    processBlockedWaves(trs)
                    processBlockedHeroes(trs)
                    processBlockedLeadership(trs)
                    document.getElementById('lre_merc_block').innerHTML = doc.documentElement.innerHTML;
                    if (typeof hwm_hints_init === 'function')
                        hwm_hints_init();
                }
            }
        }
    }

    function processBlockedWaves(trs) {
        let blockedWaves = get("blocked_waves_1", []).filter(item => item !== "").map(item => item.trim())
        let allowedWaves = get("allowed_waves_1", []).filter(item => item !== "").map(item => item.trim())
        trs.forEach(tr => {
            let waveId = tr.textContent.match(/(Ур\.: |Lv\.: )(\d{1,3})/)[2]
            if (blockedWaves.includes(waveId) || allowedWaves.length > 0 && !allowedWaves.includes(waveId)) {
                try {
                    tr.previousSibling.remove()
                    tr.remove()
                } catch (e) {}
            }
        })
    }

    function processBlockedHeroes(trs) {
        let blockedHeroes = get("blocked_heroes_1", []).filter(item => item !== "").map(item => item.trim())
        let allowedHeroes = get("allowed_heroes_1", []).filter(item => item !== "").map(item => item.trim())
        trs.forEach(tr => {
            let heroName = tr.textContent.match(/([А-Яа-яёЁa-zA-Z0-9_* ()-]+) \[\d{1,2}]/)[1]
            if (blockedHeroes.includes(heroName) || allowedHeroes.length > 0 && !allowedHeroes.includes(heroName)) {
                try {
                    tr.previousSibling.remove()
                    tr.remove()
                } catch (e) {}
            }
        })
    }

    function processBlockedLeadership(trs) {
        let blockedLeadership = get("blocked_leadership", "0").trim()
        trs.forEach(tr => {
            let leadership = tr.textContent.match(/\d{1,2},\d{3}/)[0].replaceAll(",", "")
            if (blockedLeadership - 0 > leadership - 0) {
                try {
                    tr.previousSibling.remove()
                    tr.remove()
                } catch (e) {}
            }
        })
    }
}