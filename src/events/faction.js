import {setLeaderboard} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {get} from "../utils/commonUtils";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";
import {removeLeaderboard, setTimer} from "../utils/eventUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("hide_faction_event_enemies", "Show enemies with max power only", "Показывать противников только с максимальной мощностью", "Показувати супротивників лише з максимальною потужністю"))
    texts.addText(new LocalizedText("mana_warning", "Enemies are stealing mana!", "В армии противника пожиратели маны!", "В армії противника крадії мани!"))
    texts.addText(new LocalizedText("faction_custom_ins", `Enable unit placement saving 
                        <img src="https://hwm.events/battles/custom_ins.gif" height="400px" onclick='event.stopPropagation()'>
                        (fields with different height require different saved placement)
                    `, `Возможность автоматической расстановки 
                        <img src="https://hwm.events/battles/custom_ins.gif" height="400px" onclick='event.stopPropagation()'>
                        (для полей разной высоты нужна своя расстановка)
                    `, `Можливість автоматичного розміщення 
                        <img src="https://hwm.events/battles/custom_ins.gif" height="400px" onclick='event.stopPropagation()'>
                        (для поля різної висоти потрібне своє розміщення)
                    `))
    texts.addText(new LocalizedText("custom_ins_auto", "Automatically apply saved placement", `Автоматически применять сохраненную расстановку`, "Автоматично застосовувати збережене розміщення"))

    return texts
}

let allTexts = getAllTexts()

export default function factionEvent() {
    function showManaWarning(enemies) {
        enemies.forEach(enemy => {
            let enemyHTML = enemy.innerHTML
            if (
                enemyHTML.includes("name=imp\"")
                || enemyHTML.includes("name=familiar\"")
                || enemyHTML.includes("name=vermin\"")
                || enemyHTML.includes("name=spegasus\"")
            ) {
                enemy.children[3].insertAdjacentHTML("afterend", `
                        <div><b style="color: red">${allTexts.get("mana_warning")}</b></div>
                    `)
            }
        })

    }

    if (location.href.includes("faction_event")) {
        removeLeaderboard()
        setTimer(document.querySelectorAll(".global_container_block_header")[1])
        setLeaderboard(document.querySelector("#hwm_no_zoom > div > div.frac_event_stat > div > div:nth-child(2) > center"))
        eventHelperSettings(document.querySelector("#fe_skip"), (container) => {
            setSettings("hide_faction_event_enemies", allTexts.get("hide_faction_event_enemies"), container, false)
            setSettings("faction_custom_ins", allTexts.get("faction_custom_ins"), container, true)
            setSettings("custom_ins_auto", allTexts.get("custom_ins_auto"), container, false)
        }, "beforebegin")
        let enemies = getEnemies()
        let maxPower = getMaxPower(enemies)
        if (get("hide_faction_event_enemies", false)) {
            filterFactionEventEnemies(enemies, maxPower)
        }
        showManaWarning(enemies)
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
            }
        })
    }
}