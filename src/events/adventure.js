import {get} from "../utils/commonUtils";
import {setTopClanAttempts} from "../leaderboard";
import {setTimer} from "../utils/eventUtils";

const {setLeaderboard} = require("../leaderboard");
const {collapseEventDesc} = require("../utils/eventUtils");
const {eventHelperSettings, setSettings} = require("../settings");
const {getEventBattles} = require("../battles");

export default function adventureEvent() {
    if (/adventure_event\.php$/.test(location.href)) {
        setLeaderboard(document.querySelector('[style="min-width:250px;"]').getElementsByTagName("center")[0])
        if (get("show_top_clan_attempts", true)) {
            setTopClanAttempts(document.querySelector('[style="min-width:250px;"] > table'))
        }
        if (get("show_event_timer", true)) {
            setTimer(document.querySelector("h2"))
        }
    }
    if (location.href.includes("adventure_event.php?map=1")) {
        collapseEventDesc()
        eventHelperSettings(document.querySelector('.Global'), (container) => {
            setSettings("auto_send_ffa_event", "Отправлять бои из КБО ивента в сервис автоматически", container)
            setSettings("only_clan_visibility", "Мои бои доступны только для клана", container, false)
            setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false)
        }, "afterend")
        getEventBattles(document.querySelectorAll('[align="left"][valign="top"]')[1])
    }
}