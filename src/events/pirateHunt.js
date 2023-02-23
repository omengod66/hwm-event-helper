import {eventHelperSettings, setSettings} from "../settings";
import {$, get} from "../utils/commonUtils";

export default function pirateHuntEvent() {
    if (location.href.includes("pirate_hunt")) {
        let globalTable = $(`global_table_div4`)
        eventHelperSettings(globalTable, (container) => {
            // setSettings("pirate_hunt_event_filter", "Только с напарником", container)
            setSettings("pirate_hunt_custom_ins", "Возможность автоматической расстановки", container, false)
            setSettings("custom_ins_auto", `Автоматически применять сохраненную расстановку`, container, false)
        }, "beforeend")

        // let partner = get("partners", null)
        // if (get("pirate_hunt_event_filter", true) && partner != null) {
        //     print_friends()
        //     Array.from(Array.from(document.querySelectorAll("select")).slice(-1)[0].getElementsByTagName("option")).forEach(options => {
        //         if (options.value === partner) {
        //             options.selected = true
        //         }
        //     })
        //     let inputs = Array.from(document.querySelectorAll("input[type=submit]")).slice(-3)
        //     inputs[0].disabled = true
        //     Array.from(globalTable.getElementsByTagName("tr")).forEach((tr) => {
        //         if (!tr.innerHTML.includes(partner) && (tr.innerText.includes("[Вступить]") || tr.innerText.includes("[Вступить к клану]"))) {
        //             tr.remove()
        //         }
        //     })
        // }
    }
}