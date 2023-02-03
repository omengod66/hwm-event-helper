import {setLeaderboard} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {$, findAll, get, pl_lvl} from "../utils/commonUtils";
import {doGet} from "../utils/networkUtils";

export default function factionEvent() {
    let battles = []
    if (location.href.includes("faction_event")) {
        setLeaderboard(document.querySelector("#hwm_for_zoom > div > div:nth-child(1) > div > div:nth-child(2) > center"))
        eventHelperSettings(document.querySelector("#hwm_for_zoom > div > div.frac_event_right_block > div > div:nth-child(2)"), (container) => {
            setSettings("hide_faction_event_enemies", "Показывать противников только с максимальной мощностью", container, false)
            setSettings("auto_send_faction_event_battles", "Отправлять бои из фрак. ивента в сервис автоматически", container, true)
        }, "beforeend")
        let enemies = getEnemies()
        let maxPower = getMaxPower(enemies)
        if (get("hide_faction_event_enemies", false)) {
            filterFactionEventEnemies(enemies, maxPower)
        }
        // enemies = getEnemies()
        // setShowExampleListeners(enemies)
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

    function setShowExampleListeners(enemies) {
        enemies.forEach((enemy, index) => {
            let enemyTable = enemy.querySelector(`table[cellpadding="0"]`)
            let portraits = findAll(/portraits\/([a-zA-Z0-9_-]+)p40/, enemyTable.innerHTML).map(item => item[1])
            let amounts = Array.from(enemyTable.querySelectorAll("#add_now_count")).map(elem => parseInt(elem.innerText))
            if (amounts.length < portraits.length) {
                amounts.unshift(1)
            }
            portraits.sort((a, b) => a.localeCompare(b))
            amounts.sort((a, b) => a - b)

            enemy.insertAdjacentHTML("beforeend", `
                <div style="margin-top: 10px"><div id="load_examples_${index}" class="home_button2 btn_hover2" style="padding: 2px 4px">Загрузить примеры</div></div>
                `)
            $(`load_examples_${index}`).addEventListener("click", (e) => {
                e.target.remove()
                let request = [portraits.join("|"), amounts.join("|")].join("~")
                const dlgUrl = `getFactionEventBattles?enemy_id=${encodeURIComponent(request)}&token=${get("hwm_events_token", "")}`
                doGet(dlgUrl, doc => {
                    battles = doc
                    processFactionEventBattles(enemy)
                }, false)

            })
        })
    }

    function processFactionEventBattles(where = document.body) {
        where.insertAdjacentHTML("beforeend", getBattlesTemplate(battles))
    }

    function getBattlesTemplate(battles) {
        let result = ""
        result += `<div style="text-align: center; font-size: 14px; margin-top: 10px"><b>Твой уровень</b></div>`
        let my_lvl_battles = battles.filter(battle => battle["hero_lvl"] === pl_lvl)
        result += factionBattlesToHTML(my_lvl_battles)

        result += `<div style="text-align: center; font-size: 14px"><b>Другие уровни</b></div>`
        let not_my_lvl_battles = battles.filter(battle => battle["hero_lvl"] !== pl_lvl)
        result += factionBattlesToHTML(not_my_lvl_battles)

        return result

    }

    function factionBattlesToHTML(battles) {
        if (battles.length > 0) {
            battles.sort((a, b) => a.nickname.localeCompare(b.nickname))
            return battles.reduce((prev, curr, index) => {
                return prev + `
                    <div style="display: flex; justify-content: space-between; padding: 1px;">
                        <div>${index + 1}. </div>
                        <div style="text-align: center"> ${curr["nickname"]} [${curr["hero_lvl"]}]</div>
                        <div> <a target="_blank" href="/warlog.php?warid=${curr["battle_id"]}&show_for_all=${curr["battle_secret"]}">Бой</a></div>
                    </div>
                    `
            }, "")
        } else {
            return `<div style="text-align: center;"><b>пусто</b></div>`
        }
    }
}