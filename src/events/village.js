import {$, get} from "../utils/commonUtils";
import {setLeaderboard} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";

export default function villageEvent() {
    if (/(village_def)/.test(location.href)) {
        let villageElem = $(`set_mobile_max_width`)
        villageElem.style.flexWrap = "nowrap"

        if (get("village_remove_confirm", true)) {
            Array.from(document.querySelectorAll("input[type=submit]"))
                .forEach(input => input.onclick = () => {
                    return true
                })
        }
        if (get("village_auto_repair", false)) {
            Array.from(document.querySelectorAll("input[type=submit]"))
                .forEach(input => {
                    if (input.value.includes("Восстановить") || input.value.includes("Ремонт")) {
                        input.click()
                    }
                })
        }
        // document.querySelector('#global_table_div3').parentElement.firstElementChild.remove()
        setLeaderboard(document.querySelector('#global_table_div3'), "beforebegin")
        eventHelperSettings(document.querySelector('#global_table_div4'), (container) => {
            setSettings("village_custom_ins", `Возможность автоматической расстановки 
                        <img src="https://hwm.events/battles/custom_ins.gif" height="400px" onclick='event.stopPropagation()'>
                        (будет работать после "закрепления" крестьян башнями)
                    `, container, false)
            setSettings("village_remove_confirm", `Убрать подтверждение постройки/улучшений`, container)
            setSettings("custom_ins_auto", `Автоматически применять сохраненную расстановку`, container, false)
            setSettings("village_auto_repair", `Автоматически ремонтировать постройки`, container, false)
        }, "afterend")
    }
}