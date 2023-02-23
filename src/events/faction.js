import {setLeaderboard} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {get} from "../utils/commonUtils";

export default function factionEvent() {
    if (location.href.includes("faction_event")) {
        setLeaderboard(document.querySelector("#hwm_for_zoom > div > div:nth-child(1) > div > div:nth-child(2) > center"))
        eventHelperSettings(document.querySelector("#hwm_for_zoom > div > div.frac_event_right_block > div > div:nth-child(2)"), (container) => {
            setSettings("hide_faction_event_enemies", "Показывать противников только с максимальной мощностью", container, false)
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
            }
        })
    }
}