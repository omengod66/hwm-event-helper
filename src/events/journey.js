import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";
import {setLeaderboard} from "../leaderboard";
import {removeLeaderboard} from "../utils/eventUtils";


function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("auto_send_reaping_event", "Send battles from the event to the service automatically", "Отправлять бои из ивента в сервис автоматически", "Відправляти бої з івента у сервіс автоматично"))

    return texts
}

let allTexts = getAllTexts()

export default async function journeyEvent() {
    if (location.href.includes("journey_event.php?castle=1")) {
        removeLeaderboard()
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("center")).at(-1))

    }
}