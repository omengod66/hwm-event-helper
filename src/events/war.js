import {$, get, pl_id, set} from "../utils/commonUtils";
import {doGet} from "../utils/networkUtils";
import {sendBattle} from "../battles";

export default async function processBattlePage() {
    if (location.href.includes("war.php") &&
        (get("auto_send_lg", true)
            || get("auto_send_event_lg", true)
            || get("auto_send_ffa_event", true)
            || get("auto_send_faction_event_battles", true)
            || get("auto_send_rogues_event", true)
            || get("auto_send_reaping_event", true)
            || get("auto_send_hunt_event_battles", true))) {
        let battleData = window.run_all.toString()
        let battleType = battleData.match(/btype\|(\d{1,10})/)[1]
        if (["133", "135", "138", "139", "140", "142", "143", "144", "147", "148"].includes(battleType)) {
            let battle_id = new URLSearchParams(window.location.search).get("warid")
            let battle_secret = new URLSearchParams(window.location.search).get("show_for_all") || new URLSearchParams(window.location.search).get("show")
            if (battle_secret == null) {
                let doc = await doGet(`/pl_info.php?id=${pl_id}`, true);
                let match = doc.body.innerHTML.match(/(show_for_all|show)=(\w[0-9a-f]{10})/)
                if (match) {
                    battle_secret = match[2]
                }
            }
            let startId;
            startId = setInterval(main, 10)

            function main() {
                if (typeof finished !== "undefined" && finished || typeof battle_ended !== "undefined" && battle_ended) {
                    window.clearInterval(startId)
                    if (get("return_to_prev_level")) {
                        let eh_current_level = get("eh_current_level")
                        if (eh_current_level) {
                            let leaveBattleButton = $("btn_continue_WatchBattle")
                            leaveBattleButton.removeEventListener("mouseup", btn_continue_WatchBattle_onRelease)
                            leaveBattleButton.addEventListener("mouseup", () => {
                                if (eh_current_level[1] === 2 && eh_current_level[0] < 51) {
                                    location.href = `${document.referrer.split("?")[0]}?sel_level=${eh_current_level[0]}`
                                } else {
                                    location.href = `${document.referrer.split("?")[0]}`
                                }
                            })
                        }
                    }
                    if (battleType === "135" && get("auto_send_lg", true)) {
                        sendBattle(battle_id, battle_secret, "0")
                    } else if ((battleType === "142" || battleType === "143" || battleType === "138" || battleType === "148") && get("auto_send_ffa_event", true)) {
                        let battle_side = get("event_battle_side", -1)
                        set("event_battle_side", -1)
                        sendBattle(battle_id, battle_secret, "2", null, battle_side)
                    } else if (battleType === "139" && get("auto_send_event_lg", true)) {
                        sendBattle(battle_id, battle_secret, "1")
                    } else if (battleType === "144" && get("auto_send_faction_event_battles", true) || battleType === "140" && get("auto_send_hunt_event_battles", true)) {
                        sendBattle(battle_id, battle_secret, "3")
                    } else if (battleType === "133" && get("auto_send_rogues_event", true) || battleType === "147" && get("auto_send_reaping_event", true)) {
                        let battle_side = get("event_battle_side", -1)
                        set("event_battle_side", -1)
                        sendBattle(battle_id, battle_secret, "4", null, battle_side)
                    }
                }
            }
        }
    }
}