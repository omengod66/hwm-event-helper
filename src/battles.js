import {doGet, doPost} from "./utils/networkUtils";
import {
    $,
    allClasses,
    cdnHost,
    encode,
    get,
    groupBy,
    mapToArray,
    my_sign,
    pl_lvl,
    sortByKey
} from "./utils/commonUtils";
import {getCurrentLevel} from "./utils/eventUtils";
import {getNewCreatureIcon, getSpoiler} from "./templates";
import {LocalizedText, LocalizedTextMap} from "./utils/localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("sent", "Sent", "Отправлено", "Надіслано"))
    texts.addText(new LocalizedText("examples", "Battle examples", "Примеры боёв", "Приклади боїв"))
    texts.addText(new LocalizedText("cl", "CL", "БУ", "БР"))
    texts.addText(new LocalizedText("afs", "AFS", "АиМ", "АзМ"))
    texts.addText(new LocalizedText("ffa", "FFA", "КБО", "КБО"))
    texts.addText(new LocalizedText("your_cl", "Your CL", "Твой уровень", "Твій рівень"))
    texts.addText(new LocalizedText("another_cl", "Another CLs", "Другие уровни", "Інші рівні"))
    texts.addText(new LocalizedText("another_cl_army", "Starting from the 51st wave, the opponents at all combat levels are the same. The difference is only in quantity.", "Начиная с 51й волны, противники на всех уровнях одинаковые. Разница только в количестве.", "Починаючи з 51 хвилі, противники на всіх бойових рівнях однакові. Різниця лише у кількості."))
    texts.addText(new LocalizedText("battle", "Battle", "Бой", "Бій"))
    texts.addText(new LocalizedText("empty", "empty", "пусто", "порожньо"))
    texts.addText(new LocalizedText("enemy", "Enemy", "Враг", "Ворог"))
    texts.addText(new LocalizedText("search", "Search", "Поиск", "Пошук"))
    texts.addText(new LocalizedText("loses", "Loses", "Поражения", "Поразки"))
    texts.addText(new LocalizedText("nickname", "nickname", "никнейм", "нікнейм"))
    texts.addText(new LocalizedText("search", "Search", "Поиск", "Пошук"))
    texts.addText(new LocalizedText("hire", "Hire", "Набрать", "Найняти"))
    texts.addText(new LocalizedText("hwmevents",
        `Website with examples <a href="https://hwm.events/ffa" target="_blank">https://hwm.events/ffa</a> Share with friends!`,
        `Проходки есть и на сайте <a href="https://hwm.events/ffa" target="_blank">https://hwm.events/ffa</a> Поделись с другом!`,
        `Приклади також є і на сайті <a href="https://hwm.events/ffa" target="_blank">https://hwm.events/ffa</a> Поділися з друзями!`))

    texts.addText(new LocalizedText("hwmevents_rogues",
        `Website with examples <a href="https://hwm.events/rogues" target="_blank">https://hwm.events/rogues</a> Share with friends!`,
        `Проходки есть и на сайте <a href="https://hwm.events/rogues" target="_blank">https://hwm.events/rogues</a> Поделись с другом!`,
        `Приклади також є і на сайті <a href="https://hwm.events/rogues" target="_blank">https://hwm.events/rogues</a> Поділися з друзями!`))

    return texts
}

let allTexts = getAllTexts()

export async function sendBattle(warid, secret, type, index = null, battle_side = -1) {
    let formData = new FormData()
    formData.append('battle_id', warid)
    formData.append('battle_secret', secret)
    formData.append('battle_side', battle_side)
    formData.append('is_clan', get("only_clan_visibility", false))

    let types = {
        "0": "uploadDbBattle",
        "1": "uploadEventLeaderBattle",
        "2": "uploadFFAEventBattle",
        "3": "uploadFactionEventBattle",
        "4": "uploadRoguesEventBattle",
    }
    doPost(types[type], formData).then(() => {
        if (index != null) {
            $(`send_battle_${index}`).outerHTML = allTexts.get("sent")
        }
    })
}

