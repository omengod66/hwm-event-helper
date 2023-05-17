import {$, get, pl_id, set} from "../utils/commonUtils";
import {collapseEventDesc, getCurrentLevel, setTimer} from "../utils/eventUtils";
import {getEventBattles} from "../battles";
import {setLeaderboard, setTopClanAttempts} from "../leaderboard";
import {doGet} from "../utils/networkUtils";
import {getNewCreatureIcon} from "../templates";
import {eventHelperSettings, setSettings} from "../settings";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("auto_send_ffa_event", "Send battles from the FFA event to the service automatically", "Отправлять бои из КБО ивента в сервис автоматически", "Відправляти бої з КБО Івенту в сервіс автоматично"))
    texts.addText(new LocalizedText("only_clan_visibility", "My battles are only available to the clan", "Мои бои доступны только для клана", "Мої бої доступні лише для клану"))
    texts.addText(new LocalizedText("collapse_event_desc", "Always collapse battle descriptions", "Всегда сворачивать описания боев", "Завжди згортати описи боїв"))
    texts.addText(new LocalizedText("return_to_prev_level", "Return to an unfinished level", "Возвращать на незавершенный уровень", "Повертати на незавершений рівень"))
    texts.addText(new LocalizedText("show_creature_calculator", "Show recruit count calculator", "Показывать калькулятор численности", "Показувати калькулятор чисельності"))
    texts.addText(new LocalizedText("current_amount", "Current number of creatures (including additional %)", "Текущее количество существ (с учетом дополнительных % численности)", "Поточна кількість істот (з урахуванням додаткових % чисельності)"))
    texts.addText(new LocalizedText("new_amount", "Number of creatures when added", "Количество существ при добавлении", "Кількість істот при додаванні"))
    texts.addText(new LocalizedText("show_event_timer", "Show time until the end of the event", "Показывать время до конца ивента", "Показувати час до кінця івента"))
    texts.addText(new LocalizedText("show_top_clan_attempts", "Show remaining attempts for TOP3 clans", "Показывать оставшиеся попытки у ТОП3 кланов", "Показувати спроби, що залишилися, у ТОП3 кланів"))
    return texts
}

let allTexts = getAllTexts()


export default async function thiefEvent() {
    if (/(ambush_single_event|map_hero_event)/.test(location.href)) {
        eventHelperSettings(document.querySelector("#map_event_stats"), (container) => {
            setSettings("auto_send_ffa_event", allTexts.get("auto_send_ffa_event"), container)
            setSettings("only_clan_visibility", allTexts.get("only_clan_visibility"), container, false)
            setSettings("collapse_event_desc",  allTexts.get("collapse_event_desc"), container, false)
            setSettings("return_to_prev_level",  allTexts.get("return_to_prev_level"), container, false)
            setSettings("show_creature_calculator",  allTexts.get("show_creature_calculator"), container)
            setSettings("show_top_clan_attempts", allTexts.get("show_top_clan_attempts"), container)
            setSettings("show_event_timer", allTexts.get("show_event_timer"), container)
        }, "afterbegin")

        set("eh_current_level", null)
        if (get("show_event_timer", true)) {
            setTimer(document.querySelector(".global_container_block_header"))
        }
        collapseEventDesc()
        interceptButtons()
        document.querySelector(".new_event_map").insertAdjacentHTML("afterend", `<div id="battle_examples"></div>`)
        getEventBattles($(`battle_examples`)).then(battles => {
            trySetCreatureAmount(battles["AFS"])
            trySetCreatureAmount(battles["FFA"])
        })
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).children[0].getElementsByTagName("center")).at(-1))
        if (get("show_top_clan_attempts", true)) {
            setTopClanAttempts(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("table")).at(-1))
        }
        showCalculator()
    }

    function interceptButtons() {
        let buttons = Array.from(document.querySelectorAll('input[id^=ne_attack_button]'))
        let available = buttons.filter(x => !x.disabled).length
        buttons.forEach((button, index) => {
            button.addEventListener("mousedown", () => {
                set("event_battle_side", (button.parentElement.querySelector("[name='variant']").value-1) % 2)
                set("eh_current_level", [getCurrentLevel(), available])
            })
        })
    }

    async function showCalculator() {
        if (get("show_creature_calculator", true)) {
            let doc = await doGet(`/pl_info.php?id=${pl_id}`, true)
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
            let creaturesMultiplier = Array.from(document.querySelectorAll("div.show_hint")).at(-1).querySelector("div > div:nth-child(2) > b").innerText
            creaturesMultiplier = creaturesMultiplier.match(/\d{1,3}/)[0] - 0
            document.querySelector("#map_event_stats").insertAdjacentHTML("beforeend", `
                <div id="ambush-creatures" style="display: flex; flex-direction: column; align-items: center">
                    <div>${allTexts.get("current_amount")}</div><div id="current-ambush-creatures"></div><br>
                    <div>${allTexts.get("new_amount")} +<input type="text" id="your-creatures-multiplier" style="width: 30px;" value="1">% <div class="btn-gradient blue" id="add_percent">+1%</div></div>
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
        }
    }

    function applyMultiplier(creaturesData, creaturesMultiplier) {
        $(`future-ambush-creatures`).innerHTML = ""
        let newMultiplier = $(`your-creatures-multiplier`).value - 0
        creaturesData.forEach(creature => {
            $(`future-ambush-creatures`).insertAdjacentHTML("beforeend", getNewCreatureIcon(creature.portrait, Math.round(creature.amount * (1 + 0.01 * (creaturesMultiplier + newMultiplier)))))
        })
    }

    function trySetCreatureAmount(battles) {

    }
}