import {$, cdnHost, pl_id} from "../utils/commonUtils";
import {eventHelperSettings, setSettings} from "../settings";
import {sendBattle} from "../battles";
import {doGet} from "../utils/networkUtils";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("send_to_service", "send to service", "отправить в сервис", "відправити у сервіс"))
    texts.addText(new LocalizedText("battle_info", "show battle info", "подробнее", "детальніше"))
    return texts
}

let allTexts = getAllTexts()

export default function processBattleLogPage() {
    window.sendBattle = sendBattle
    window.getBattleInfo = getBattleInfo

    if (location.href.includes(`pl_warlog.php?id=`)) {
        Array.from(document.getElementsByTagName("i"))
            .filter(tag =>(tag.innerText.includes("Враги экспедиции") || tag.innerText.includes("Enemies of the expedition"))
                && tag.innerText.match(/\((\d{1,3})/)[1] - 0 > 50)
            .forEach((tag, index) => {
                let params = new URLSearchParams("?" + tag.previousElementSibling.previousElementSibling.href.split("?")[1])
                tag.insertAdjacentHTML("afterend",
                    `  <span><a id="get_battle_info_${index}" style="cursor: pointer; text-decoration: underline" onclick="getBattleInfo('${params.get("warid")}', '${index}')">${allTexts.get("battle_info")}</a></span>`)

            })
    }

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
                || tag.innerText.includes("Враги экспедиции")
                || tag.innerText.includes("Enemies of the expedition")
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
                                `  <span><a id="send_battle_${index}" style="cursor: pointer; text-decoration: underline" onclick="sendBattle('${params.get("warid")}', '${params.get("show_for_all")}', '${type}', '${index}')">${allTexts.get("send_to_service")}</a></span>`)
                        }
                        break
                    } else {
                        sibling = sibling.previousElementSibling
                    }
                }
            }
        })
    }



    async function getBattleInfo(battle_id, target_index) {
        let response = await doGet(`getEventBattleInfo?battle_id=${battle_id}`)
        let battleInfo = response.battle_info
        let data = battleInfo.split("|")
        let result = ""
        if (data.length > 1) {
            let heroClassRaw = data[0]
            let heroStatsRaw = data[1]
            let heroArtsRaw = data[2]
            let heroCreaturesRaw = data[3]
            let heroPerksRaw = data[4]

            let heroClassHTML = `
                <div class="battle_info_chip">
                    <img style="vertical-align: middle; height: 24px" src="https://${cdnHost}/i/f/r${heroClassRaw}.png?v=1.1" alt="">
                </div>
            `


            let heroStatsValues = heroStatsRaw.split(",")
            let heroStatsHTML = `
                <div class="battle_info_chip">
                    <img alt="" src="https://${cdnHost}/i/icons/attr_attack.png?v=1" style="vertical-align: middle; height: 24px"> ${heroStatsValues[0]}
                </div>
                <div class="battle_info_chip">
                    <img alt="" src="https://${cdnHost}/i/icons/attr_defense.png?v=1" style="vertical-align: middle; height: 24px"> ${heroStatsValues[1]}
                </div>
                <div class="battle_info_chip">
                    <img alt="" src="https://${cdnHost}/i/icons/attr_magicpower.png?v=1" style="vertical-align: middle; height: 24px"> ${heroStatsValues[2]}
                </div>
                <div class="battle_info_chip">
                    <img alt="" src="https://${cdnHost}/i/icons/attr_knowledge.png?v=1" style="vertical-align: middle; height: 24px"> ${heroStatsValues[3]}
                </div>
                <div class="battle_info_chip">
                    <img alt="" src="https://${cdnHost}/i/icons/attr_fortune.png?v=1" style="vertical-align: middle; height: 24px"> ${heroStatsValues[4]}
                </div>
                <div class="battle_info_chip">
                    <img alt="" src="https://${cdnHost}/i/icons/attr_morale.png?v=1" style="vertical-align: middle; height: 24px"> ${heroStatsValues[5]}
                </div>
                <div class="battle_info_chip">
                    <img alt="" src="https://${cdnHost}/i/icons/attr_initiative.png?v=1" style="vertical-align: middle; height: 24px"> ${heroStatsValues[6]}
                </div>
                
            `

            let heroArtsHTML = heroArtsRaw.split(",").reduce((prev, curr) => {
                let artInfoRaw = curr.split("~")
                let artImgLink = artInfoRaw[0]
                let artModsRaw = artInfoRaw[1]
                // let artModsRaw = "D10:E10:A10:W10:F10"
                let artModsValues = artModsRaw.split(":")
                return prev + `
                    <div class="battle_info_chip battle_art_chip">
                        
                        <img src="https://${cdnHost}/i/artifacts/${artImgLink}" class="art_img">
                        ${artModsRaw === "" ? "" : `
                            <div class="art_mods_container">
                            ${artModsValues.reduce((modResult, currMod) => {
                                return modResult + `
                                    <img src="https://${cdnHost}/i/mods_png/${currMod}.png" style="height: 100%; float: left;" title="${currMod}">
                                `    
                            }, "")}
                            </div>
                        `}
                    </div>
                `
            }, "")


            let heroCreaturesHTML = heroCreaturesRaw.split(",").reduce((prev, curr) => {
                let creatureInfoRaw = curr.split(":")
                let creatureId = creatureInfoRaw[0]
                let creatureAmount = creatureInfoRaw[1]

                return prev + `
                <div class="cre_creature battle_info_chip">
                    <img src="https://${cdnHost}/i/portraits/${creatureId}" style="border-radius: 10px; width: 60px;height: 50px;">
                    <div class="cre_amount" style="bottom: -3px;text-align: center;right: 3px;" id="add_now_count">${creatureAmount}</div>
                </div>
                `
            }, "")


            let heroPerksHTML = heroPerksRaw.split(",").reduce((prev, curr) => {
                return prev + `
                    <div class="">
                        <img src="https://${cdnHost}/i/perks/2x${curr}.png" class="" style="height: 50px">
                    </div>
                `
            }, "")


            result = `
             <div style="display: flex; flex-wrap: wrap">
                ${heroClassHTML}
                ${heroStatsHTML}
             </div>
             <div style="display: flex; flex-wrap: wrap">
                ${heroArtsHTML}
             </div>
             <div style="display: flex; flex-wrap: wrap">
                ${heroCreaturesHTML}
             </div>
             <div style="display: flex; flex-wrap: wrap">
                ${heroPerksHTML}
             </div>
             
            `
        } else if (data[0] !== ""){
            result =  `
                <div class="battle_info_chip">
                    <img style="vertical-align: middle; height: 24px" src="https://${cdnHost}/i/f/r${data[0]}.png?v=1.1" alt="">
                </div>
            `
        }

        let target = $(`get_battle_info_${target_index}`)
        target.parentElement.insertAdjacentHTML("afterend", `
        <div>
         ${result}
        </div>`)

        target.remove()
    }
}