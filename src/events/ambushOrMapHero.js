import {$, pl_id, set} from "../utils/commonUtils";
import {collapseEventDesc, getCurrentLevel} from "../utils/eventUtils";
import {getEventBattles} from "../battles";
import {setLeaderboard} from "../leaderboard";
import {doGet} from "../utils/networkUtils";
import {getNewCreatureIcon} from "../templates";
import {eventHelperSettings, setSettings} from "../settings";

export default async function thiefEvent() {
    if (/(ambush_single_event|map_hero_event)/.test(location.href)) {
        set("eh_current_level", null)
        collapseEventDesc()
        interceptButtons()
        getEventBattles(document.querySelectorAll('[align="left"][valign="top"]')[1])
        setLeaderboard(Array.from(document.querySelectorAll('[align="left"][valign="top"]')[0].getElementsByTagName("center")).slice(-1)[0])
        let doc = await doGet(`/pl_info.php?id=${pl_id}`, true)
        processPlInfoTroopsResponse(doc)
    }

    function interceptButtons() {
        let buttons = Array.from(document.querySelectorAll("#close-image"))
        if (buttons.length === 4) {
            let available = 4 - buttons.filter(x => x.disabled).length
            buttons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    set("event_battle_side", index % 2)
                    set("eh_current_level", [getCurrentLevel(), available])
                })
            })
        }
    }

    function processPlInfoTroopsResponse(doc) {
        let creaturesData = []
        Array.from(doc.getElementsByClassName("cre_creature72")).forEach(creature => {
            let creatureInfo = {"rarity": "1"}
            if (creature.getElementsByTagName('img')[0].src.includes("empty")) {
                return
            }
            creatureInfo.portrait = creature.getElementsByTagName('img')[0].src.match(/portraits\/(\w+)_?anip40/)[1] + "ani"
            creatureInfo.amount = creature.getElementsByClassName('cre_amount72')[0].innerText
            creaturesData.push(creatureInfo)
        })
        showAmbushCreatures(creaturesData)
    }

    function showAmbushCreatures(creaturesData) {
        let creaturesMultiplier = document.querySelector(" div.TextBlock.TextBlockTOP > div > table > tbody > tr:nth-child(3) > td:nth-child(8) > b").innerText
        creaturesMultiplier = creaturesMultiplier.match(/\d{1,3}/)[0] - 0
        document.querySelector('.Global').insertAdjacentHTML("afterend", `
                <div id="ambush-creatures" style="display: flex; flex-direction: column; align-items: center">
                    <div>Текущее количество существ (с учетом дополнительных % численности)</div><div id="current-ambush-creatures"></div><br>
                    <div>Количество существ при добавлении +<input type="text" id="your-creatures-multiplier" style="width: 30px;" value="1">% <div class="btn-gradient blue" id="add_percent">+1%</div></div>
                    <div id="future-ambush-creatures"></div><br>
                </div>`)
        $("add_percent").addEventListener("click", () => {
            let currentMultiplierElement = $(`your-creatures-multiplier`)
            let currentMultiplier = currentMultiplierElement.value - 0
            currentMultiplierElement.value = currentMultiplier + 1
            applyMultiplier(creaturesData, creaturesMultiplier)
        })
        creaturesData.forEach(creature => {
            let defaultAmount = creature.amount
            $(`current-ambush-creatures`).insertAdjacentHTML("beforeend", getNewCreatureIcon(creature.portrait, Math.round(defaultAmount * (1 + 0.01 * creaturesMultiplier))))
            $(`future-ambush-creatures`).insertAdjacentHTML("beforeend", getNewCreatureIcon(creature.portrait, Math.round(defaultAmount * (1 + 0.01 * (creaturesMultiplier + 1)))))
        })
        $(`your-creatures-multiplier`).addEventListener('input', () => {
            applyMultiplier(creaturesData, creaturesMultiplier)
        })
        eventHelperSettings(document.querySelector('.Global'), (container) => {
            setSettings("auto_send_ffa_event", "Отправлять бои из КБО ивента в сервис автоматически", container)
            setSettings("only_clan_visibility", "Мои бои доступны только для клана", container, false)
            setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false)
            setSettings("return_to_prev_level", "Возвращать на незавершенный уровень", container, false)
        }, "afterend")
    }

    function applyMultiplier(creaturesData, creaturesMultiplier) {
        $(`future-ambush-creatures`).innerHTML = ""
        let newMultiplier = $(`your-creatures-multiplier`).value - 0
        creaturesData.forEach(creature => {
            $(`future-ambush-creatures`).insertAdjacentHTML("beforeend", getNewCreatureIcon(creature.portrait, Math.round(creature.amount * (1 + 0.01 * (creaturesMultiplier + newMultiplier)))))
        })
    }
}