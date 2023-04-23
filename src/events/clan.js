import {doGet} from "../utils/networkUtils";
import {get} from "../utils/commonUtils";

const {eventHelperSettings, setSettings} = require("../settings");
export default async function clanPage() {
    if (/clan_info\.php/.test(location.href)) {
        eventHelperSettings(Array.from(document.getElementsByTagName("table")).at(-1), (container) => {
            setSettings("show_event_attempts_left", "Показывать оставшиеся попытки у игроков", container, false)
        }, "beforebegin")

        if (get("show_event_attempts_left", false)){
            let clanId = new URLSearchParams(window.location.search).get("id")
            let heroesAttempts = await doGet(`getTopClanDetailedAttempts?clan_id=${clanId}`)

            Array.from(document.getElementsByTagName("table")).at(-1).querySelectorAll("tr")
                .forEach(heroElem => {
                    let heroId = heroElem.innerHTML.match(/id=(\d{1,8})/)[1]
                    let heroAttempts = heroesAttempts[heroId]
                    heroElem.insertAdjacentHTML("beforeend", `
                        <td class="wbwhite">${
                            heroAttempts ? heroAttempts : 0
                        }</td>
                    `)
                })
        }
    }
}