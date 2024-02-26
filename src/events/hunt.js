import {getCurrentLevel, setTimer} from "../utils/eventUtils";
import {$, allClasses, cdnHost, get, my_sign, pl_id, set} from "../utils/commonUtils";
import {doGet} from "../utils/networkUtils";
import {getNewCreatureIcon} from "../templates";
import {setLeaderboard} from "../leaderboard";

export default function huntEvent() {
    let currentHeroFaction;
    let classCounter = 0;
    let result = ``;
    let isForStat = true;

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

        // Array.from(document.querySelectorAll(`td[width="300"]`)).slice(-1)[0].insertAdjacentHTML("beforeend",
        //     `<div style="max-width: 240px">Автор скрипта <a href="/pl_info.php?id=7197821"><b>Гроза_ГВД</b></a> будет рад подарку в виде артефакта леса 😊</div>`)
        setTimer(document.querySelector(".global_container_block_header"))
        setLeaderboard(Array.from(document.querySelectorAll("center")).at(-1))

        mainHuntEvent();
        getCurrentFaction();

        let huntlvlinfo = get('huntv2lvl' + getCurrentLevel(), {})
        if (huntlvlinfo && Date.now() - huntlvlinfo.time < 86400 * 14 * 1000) {
            result = huntlvlinfo.info;
            updateHuntStatBody();
            allClasses.forEach(clazz => {
                document
                    .getElementById(`fc${clazz[0]}-${clazz[2]}`)
                    .getElementsByTagName("img")[0]
                    .addEventListener("click", async () => {
                        isForStat = false
                        await changeFactionAndClass(clazz[4]);
                        location.reload()
                    });
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
                            <div id="statbut" class="home_button2 btn_hover2" style="width: 200px;">Посмотреть охоты<br>других классов</div>
                            <div id="progress" class="progress"></div>
                        </div>
                        <div id="statbody" style="width:fit-content;margin: auto;">
                            <p>Eсли нажать на значок класса, то сменит на этот класс</p>
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
        if (classCounter === allClasses.length) {
            classCounter = 0
            document.getElementById("statbut").innerHTML = "Done";
            isForStat = false;
            set('huntv2lvl' + getCurrentLevel(), {
                "time": Date.now(),
                "info": result
            })
            await changeFactionAndClass(currentHeroFaction);
            getCurrentFaction()
            return;
        }
        document.getElementById("statbut").innerHTML = "Processing...";
        document.getElementById("progress").innerHTML = "Текущая фракция - " + getFactionName(allClasses[classCounter][4]);
        await changeFactionAndClass(allClasses[classCounter][4]);
        let doc = await doGet(`/hunting_event.php?sel_level=${getCurrentLevel()}`, true)
        processHuntResponse(doc)
    }

    function processHuntResponse(doc) {
        const creatureIcons = Array.from(doc.querySelectorAll(".hunt_result_attack > div:nth-child(2) > div > div > div:nth-child(3) > div > div .cre_creature"))
            .map(creatureElem => {
                const amount = creatureElem.querySelector(".cre_amount48")?.innerText ?? ""
                const portrait = creatureElem.querySelector("img").src.match(/portraits\/(.*)p33/)[1]
                return getNewCreatureIcon(portrait, amount)
            })

        result +=
            `<div class="faction-hunt-data">
                <div class="cre_creature" id="fc${allClasses[classCounter][0]}-${allClasses[classCounter][2]}">
                <img style="padding: 10px 0; cursor:pointer;" src="https://${cdnHost}/i/f/${allClasses[classCounter][3]}?v=1.1" alt="">
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