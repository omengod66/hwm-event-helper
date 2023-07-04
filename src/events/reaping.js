import {setLeaderboard, setTopClanAttempts} from "../leaderboard";
import {get, set} from "../utils/commonUtils";
import {eventHelperSettings, setSettings} from "../settings";
import {collapseEventDesc, getCurrentLevel, setClickableLevels, setTimer} from "../utils/eventUtils";
import {getEventBattles} from "../battles";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";
import {doGet} from "../utils/networkUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("auto_send_reaping_event", "Send battles from the event to the service automatically", "Отправлять бои из ивента в сервис автоматически", "Відправляти бої з івента у сервіс автоматично"))
    texts.addText(new LocalizedText("only_clan_visibility", "My battles are only available to the clan", "Мои бои доступны только для клана", "Мої бої доступні лише для клану"))
    texts.addText(new LocalizedText("collapse_event_desc", "Always collapse fight descriptions", "Всегда сворачивать описания боев", "Завжди згортати описи боїв"))
    texts.addText(new LocalizedText("hide_rogues_event_enemies", "Show price statistics", "Показывать статистику цен", "Показувати статистику цін"))
    texts.addText(new LocalizedText("bought", "bought", "куплено", "куплено"))
    texts.addText(new LocalizedText("sold", "sold", "продано", "продано"))
    texts.addText(new LocalizedText("trade_for", "for", "по", "по"))
    texts.addText(new LocalizedText("trade_history", "Trade history", "История покупок и продаж", "Історія покупок та продажів"))
    texts.addText(new LocalizedText("show_event_timer", "Show time until the end of the event", "Показывать время до конца ивента", "Показувати час до кінця івента"))
    texts.addText(new LocalizedText("show_top_clan_attempts", "Show remaining attempts for TOP3 clans", "Показывать оставшиеся попытки у ТОП3 кланов", "Показувати спроби, що залишилися, у ТОП3 кланів"))
    texts.addText(new LocalizedText("hire_hint", "Red means higher prices, while green means the opposite. At this event, the cost of a creature can only be within + -15% of the initial cost. Thus, if 115% is written next to the price, it will no longer rise upwards, and if the price is 85%, then it will no longer fall either.",
        "Красный цвет значит подорожание, а зеленый наоборот. На этом ивенте цена существа может находиться только в пределах +-15% от изначальной стоимости. Таким образом, если рядом с ценой написано 115%, она больше расти вверх не будет, а если цена 85%, то падать больше не будет тоже.",
        "Червоний колір означає подорожчання, а зелений – навпаки. На цьому івенті ціна істоти може бути лише в межах +-15% від початкової вартості. Таким чином, якщо поряд з ціною написано 115%, вона більше не зростатиме, а якщо ціна 85%, то падати більше не буде теж."))

    return texts
}

let allTexts = getAllTexts()

export default async function reapingEvent() {
    if (location.href.includes("reaping_event.")) {
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("center")).at(-1))
        if (get("show_top_clan_attempts", true)) {
            setTopClanAttempts(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("table")).at(-1))
        }
        eventHelperSettings(Array.from(document.querySelectorAll(".global_container_block")).at(-1).firstChild, (container) => {
            setSettings("auto_send_reaping_event", allTexts.get("auto_send_reaping_event"), container)
            setSettings("only_clan_visibility", allTexts.get("only_clan_visibility"), container, false)
            setSettings("collapse_event_desc", allTexts.get("collapse_event_desc"), container, false)
            setSettings("hide_rogues_event_enemies", allTexts.get("hide_rogues_event_enemies"), container)
            setSettings("show_top_clan_attempts", allTexts.get("show_top_clan_attempts"), container)
            setSettings("show_event_timer", allTexts.get("show_event_timer"), container)
        }, "afterbegin")
        set("eh_current_level", null)
        if (get("show_event_timer", true)) {
            setTimer(document.querySelector(".global_container_block_header"))
        }
        collapseEventDesc()
        setClickableLevels()
        getEventBattles(Array.from(document.querySelectorAll(".global_container_block")).at(-2), "getRoguesEventBattles", 1)

        let currentLevel = getCurrentLevel()
        let storedLevel = get("currentEventLevel", "0")
        if (storedLevel !== currentLevel) {
            await setEventCreaturesInfo()
            set("currentEventLevel", currentLevel)
        }
    }

    async function setEventCreaturesInfo() {
        let doc = await doGet("/reaping_event_set.php", true)
        let creatureBlocks = doc.querySelectorAll("#ne_set_troops_on_market .hwm_event_set_stack_pic")
        let creaturesInfo = {}
        creatureBlocks.forEach(block => {
            let creaturePriceMatch = block.innerHTML.match(/silver48\.png'\)"><b>(\d{0,3},?\d{0,3})/)
            if (creaturePriceMatch) {
                let price = creaturePriceMatch[1].replace(",", "")-0
                let portrait = block.innerHTML.match(/portraits\/([a-zA-Z0-9_-]+)p33/)[1]
                let id = block.querySelector("a").href.split("=")[1]
                creaturesInfo[portrait] = [id, price]
            }
        })
        set("eventCreaturesInfo", creaturesInfo)
    }
}