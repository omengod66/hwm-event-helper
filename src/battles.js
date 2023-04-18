import {doGet, doPost} from "./utils/networkUtils";
import {$, allClasses, cdnHost, encode, get, mapToArray, pl_lvl, sortByKey} from "./utils/commonUtils";
import {getCurrentLevel} from "./utils/eventUtils";
import {getSpoiler} from "./templates";

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

    await doPost(types[type], formData)
    if (index) {
        $(`send_battle_${index}`).outerHTML = "Отправлено"
    }
}

export async function getEventBattles(target, from = "getFFAEventBattles", callback = 2, lost = false) {
    let battles = await doGet(`${from}?wave=${getCurrentLevel()}&token=${get("hwm_events_token", "")}`)
    processEventBattles(target)

    function processEventBattles(where = document.body) {
        switch (callback) {
            case 1: {
                if (battles.AFS.length === 0 && !lost) {
                    getEventBattles(target, from.replace("Battles", "FailedBattles"), callback, true)
                } else {
                    where.insertAdjacentHTML("beforeend", getAFSEventBattlesTemplate(lost))
                }
                break
            }
            case 2: {
                if (battles.AFS.length === 0 && battles.FFA.length === 0 && !lost) {
                    getEventBattles(target, from.replace("Battles", "FailedBattles"), callback, true)
                } else {
                    where.insertAdjacentHTML("beforeend", getFFAEventBattlesTemplate(lost))
                }
            }
        }
    }

    function getAFSEventBattlesTemplate(lost) {
        let result = getBattlesTemplate(battles["AFS"])

        return  getSpoiler(
            "examples",
            "AFS",
            `<div class="home_button2 btn_hover2" style="margin: 3px 0">Примеры боёв (${result[1]}/${result[2]})</div>`,
            `
                <div style="display: flex;width: 100%;justify-content: space-evenly;">
                    <div style="display: flex; flex-direction: column">
                        <div style="text-align: center;">
                            <h3>АиМ</h3>
                        </div>
                        <div style="text-align: center;">${lost ? "Поражения" : ""}</div>
                        ${result[0]}
                    </div>
                </div>`)
    }

    function getFFAEventBattlesTemplate(lost) {
        return `
                <div style="display: flex;width: 100%;justify-content: space-evenly;">
                    <div style="display: flex; flex-direction: column">
                        <div style="text-align: center;">
                            <h3>АиМ</h3>
                        </div>
                        <div style="text-align: center;">${lost ? "Поражения" : ""}</div>
                        ${getBattlesTemplate(battles["AFS"])[0]}
                    </div>
                    <div style="display: flex; flex-direction: column">
                        <div style="text-align: center;">
                            <h3>КБО</h3>
                        </div>
                        <div style="text-align: center;">${lost ? "Поражения" : ""}</div>
                        ${getBattlesTemplate(battles["FFA"], "FFA")[0]}
                    </div>
                </div>`
    }

    function getBattlesTemplate(battles, type = "AFS") {
        let result = ""
        result += `<div style="text-align: center;"><h4>Твой уровень</h4></div>`
        let my_lvl_battles = battles.filter(battle => battle["hero_lvl"] === pl_lvl)
        result += ffaBattlesToHTML(my_lvl_battles)

        result += `<div style="text-align: center;"><h4>Другие уровни</h4></div>`
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
                `<div class="home_button2 btn_hover2" style="margin: 3px 0">${bucket[0]}БУ (${bucket[1].length})</div>`,
                ffaBattlesToHTML(bucket[1]))
        })


        return [result, my_lvl_battles.length, not_my_lvl_battles.length]

    }

    function ffaBattlesToHTML(battles) {
        if (battles.length > 0) {
            battles.sort((a, b) => a.nickname.localeCompare(b.nickname))
            return battles.reduce((prev, curr, index) => {
                return prev + `
                            <div style="display: flex; justify-content: space-between; padding: 1px;">
                                <div>${index + 1}. </div>
                                <div style="text-align: center"> <a href="/pl_info.php?nick=${encode(curr["nickname"])}" class="pi" target="_blank">${curr["nickname"]}</a> ${"class" in curr && getClassById(curr["class"]) ? `<img style="vertical-align: middle; height: 16px" src="https://${cdnHost}/i/f/${getClassById(curr["class"])[3]}?v=1.1" alt="">` : ""} [${curr["hero_lvl"]}]</div>
                                <div> ${getFFAEventBattleSide(curr)}</div>
                                <div> <a target="_blank" href="/warlog.php?warid=${curr["battle_id"]}&show_for_all=${curr["battle_secret"]}&lt=-1">Бой</a></div>
                            </div>
                            `
            }, "")
        } else {
            return `<div style="text-align: center;"><h5>пусто</h5></div>`
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
        if ("battle_side" in battle) {
            if (battle["battle_side"] === 0) {
                return "Враг#1"
            } else if (battle["battle_side"] === 1) {
                return "Враг#2"
            } else {
                return ""
            }
        } else {
            return ""
        }
    }
}