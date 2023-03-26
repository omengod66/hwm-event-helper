import {setLeaderboard} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {get} from "../utils/commonUtils";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("hide_faction_event_enemies", "Show enemies with max power only", "Показывать противников только с максимальной мощностью", "Показувати супротивників лише з максимальною потужністю"))
    texts.addText(new LocalizedText("mana_warning", "Enemies are stealing mana!", "В армии противника пожиратели маны!", "В армії противника крадії мани!"))

    return texts
}

let allTexts = getAllTexts()

export default function factionEvent() {
    if (location.href.includes("faction_event")) {
        setLeaderboard(document.querySelector("#hwm_for_zoom > div > div:nth-child(1) > div > div:nth-child(2) > center"))
        eventHelperSettings(document.querySelector("#hwm_for_zoom > div > div.frac_event_right_block > div > div:nth-child(2)"), (container) => {
            setSettings("hide_faction_event_enemies", allTexts.get("hide_faction_event_enemies"), container, false)
        }, "beforeend")
        let enemies = getEnemies()
        let maxPower = getMaxPower(enemies)
        if (get("hide_faction_event_enemies", false)) {
            filterFactionEventEnemies(enemies, maxPower)
        }
    }

    function getEnemies() {
        return Array.from(document.getElementsByClassName("frac_enemy_block"))
    }

    function getMaxPower(enemies) {
        return enemies.reduce((prev, curr) => {
            let power = curr.children[3].innerText.split(": ")[1] - 0
            return power > prev ? power : prev;
        }, 0)
    }

    function filterFactionEventEnemies(enemies, maxPower) {
        enemies.forEach(enemy => {
            let power = enemy.children[3].innerText.split(": ")[1] - 0
            if (power < maxPower) {
                enemy.remove()
            } else {
                let enemyHTML = enemy.innerHTML
                if (
                    enemyHTML.includes("name=imp\"")
                    || enemyHTML.includes("name=familiar\"")
                    || enemyHTML.includes("name=vermin\"")
                    || enemyHTML.includes("name=spegasus\"")
                ) {
                    enemy.children[2].insertAdjacentHTML("afterend", `
                        <div><b style="color: red">${allTexts.get("mana_warning")}</b></div>
                    `)
                }
            }
        })
    }
}