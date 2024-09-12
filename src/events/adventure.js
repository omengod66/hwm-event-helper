import {get} from "../utils/commonUtils";
import {setTopClanAttempts} from "../leaderboard";
import {setTimer} from "../utils/eventUtils";

const {setLeaderboard} = require("../leaderboard");
const {collapseEventDesc} = require("../utils/eventUtils");
const {eventHelperSettings, setSettings} = require("../settings");
const {getEventBattles} = require("../battles");

export default function adventureEvent() {
    if (/adventure_event\.php$/.test(location.href)) {
        removeLeaderboard()
        setLeaderboard(Array.from(document.querySelectorAll("center")).at(-1))
        setTimer(document.querySelector(".global_container_block_header"))
    }
    if (location.href.includes("adventure_event.php?map=1")) {
        document.querySelector(".event_map").style.height = "unset"
        if (typeof hwm_mobile_view !== "undefined") {
            document.querySelector(".Global").style.height = "260px"
        }
        removeLeaderboard()
        setLeaderboard(Array.from(document.querySelectorAll("center")).at(-1))
        setTimer(document.querySelector(".global_container_block_header"))
        collapseEventDesc()
        eventHelperSettings(document.querySelector('.Global'), (container) => {
            setSettings("auto_send_ffa_event", "Отправлять бои из КБО ивента в сервис автоматически", container)
            setSettings("only_clan_visibility", "Мои бои доступны только для клана", container, false)
            setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false)
        }, "afterend")
        getEventBattles(document.querySelector('.event_map'), "getFFAEventBattles", 1)
    }
    function removeLeaderboard() {
        let center = Array.from(document.querySelectorAll("center")).at(-2)
        center.nextElementSibling.remove()
        center.remove()
    }
}