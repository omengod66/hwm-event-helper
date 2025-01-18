import {$, get, pl_id, set} from "../utils/commonUtils";
import {collapseEventDesc, getCurrentLevel, removeLeaderboard, setTimer} from "../utils/eventUtils";
import {getEventBattles} from "../battles";
import {setLeaderboard} from "../leaderboard";
import {doGet} from "../utils/networkUtils";
import {getNewCreatureIcon} from "../templates";
import {eventHelperSettings, setSettings} from "../settings";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("auto_send_ffa_event", "Send battles from the FFA event to the service automatically", "Отправлять бои из КБО ивента в сервис автоматически", "Відправляти бої з КБО Івенту в сервіс автоматично"))
    texts.addText(new LocalizedText("only_clan_visibility", "My battles are only available to the clan", "Мои бои доступны только для клана", "Мої бої доступні лише для клану"))
    texts.addText(new LocalizedText("collapse_event_desc", "Always collapse battle descriptions", "Всегда сворачивать описания боев", "Завжди згортати описи боїв"))
    texts.addText(new LocalizedText("show_creature_calculator", "Show recruit count calculator", "Показывать калькулятор численности", "Показувати калькулятор чисельності"))
    texts.addText(new LocalizedText("hide_easy_examples", "Hide easier examples", "Скрывать облегченные проходки", "Приховувати полегшені проходки"))
    texts.addText(new LocalizedText("current_amount", "Current number of creatures + ", "Текущее количество существ + ", "Поточна кількість істот + "))
    return texts
}

let allTexts = getAllTexts()


export default async function thiefEvent() {
    if (/(ambush_single_event|ambush_event|map_hero_event)/.test(location.href)) {
        removeLeaderboard()
        if (/map_hero_event/.test(location.href)) {
            if (typeof hwm_mobile_view === "undefined") {
                let elem = document.querySelector(".event_result_attack")
                elem.style.flexDirection = "row-reverse"
                elem.style.flexGrow = "unset"
                elem.style.width = "unset"
                elem.children[1].style.margin = "0"
                elem.children[0].style.maxWidth = "500px"
                elem.children[0].style.marginLeft = "1em"
                elem.children[0].style.justifyContent = "flex-start"

                let container = document.querySelector("#hwm_no_zoom")
                container.style.width = ""
                container.style.maxWidth = ""

                document.querySelector(".Global").style.width = "unset"
                document.querySelector(".CampaignMapContainer").style.width = "unset"
                document.querySelector(".CampaignMapBorder").style.width = "100%"
                document.querySelector(".CampaignMapCorners").style.width = "100%"
            }
        }

        eventHelperSettings(document.querySelector("#event_map"), (container) => {
            setSettings("auto_send_ffa_event", allTexts.get("auto_send_ffa_event"), container)
            setSettings("only_clan_visibility", allTexts.get("only_clan_visibility"), container, false)
            setSettings("collapse_event_desc", allTexts.get("collapse_event_desc"), container, false)
            setSettings("hide_easy_examples", allTexts.get("hide_easy_examples"), container, false)
            setSettings("show_creature_calculator", allTexts.get("show_creature_calculator"), container)
        }, "afterbegin")

        set("eh_current_level", null)
        setTimer(document.querySelector(".global_container_block_header"))
        collapseEventDesc()
        interceptButtons()
        document.querySelector(".new_event_map").insertAdjacentHTML("afterend", `<div id="battle_examples"></div>`)
        getEventBattles($(`battle_examples`))
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).children[0].getElementsByTagName("center")).at(-1))
        if (!location.href.includes("ambush_event")) {
            showCalculator()
        } else {
            document.querySelector('a[href^="army_info.php?name=fahila"]').insertAdjacentHTML("afterend", `
             <a href="${location.href.includes("lordswm") ? "https://daily.lordswm.com/event/pet" : "https://daily.heroeswm.ru/event/pet"}" target="_blank">Статистика покемонов</a>
            `)
        }
    }

    function interceptButtons() {
        let buttons = Array.from(document.querySelectorAll('input[id^=ne_attack_button]'))
        let available = buttons.filter(x => !x.disabled).length
        buttons.forEach((button, index) => {
            button.addEventListener("mousedown", () => {
                set("event_battle_side", (button.parentElement.querySelector("[name='variant']").value - 1) % 2)
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
            let creaturesMultiplier = document.querySelector('img[src$="/i/kstat4.gif"]').parentElement.nextElementSibling.firstElementChild.innerText
            creaturesMultiplier = creaturesMultiplier.match(/\d{1,3}/)[0] - 0

            document.querySelector("#map_event_stats").insertAdjacentHTML("beforeend", `
                <div id="ambush-creatures" style="display: flex; flex-direction: column; align-items: center">
                    <div>${allTexts.get("current_amount")}<input type="text" id="your-creatures-multiplier" style="width: 30px;" value="0">% <span class="home_button2 btn_hover2" id="add_percent" style="vertical-align: middle;">+1%</span></div>
                    <div id="current-ambush-creatures"></div>
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
            })
            $(`your-creatures-multiplier`).addEventListener('input', () => {
                applyMultiplier(creaturesData, creaturesMultiplier)
            })
        }
    }

    function applyMultiplier(creaturesData, creaturesMultiplier) {
        $(`current-ambush-creatures`).innerHTML = ""
        let newMultiplier = $(`your-creatures-multiplier`).value - 0
        creaturesData.forEach(creature => {
            $(`current-ambush-creatures`).insertAdjacentHTML("beforeend", getNewCreatureIcon(creature.portrait, Math.round(creature.amount * (1 + 0.01 * (creaturesMultiplier + newMultiplier)))))
        })
    }
}