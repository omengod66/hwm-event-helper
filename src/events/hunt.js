import {eventHelperSettings, setSettings} from "../settings";
import {getCurrentLevel} from "../utils/eventUtils";
import {$, allClasses, cdnHost, findAll, get, my_sign, pl_id, pl_lvl, set} from "../utils/commonUtils";
import {doGet} from "../utils/networkUtils";

export default function huntEvent() {
    let battles = []
    let currentHeroFaction;
    let classCounter = 0;
    let result = ``;
    let isForStat = true;

    if (location.href.includes("hunting_event")) {
        eventHelperSettings(document.querySelector('.new_event_map'), (container) => {
            setSettings("auto_send_hunt_event_battles", "Отправлять бои из сезона охоты в сервис автоматически", container)
        }, "afterend")

        // Array.from(document.querySelectorAll(`td[width="300"]`)).slice(-1)[0].insertAdjacentHTML("beforeend",
        //     `<div style="max-width: 240px">Автор скрипта <a href="/pl_info.php?id=7197821"><b>Гроза_ГВД</b></a> будет рад подарку в виде артефакта леса 😊</div>`)
        mainHuntEvent();
        getCurrentFaction();

        let huntlvlinfo = get('huntv2lvl' + getCurrentLevel(), {})
        if (huntlvlinfo && Date.now() - huntlvlinfo.time < 86400 * 14 * 1000) {
            result = huntlvlinfo.info;
            updateHuntStatBody();
            setShowExampleListeners()
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

    function setShowExampleListeners() {
        Array.from(document.getElementsByClassName("faction-hunt-data")).forEach((enemy, index) => {
            let portraits = findAll(/portraits\/([a-zA-Z0-9_-]+)p33/, enemy.innerHTML).map(item => item[1])
            let amounts = Array.from(enemy.querySelectorAll("#add_now_count")).map(elem => parseInt(elem.innerText))
            if (amounts.length < portraits.length) {
                amounts.unshift(1)
            }
            portraits.sort((a, b) => a.localeCompare(b))
            amounts.sort((a, b) => a - b)

            enemy.insertAdjacentHTML("beforeend", `
                <div style="margin: 10px"><div id="load_examples_${index}" class="home_button2 btn_hover2" style="padding: 2px 4px">Загрузить примеры</div></div>
                `)
            $(`load_examples_${index}`).addEventListener("click", async (e) => {
                e.target.remove()
                let request = [portraits.join("|"), amounts.join("|")].join("~")
                const eventBattlesURL = `getFactionEventBattles?enemy_id=${encodeURIComponent(request)}&token=${get("hwm_events_token", "")}`
                battles = await doGet(eventBattlesURL, false)
                processFactionEventBattles(enemy)
            })
        })
    }

    function processFactionEventBattles(where = document.body) {
        where.insertAdjacentHTML("afterend", `<div>${getBattlesTemplate(battles)}</div>`)
    }

    function getBattlesTemplate(battles) {
        let result = ""
        result += `<div style="text-align: center; font-size: 14px; margin-top: 10px"><b>Твой уровень</b></div>`
        let my_lvl_battles = battles.filter(battle => battle["hero_lvl"] === pl_lvl)
        result += factionBattlesToHTML(my_lvl_battles)

        result += `<div style="text-align: center; font-size: 14px"><b>Другие уровни</b></div>`
        let not_my_lvl_battles = battles.filter(battle => battle["hero_lvl"] !== pl_lvl)
        result += factionBattlesToHTML(not_my_lvl_battles)

        return result
    }

    function factionBattlesToHTML(battles) {
        if (battles.length > 0) {
            battles.sort((a, b) => a.nickname.localeCompare(b.nickname))
            return battles.reduce((prev, curr, index) => {
                return prev + `
                            <div style="display: flex; justify-content: center; padding: 1px;">
                                <div>${index + 1}. </div>
                                <div style="text-align: center"> ${curr["nickname"]} [${curr["hero_lvl"]}]</div>
                                <div> <a target="_blank" href="/warlog.php?warid=${curr["battle_id"]}&show_for_all=${curr["battle_secret"]}">Бой</a></div>
                                <div>  (${curr["enemy_id"].split("~")[1]})</div>
                            </div>
                        `
            }, "")
        } else {
            return `<div style="text-align: center;"><b>пусто</b></div>`
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
                    <div class="wrapper">
                        <div style="width: 75%">
                            <div class="wrapperStat">
                                <div id="show_current_class_examples" class="home_button2 btn_hover2" style="width: 200px;">Загрузить примеры<br>текущего класса</div>
                                <div id="current_class_examples"></div>
                                <div id="statbut" class="home_button2 btn_hover2" style="width: 200px;">Посмотреть охоты<br>других классов</div>
                                <div id="progress" class="progress"></div>
                            </div>
                            <div id="statbody">
                            </div>
                        </div>
                    </div>
                `);
        $(`statbut`).addEventListener('click', () => {
            processCollectHunts()
        })
        $(`show_current_class_examples`).addEventListener('click', async (e) => {
            let enemy = document.querySelector(".hunt_result_attack > div:nth-child(2) > div > div > div:last-child > div:nth-child(4)")

            let portraits = findAll(/portraits\/([a-zA-Z0-9_-]+)p33/, enemy.innerHTML).map(item => item[1])
            let amounts = Array.from(enemy.querySelectorAll("#add_now_count")).map(elem => parseInt(elem.innerText))
            if (amounts.length < portraits.length) {
                amounts.unshift(1)
            }
            portraits.sort((a, b) => a.localeCompare(b))
            amounts.sort((a, b) => a - b)

            e.target.remove()
            let request = [portraits.join("|"), amounts.join("|")].join("~")
            const eventBattlesURL = `getFactionEventBattles?enemy_id=${encodeURIComponent(request)}&token=${get("hwm_events_token", "")}`
            battles = await doGet(eventBattlesURL)
            processFactionEventBattles($(`current_class_examples`))
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
        result +=
            `<div class="faction-hunt-data">
                <div class="cre_creature" id="fc${allClasses[classCounter][0]}-${allClasses[classCounter][2]}">
                <img style="padding: 10px 0; cursor:pointer;" src="https://${cdnHost}/i/f/${allClasses[classCounter][3]}?v=1.1" alt="">
                </div>` +
            Array.from(doc.querySelector(".hunt_result_attack > div:nth-child(2) > div > div > div:last-child > div:nth-child(4)")
                .querySelectorAll("div.cre_creature"))
                .reduce((result, current) => result + current.outerHTML, "")
            + `</div><br>`;
        updateHuntStatBody();
        window.scrollTo(0, document.body.scrollHeight);
        classCounter++;
        getClassHuntData();
    }

    function updateHuntStatBody() {
        document.getElementById("statbody").innerHTML = result;
    }
}