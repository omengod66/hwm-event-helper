import {getCurrentLevel, removeLeaderboard, setTimer} from "../utils/eventUtils";
import {$, allClasses, allFactions, cdnHost, get, my_sign, pl_id, set} from "../utils/commonUtils";
import {doGet} from "../utils/networkUtils";
import {getNewCreatureIcon} from "../templates";
import {setLeaderboard} from "../leaderboard";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";
import {eventHelperSettings, setSettings} from "../settings";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("hide_hunt_event_enemies", "Show hardest enemies only", "Показывать только самых сильных врагов", "Показувати лише найзапекліших ворогів"))
    texts.addText(new LocalizedText("check_faction", "Check enemies for ", "Проверять врагов для ", "Перевіряйте ворогів для "))
    texts.addText(new LocalizedText("change_class_hint", "If you click on the class icon, it will change to this class", "Eсли нажать на значок класса, то сменит на этот класс", "Якщо натиснути на значок класу, то змінить цей клас"))
    texts.addText(new LocalizedText("check_other_classes", "View hunts<br>of other classes", "Посмотреть охоты<br>других классов", "Переглянути полювання<br>інших класів"))

    return texts
}

let allTexts = getAllTexts()
export default function huntEvent() {
    let defaultFiltered = Array.from(document.querySelectorAll(".hunt_result_attack > div:nth-child(2) > div > div > div:nth-child(2) img"))
        .map(img => img.src.split("/").at(-1).split(".")[0].slice(1))
        .map(str => parseInt(str))
    let filteredClasses = allClasses.filter(clazz => get(`check_faction_${clazz[0]}`, true) && defaultFiltered.includes(clazz[0]))
    let currentHeroFaction;
    let classCounter = 0;
    let result = ``;
    let isForStat = true;
    let currentLevel = getCurrentLevel()

    if (location.href.includes("hunting_event")) {
        if (typeof hwm_mobile_view === "undefined") {
            let elem = document.querySelector(".hunt_result_attack")
            elem.style.flexDirection = "row"
            elem.style.flexGrow = "unset"
            elem.style.width = "unset"
            elem.style.maxWidth = "unset"
            elem.children[1].style.margin = "0"
            elem.children[0].style.maxWidth = "500px"
            elem.children[0].style.marginRight = "1em"
            elem.children[0].style.justifyContent = "flex-start"

            let container = document.querySelector("#hwm_no_zoom")
            container.style.width = ""
            container.style.maxWidth = ""

            document.querySelector(".Global").style.width = "unset"
            document.querySelector(".CampaignMapContainer").style.width = "unset"
            document.querySelector(".CampaignMapBorder").style.width = "100%"
            document.querySelector(".CampaignMapCorners").style.width = "100%"
        }

        eventHelperSettings(document.querySelector('.new_event_map'), (container) => {
            setSettings("hide_hunt_event_enemies", allTexts.get("hide_hunt_event_enemies"), container, false)
            allFactions.slice(1,-1).forEach(faction => {
                setSettings(`check_faction_${faction[0]}`, allTexts.get("check_faction") + `<img style="height: 24px;vertical-align: bottom;" src="https://${cdnHost}/i/f/${faction[2]}?v=1.1" alt="">`, container)
            })
        }, "afterend")

        removeLeaderboard()
        let leaderboardContainer = Array.from(document.querySelectorAll("center")).at(-1)
        if (get("hide_hunt_event_enemies", false)) {
            let elem = document.querySelector(".event_text_reward").nextElementSibling.nextElementSibling
            let enemyContainer = elem.parentElement
            while (elem) {
                let newElem = elem.nextElementSibling
                elem.remove()
                elem = newElem
            }

            if (typeof hwm_mobile_view === "undefined") {
                enemyContainer.firstElementChild.remove()
                enemyContainer.firstElementChild.remove()
                let enemiesHTML = enemyContainer.innerHTML
                try {
                    if (enemyContainer.firstElementChild.firstElementChild.childElementCount > 2) {
                        let firstEnemyElem = document.createElement("div")
                        firstEnemyElem.innerHTML = enemyContainer.firstElementChild.firstElementChild.children[0].outerHTML + enemyContainer.firstElementChild.firstElementChild.children[1].outerHTML
                        let secondEnemyElem = document.createElement("div")
                        secondEnemyElem.style.marginLeft = "1em"
                        secondEnemyElem.innerHTML = enemyContainer.firstElementChild.firstElementChild.children[3].outerHTML + enemyContainer.firstElementChild.firstElementChild.children[4].outerHTML
                        enemyContainer.firstElementChild.firstElementChild.innerHTML = firstEnemyElem.outerHTML + secondEnemyElem.outerHTML
                        enemyContainer.firstElementChild.firstElementChild.style.display = "flex"
                        enemiesHTML = enemyContainer.innerHTML
                    }
                } catch (e) {
                    console.error(e)
                }

                document.querySelector(".Global").insertAdjacentHTML("beforeend", `
                <div style="position: absolute;bottom: 2em;background-color: #f5f3ea;left: 0;right: 0;margin-left: auto;margin-right: auto;z-index: 1;width: fit-content;padding: 10px;border-radius: 1em;">
                    ${enemiesHTML}
                </div> `)
                enemyContainer.parentElement.parentElement.remove()

                let clanTopHTML = leaderboardContainer.outerHTML + leaderboardContainer.nextElementSibling.outerHTML
                leaderboardContainer.nextElementSibling.remove()
                leaderboardContainer.outerHTML = `<div id="leaderboard" style="display: flex"><div style="flex: 1 1 0;">${clanTopHTML}</div></div>`
                leaderboardContainer = $("leaderboard");

                let infoContainer = Array.from(document.querySelectorAll(".global_container_block")).at(-1)

                infoContainer.style.width = "500px"
                infoContainer.style.marginRight = "unset"
            }
        }

        // Array.from(document.querySelectorAll(`td[width="300"]`)).slice(-1)[0].insertAdjacentHTML("beforeend",
        //     `<div style="max-width: 240px">Автор скрипта <a href="/pl_info.php?id=7197821"><b>Гроза_ГВД</b></a> будет рад подарку в виде артефакта леса 😊</div>`)
        setTimer(document.querySelector(".global_container_block_header"))

        setLeaderboard(leaderboardContainer)

        mainHuntEvent();
        getCurrentFaction();

        let huntlvlinfo = get('huntv2lvl' + currentLevel, {})
        if (huntlvlinfo && Date.now() - huntlvlinfo.time < 86400 * 14 * 1000) {
            result = huntlvlinfo.info;
            updateHuntStatBody();
            allClasses.forEach(clazz => {
                if (document.getElementById(`fc${clazz[0]}-${clazz[2]}`)) {
                    document.getElementById(`fc${clazz[0]}-${clazz[2]}`)
                        .getElementsByTagName("img")[0]
                        .addEventListener("click", async () => {
                            isForStat = false
                            await changeFactionAndClass(clazz[4]);
                            location.reload()
                        });
                }
            })
        }
    }

    async function getCurrentFaction() {
        let plResponse = await doGet(`/pl_info.php?id=${pl_id}`, true)
        let temp = currentHeroFaction;
        let factionImg = null
        Array.from(plResponse.getElementsByTagName("img")).forEach(img => {
            if (img.src.includes("i/f/")) {
                factionImg = img.src
            }
        })
        for (let i = 0; i < allClasses.length; i++) {
            if (factionImg.indexOf(allClasses[i][3]) > 0) {
                currentHeroFaction = allClasses[i][4];
                break;
            }
        }
        if (!!temp) {
            if (temp !== currentHeroFaction) {
                currentHeroFaction = temp
                await changeFactionAndClass(temp)
                getCurrentFaction()
            } else {
                location.reload()
            }
        }
    }

    function mainHuntEvent() {
        Array.from(document.getElementsByClassName("new_event_map")).slice(-1)[0]
            .insertAdjacentHTML("afterend", `
                    <div style="width: 100%;">
                        <div class="wrapperStat">
                            <div id="statbut" class="home_button2 btn_hover2" style="width: 200px;">${allTexts.get("check_other_classes")}</div>
                            <div id="progress" class="progress"></div>
                        </div>
                        <div id="statbody" style="width:fit-content;margin: auto;">
                            <p>${allTexts.get("change_class_hint")}</p>
                        </div>
                    </div>
                `);
        $(`statbut`).addEventListener('click', () => {
            processCollectHunts()
        })
    }


    function getFactionName(fr) {
        for (let i = 0; i < allClasses.length; i++) {
            if (allClasses[i][4] === fr) {
                return allClasses[i][1]
            }
        }
    }

    async function changeFactionAndClass(fr) {
        await doGet(`/castle.php?change_clr_to=${fr}&sign=${my_sign}`, true);
    }

    function processCollectHunts() {
        result = '';
        getClassHuntData()
    }

    async function getClassHuntData() {
        if (classCounter === filteredClasses.length) {
            classCounter = 0
            document.getElementById("statbut").innerHTML = "Done";
            isForStat = false;
            set('huntv2lvl' + currentLevel, {
                "time": Date.now(),
                "info": result
            })
            await changeFactionAndClass(currentHeroFaction);
            getCurrentFaction()
            return;
        }
        document.getElementById("statbut").innerHTML = "Processing...";
        document.getElementById("progress").innerHTML = "Текущая фракция - " + getFactionName(filteredClasses[classCounter][4]);
        await changeFactionAndClass(filteredClasses[classCounter][4]);
        let doc = await doGet(`/hunting_event.php?sel_level=${currentLevel}`, true)
        processHuntResponse(doc)
    }

    function processHuntResponse(doc) {
        const creatureIcons = Array.from(doc.querySelectorAll(".hunt_result_attack > div:nth-child(2) > div > div > div:nth-child(5) > div > div .cre_creature"))
            .map(creatureElem => {
                const amount = creatureElem.querySelector(".cre_amount48")?.innerText ?? ""
                const portrait = creatureElem.querySelector("img").src.match(/portraits\/(.*)p33/)[1]
                return getNewCreatureIcon(portrait, amount)
            })

        result +=
            `<div class="faction-hunt-data">
                <div class="cre_creature" id="fc${filteredClasses[classCounter][0]}-${filteredClasses[classCounter][2]}">
                <img style="padding: 10px 0; cursor:pointer;" src="https://${cdnHost}/i/f/${filteredClasses[classCounter][3]}?v=1.1" alt="">
                </div>${creatureIcons}</div><br>`;
        updateHuntStatBody();
        window.scrollTo(0, document.body.scrollHeight);
        classCounter++;
        getClassHuntData();
    }

    function updateHuntStatBody() {
        document.getElementById("statbody").innerHTML = `<p>Eсли нажать на значок класса, то сменит на этот класс</p>` + result;
    }
}