export async function getEventBattles(target, from = "getFFAEventBattles", callback = 2, lost = false) {
    window.sendApplyArmy = sendApplyArmy
    let creaturesInfo = get("eventCreaturesInfo", {})
    let currentSilver = 0;
    try {
        currentSilver = 10000 + parseInt(document.body.innerText.match(/(Добыто серебра|Silver gained): (\d{0,3},?\d{1,3})/)[2].replace(",", ""))
    } catch (e) {
    }

    document.body.insertAdjacentHTML("afterbegin", `<style>.hwm_event_example_block {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border-radius: 5px;
        position: relative;
        align-items: center;
        justify-content: center;
        margin: 2px;
        padding: 6px;
        background-color: #fffef9;
        box-shadow: inset 0 0 0 1px #b19673, 0 2px 2px rgb(0 0 0 / 25%);
    }</style>`)
    let battles = await doGet(`${from}?wave=${getCurrentLevel()}&token=${get("hwm_events_token", "")}`)
    processEventBattles(target, battles)

    function processEventBattles(where = document.body, battles) {
        switch (callback) {
            case 1: {
                if (battles.AFS.length === 0 && !lost) {
                    getEventBattles(target, from.replace("Battles", "FailedBattles"), callback, true)
                } else {
                    where.insertAdjacentHTML("beforeend", `<div style="text-align: center"><b>${allTexts.get("hwmevents_rogues")}</b></div>` + getAFSEventBattlesTemplate(lost, battles))
                    $("search_nickname").addEventListener("keypress", (e) => {
                        if (e.key === "Enter") {
                            $("process_search").click()
                        }
                    })
                    $("process_search").addEventListener("click", async () => {
                        let player_battles = await doGet(`getRoguesPlayerBattles?nickname=${encodeURIComponent($("search_nickname").value.trim())}&token=${get("hwm_events_token", "")}`)
                        $("player_battles").innerHTML = groupBy(sortByKey(player_battles["AFS"], "wave", -1), "wave")
                            .map(currentWaveList => sortByKey(currentWaveList, "battle_id", -1))
                            .flatMap(currentWaveList => currentWaveList)
                            .reduce((prev, curr, index) => {
                                return prev + `
                                <div class="hwm_event_example_block">
                                    <div style="width: 80%;display: flex;justify-content: space-evenly;">
                                        <div style="text-align: center"> <a href="/pl_info.php?nick=${encode(curr["nickname"])}" class="pi" target="_blank">${curr["nickname"]}</a> ${"class" in curr && getClassById(curr["class"]) ? `<img style="vertical-align: middle; height: 16px" src="https://${cdnHost}/i/f/${getClassById(curr["class"])[3]}?v=1.1" alt="">` : ""} [${curr["hero_lvl"] ?? ""}]</div>
                                        <div style="display: flex;min-width: 120px;justify-content: space-between;">
                                            <div>${curr["wave"]}</div>
                                            <div> <a target="_blank" href="/warlog.php?warid=${curr["battle_id"]}&show_for_all=${curr["battle_secret"]}&lt=-1" style="color:${curr["isLost"] ?? false ? "red" : "green"}">${getFFAEventBattleSide(curr)}</a></div>
                                        </div>
                                    </div>
                                </div>
                                `
                            }, "")
                    })
                }
                break
            }
            case 2: {
                if (battles.AFS.length === 0 && battles.FFA.length === 0 && !lost) {
                    getEventBattles(target, from.replace("Battles", "FailedBattles"), callback, true)
                } else {
                    where.insertAdjacentHTML("beforeend", getFFAEventBattlesTemplate(lost, battles))
                }
            }
        }
    }

    function getAFSEventBattlesTemplate(lost, battles) {
        let result = getBattlesTemplate(battles["AFS"])

        return getSpoiler(
            "examples",
            "AFS",
            `<div class="home_button2 btn_hover2" style="margin: 3px 0; min-width: 100px;">${allTexts.get("examples")} (${result[1]}/${result[2]})</div>`,
            `
                <div style="display: flex; flex-direction: column">
                    <div id="search_by_player">
                        <div id="search_container" style="display: flex;justify-content: space-evenly;">
                            <input type="text" name="search_nickname" id="search_nickname" placeholder="${allTexts.get("nickname")}...">
                            <div id="process_search" class="btn_hover2 home_button2" style="width: 100px">${allTexts.get("search")}</div>
                        </div>
                        <div id="player_battles"></div>
                    </div>
                    <div style="text-align: center;">
                        <h3>${allTexts.get("afs")}</h3>
                    </div>
                    <div style="text-align: center;">${lost ? allTexts.get("loses") : ""}</div>
                    ${result[0]}
                </div>`)
    }

    function getFFAEventBattlesTemplate(lost, battles) {
        return `
                <div style="text-align: center"><b>${allTexts.get("hwmevents")}</b></div>
                <div class="battle_examples_container">
                    <div style="display: flex; flex-direction: column">
                        <div style="text-align: center;">
                            <h3>${allTexts.get("afs")}</h3>
                        </div>
                        <div style="text-align: center;">${lost ? allTexts.get("loses") : ""}</div>
                        ${getBattlesTemplate(battles["AFS"])[0]}
                    </div>
                    <div style="display: flex; flex-direction: column">
                        <div style="text-align: center;">
                            <h3>${allTexts.get("ffa")}</h3>
                        </div>
                        <div style="text-align: center;">${lost ? allTexts.get("loses") : ""}</div>
                        ${getBattlesTemplate(battles["FFA"], "FFA")[0]}
                    </div>
                </div>`
    }

    function getBattlesTemplate(battles, type = "AFS") {
        let result = ""
        result += `<div style="text-align: center;"><h4>${allTexts.get("your_cl")}</h4></div>`
        let my_lvl_battles = battles.filter(battle => battle["hero_lvl"] === pl_lvl)
        result += ffaBattlesToHTML(my_lvl_battles)

        result += `<div style="text-align: center;"><h4>${allTexts.get("another_cl")}</h4><h6>${allTexts.get("another_cl_army")}</h6></div>`
        let not_my_lvl_battles = battles.filter(battle => battle["hero_lvl"] !== pl_lvl)
        let cl_buckets = {}
        not_my_lvl_battles.forEach(battle => {
            if (cl_buckets.hasOwnProperty(battle.hero_lvl)) {
                cl_buckets[battle.hero_lvl].push(battle)
            } else {
                cl_buckets[battle.hero_lvl] = [battle]
            }
        })
        let cl_battles = mapToArray(cl_buckets)
        cl_battles = sortByKey(cl_battles, 0).reverse()
        cl_battles.forEach((bucket, index) => {
            result += getSpoiler(
                type,
                index,
                `<div class="home_button2 btn_hover2" style="margin: 3px 0; min-width: 100px;">${bucket[0]}${allTexts.get("cl")} (${bucket[1].length})</div>`,
                ffaBattlesToHTML(bucket[1]))
        })


        return [result, my_lvl_battles.length, not_my_lvl_battles.length]

    }

    function getCreaturesHTML(battle, index) {
        if (currentSilver === 0 || !("creatures" in battle) || !location.href.includes("reaping_event") || Object.keys(creaturesInfo).length === 0) {
            return ""
        }

        let creatures = battle.creatures[0]
        let totalPrice = Object.entries(creatures).reduce((prev, [portrait, amount]) => {
            return prev + creaturesInfo[portrait][1] * amount
        }, 0)

        let playerCreaturesHTML = ""
        Object
            .entries(creatures)
            .forEach(([creaturePortrait, creatureAmount], cellId) => {
                playerCreaturesHTML += `<div id="creature-${index}-${cellId}">${getNewCreatureIcon(creaturePortrait, creatureAmount, "good-creature")}</div>`
            })

        return `
        <div style="width: 80%;display: flex;justify-content: space-between;">
        <div class="record-player-creatures" id="creatures-${index}">
            <div id="creatures-${index}-apply" class="creatures-apply">
                ${totalPrice <= currentSilver ? `<div id="creatures-${index}-apply-button" class="home_button2 btn_hover2" onclick="sendApplyArmy('${battle.battle_id}')" >${allTexts.get("hire")}</div>` : ""}
                <div id="creatures-${index}-leadership" class="player-leadership">
                    <img height="24" src="https://${cdnHost}/i/adv_ev_silver48.png" alt="">
                    <span id="leadership-number-${index}" style="color: ${totalPrice <= currentSilver ? "green" : "red"}">
                        ${totalPrice}
                    </span>
                </div>
            </div>
            <div id="creatures-${index}-creatures" class="player-creatures-row">${playerCreaturesHTML}</div>
        </div>
        </div>
        `
    }

    let applyingArmy = false;
    async function sendApplyArmy(battleId) {
        if (applyingArmy) {
            return
        }
        applyingArmy = true
        document.body.style.cursor = 'wait';

        let creatures = battles["AFS"].find(battle => battle.battle_id === battleId).creatures[0]

        let doc = await doGet("/reaping_event_set.php", true)

        let creaturesToRemove = Array.from(doc.querySelectorAll("#ne_set_current_army .cre_creature"))
            .reduce((result, elem) => {
                if (elem.children.length > 2) {
                    let portrait = elem.innerHTML.match(/portraits\/([a-zA-Z0-9_-]+)p33/)[1]
                    let creatureId = creaturesInfo[portrait][0]
                    let amount = elem.children[2].innerText - 0
                    let price = creaturesInfo[portrait][1]
                    result[creatureId] = {
                        portrait: portrait,
                        amount: amount,
                        price: price
                    }
                }
                return result;
            }, {})

        for (const [creatureId, creatureInfo] of Object.entries(creaturesToRemove)) {
            if (creatureInfo.portrait in creatures && creatures[creatureInfo.portrait] === creatureInfo.amount) {
                continue
            }
            let url = new URL(`https://${location.host}/reaping_event_set.php`);
            url.searchParams.set('del', creatureId);
            url.searchParams.set('sign', my_sign);
            url.searchParams.set('js', "1");
            url.searchParams.set('rand', (Math.random() * 1000000).toString());
            await doGet(url.toString(), true)
        }

        doc = await doGet("/reaping_event_set.php", true)

        let creaturesToSell = Array.from(doc.querySelectorAll("#ne_set_available_troops .cre_creature"))
            .reduce((result, elem) => {
                let portrait = elem.innerHTML.match(/portraits\/([a-zA-Z0-9_-]+)p33/)[1]
                let creatureId = creaturesInfo[portrait][0]
                let amount = elem.children[2].innerText - 0
                let price = creaturesInfo[portrait][1]
                result[creatureId] = {
                    portrait: portrait,
                    amount: amount,
                    price: price
                }
                return result;
            }, {})

        for (const [creatureId, creatureInfo] of Object.entries(creaturesToSell)) {
            if (creatureInfo.portrait in creatures && creatures[creatureInfo.portrait] === creatureInfo.amount) {
                continue
            }
            let url = new URL(`https://${location.host}/reaping_event_set.php`);
            url.searchParams.set('act', "sell_unit");
            url.searchParams.set('mid', creatureId);
            url.searchParams.set('price', creatureInfo.price);
            url.searchParams.set('sign', my_sign);
            url.searchParams.set('js', "1");
            url.searchParams.set('rand', (Math.random() * 1000000).toString());
            await doGet(url.toString(), true)
        }

        for (const [portrait, amount] of Object.entries(creatures)) {
            if (creaturesInfo[portrait][0] in creaturesToSell && creaturesToSell[creaturesInfo[portrait][0]].amount === amount) {
                continue
            }
            let url = new URL(`https://${location.host}/reaping_event_set.php`);
            url.searchParams.set('act', "buy");
            url.searchParams.set('mid', creaturesInfo[portrait][0]);
            url.searchParams.set('price', creaturesInfo[portrait][1]);
            url.searchParams.set('cnt', amount.toString());
            url.searchParams.set('sign', my_sign);
            url.searchParams.set('js', "1");
            url.searchParams.set('rand', (Math.random() * 1000000).toString());
            await doGet(url.toString(), true)
        }
        location.reload()
        // applyingArmy = false
    }

    function ffaBattlesToHTML(battles) {
        if (battles.length > 0) {
            battles.sort((a, b) => a.nickname.localeCompare(b.nickname))
            return groupBy(battles, "nickname").reduce((prev, curr, index) => {
                let creatures = getCreaturesHTML(curr[0], index)
                return prev + `
                    <div class="hwm_event_example_block">
                        <div style="width: 80%;display: flex;justify-content: space-between;">
                            <div>${curr[0].is_clan ? `<img src="https://www.freeiconspng.com/thumbs/lock-icon/black-lock-icon-14.png" style="height: 14px;">` : ""}${index + 1}. </div>
                            <div style="text-align: center"> <a href="/pl_info.php?nick=${encode(curr[0]["nickname"])}" class="pi" target="_blank">${curr[0]["nickname"]}</a></div>
                            <div style="display: flex;min-width: 120px;justify-content: space-between;">
                            ${sortByKey(curr, "battle_side").reduce((prev_entry, curr_entry) => {
                                 return prev_entry + `
                                    <div> <a target="_blank" href="/warlog.php?warid=${curr_entry["battle_id"]}&show_for_all=${curr_entry["battle_secret"]}&lt=-1">${getFFAEventBattleSide(curr_entry)}</a></div>
                                `
                            }, "")}
                            </div>
                        </div>
                        ${creatures}
                    </div>
                            `
            }, "")
        } else {
            return `<div style="text-align: center;"><h5>${allTexts.get("empty")}</h5></div>`
        }
    }

    function getClassById(id) {
        for (let i = 0; i < allClasses.length; i++) {
            if (id === allClasses[i][4]) {
                return allClasses[i]
            }
        }
        return null
    }

    function getFFAEventBattleSide(battle) {
        let class_img = "class" in battle && getClassById(battle["class"]) ? `<img style="vertical-align: middle; height: 16px" src="https://${cdnHost}/i/f/${getClassById(battle["class"])[3]}?v=1.1" alt=""> ` : ""
        if ("battle_side" in battle) {
            if (battle["battle_side"] === 0) {
                return `${class_img}${allTexts.get("enemy")}#1`
            } else if (battle["battle_side"] === 1) {
                return `${class_img}${allTexts.get("enemy")}#2`
            } else {
                return `${class_img}${allTexts.get("battle")}`
            }
        } else {
            return `${class_img}${allTexts.get("battle")}`
        }
    }

    return battles
}