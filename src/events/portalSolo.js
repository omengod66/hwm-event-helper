import {setLeaderboard} from "../leaderboard";
import {collapseEventDesc, removeLeaderboard, setTimer} from "../utils/eventUtils";
import {eventHelperSettings, setSettings} from "../settings";
import {$, get} from "../utils/commonUtils";

export default async function portalSoloEvent() {
    if (location.href.includes("tj_single.")) {
        removeLeaderboard()
        collapseEventDesc()
        console.log("here")
        setTimer(document.querySelector(".global_container_block_header"))
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("center")).at(-1))
        eventHelperSettings($("tjset_but").parentElement, (container) => {
            setSettings("hide_portal_event_enemies", "Показывать только сложных противников", container, false)
            setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false)
        }, "beforebegin")

        if (get("hide_portal_event_enemies", false)) {
            Array.from(document.querySelectorAll(".global_container_block")).filter(e => e.innerHTML.includes("https://dcdn.heroeswm.ru/i/combat/btn_autoalignment.png"))
                .forEach(e => {
                    if (!e.innerText.includes("Сложный противник") && !e.innerText.includes("Difficult Enemy")) {
                        e.remove()
                    }
                })
        }
    }

}