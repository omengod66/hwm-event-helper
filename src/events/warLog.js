import {pl_id} from "../utils/commonUtils";
import {eventHelperSettings, setSettings} from "../settings";
import {sendBattle} from "../battles";

export default function processBattleLogPage() {
    window.sendBattle = sendBattle
    if (location.href.includes(`pl_warlog.php?id=${pl_id}`)) {
        eventHelperSettings(document.querySelector(`[class="global_container_block"]`), (container) => {
            setSettings("only_clan_visibility", "Мои бои доступны только для клана", container, false)
            setSettings("auto_send_rogues_event", "Отправлять бои из разбойничьего ивента в сервис автоматически", container)
            setSettings("auto_send_ffa_event", "Отправлять бои из КБО ивента в сервис автоматически", container)
            setSettings("auto_send_event_lg", "Отправлять бои из ГЛ ивента в сервис автоматически", container)
            setSettings("auto_send_lg", "Отправлять бои с опасными бандитами в сервис автоматически", container)
            setSettings("auto_send_faction_event_battles", "Отправлять бои из фрак. ивента в сервис автоматически", container)
            setSettings("auto_send_hunt_event_battles", "Отправлять бои из сезона охоты в сервис автоматически", container)
        })

        Array.from(document.getElementsByTagName("i")).forEach((tag, index) => {
            let type;
            let isOk;
            if (tag.innerText === "Опасные бандиты" || tag.innerText === "Dangerous bandits") {
                type = "0";
                isOk = true;
            }
            if (tag.innerText.includes("Враждебный отряд") || tag.innerText.includes("Hostile squad")) {
                type = "1";
                isOk = true;
            }
            if (tag.innerText.includes("Похитители зимы")
                || tag.innerText.includes("Snatchers of winter")
                || tag.innerText.includes("Военная экспедиция")
                || tag.innerText.includes("Military expedition")
                || tag.innerText.includes("Бандиты пустошей")
                || tag.innerText.includes("Обитатели пустошей")
                || tag.innerText.includes("Wasteland bandits")
                || tag.innerText.includes("Wasteland dwellers")
                || tag.innerText.includes("Контрабандисты")
                || tag.innerText.includes("Smugglers")) {
                type = "2";
                isOk = true;
            }
            if (tag.innerText.includes("Отряды бандитов") || tag.innerText.includes("Bandits squads") || tag.innerText.includes("Цель") || tag.innerText.includes("Target")) {
                type = "3";
                isOk = true;
            }
            if (tag.innerText.includes("Отряд врага") || tag.innerText.includes("Enemy squad")) {
                type = "4";
                isOk = true;
            }
            if (isOk) {
                let maxTries = 5
                let sibling = tag.previousElementSibling
                for (let i = 0; i < maxTries; i++) {
                    if (sibling.tagName === "A" && sibling.href.includes("show_for_all")) {
                        let params = new URLSearchParams("?" + sibling.href.split("?")[1])
                        if (!tag.innerHTML.includes("<b>")) {
                            tag.insertAdjacentHTML("afterend",
                                `  <span><a id="send_battle_${index}" style="cursor: pointer; text-decoration: underline" onclick="sendBattle('${params.get("warid")}', '${params.get("show_for_all")}', '${type}', '${index}')">Отправить в сервис</a></span>`)

                        }
                        break
                    } else {
                        sibling = sibling.previousElementSibling
                    }
                }
            }
        })
    }
}