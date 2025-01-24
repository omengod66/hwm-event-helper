import {
    $,
    allFactions,
    cdnHost,
    findAll,
    get,
    heroCreatures,
    magicSpells,
    mode,
    my_sign,
    set
} from "../utils/commonUtils";
import {eventHelperSettings, setSettings} from "../settings";
import {collapseEventDesc, getCurrentLevel, removeLeaderboard, setClickableLevels, setTimer} from "../utils/eventUtils";
import {setLeaderboard} from "../leaderboard";
import {doGet, doPost} from "../utils/networkUtils";
import {getNewCreatureIcon} from "../templates";
import {addFilteringArea, processFilters} from "../mercenaryFilters";
import {fav_icon, greenArrowSvg, not_fav_icon, redArrowSvg} from "../utils/icons";

export default async function leaderEvent() {
    let favourites = get("leader_favourites", [])

    let isEvent = false
    let lg_lvl = parseInt(get('hero_leader_lvl', 10));
    let originalBattles = []
    let battles = [];
    let isLostBattles = false;

    window.sendApplyArmy = sendApplyArmy
    window.saveFav = saveFav
    window.showSpecialCreatureData = showSpecialCreatureData


    if (/(lg_event)/.test(location.href)) {
        isEvent = true
        removeLeaderboard()
        collapseEventDesc()
        setTimer(document.querySelectorAll(".global_container_block_header")[1])
        let leaderBoardTarget = Array.from(document.querySelectorAll(".frac_event_stat center")).at(-1)
        setLeaderboard(leaderBoardTarget, "beforebegin")

        let enemiesContainer = document.querySelector(".frac_enemy_block").parentElement
        enemiesContainer.style.flexDirection = "column"
        if (typeof hwm_mobile_view !== "undefined" && hwm_mobile_view === true) {
        } else {
            $("hwm_no_zoom").style.width = "unset"
            $("hwm_no_zoom").style.maxWidth = "1280px"
        }

        let settingsContainer = Array.from(document.querySelectorAll(".global_container_block_header.ev_header")).at(-1)

        eventHelperSettings(settingsContainer, (container) => {
            setSettings("auto_send_event_lg", "Отправлять бои из ГЛ ивента в сервис автоматически", container)
            setSettings("only_clan_visibility", "Мои бои доступны только для клана", container, false)
            setSettings("lg_show_available", "Отображать только доступные наборы", container, false)
            setSettings("lg_hide_duplicates", "Скрывать дубликаты наборов", container, false)
            setSettings("hide_faction_event_enemies", "Показывать только сложных противников", container, false)
            setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false)
        }, "afterend")

        if (get("hide_faction_event_enemies", false)) {
            Array.from(enemiesContainer.children).slice(1).forEach(elem => elem.remove())
        }

        Array.from(enemiesContainer.children).forEach((enemy, index) => {
            enemy.insertAdjacentHTML("beforeend", `
                <div id="find_examples_${index}" class="home_button2 btn_hover2" style="align-self: center; margin: 4px">Найти проходки</div>
            `)
            $(`find_examples_${index}`).addEventListener("click", (e) => {
                if ($("main-data")) {
                    $("main-data").remove()
                }
                let extra = new Map()

                let enemy_hero = /(Combat level|Боевой уровень)/.test(enemy.innerText)
                let creatures = Array.from(enemy.querySelectorAll(".cre_creature"))

                // обычные существа
                let creaturesMap = {}

                //палатки
                let creGenerator = {}
                creatures.forEach(creature => {
                    let portrait = creature.innerHTML.match(/portraits\/(.*)p33/)[1]
                    let amountContainer = creature.querySelector(".cre_amount48")
                    if (amountContainer) {
                        let amount = amountContainer.innerText - 0
                        if (creaturesMap.hasOwnProperty(portrait)) {
                            creaturesMap[portrait] += amount
                        } else {
                            creaturesMap[portrait] = amount
                        }
                    }
                    if (/(brevno|hellgate|derevo|witchhouse|house|sbor|imper|cmajak|lamp|logovo|grob|vdutl|sknor|sarkofag|sklep|yurt|elspawn|fabrik|gnh)/.test(portrait)) {
                        if (creGenerator.hasOwnProperty(portrait)) {
                            creGenerator[portrait] += 1
                        } else {
                            creGenerator[portrait] = 1
                        }
                    }

                })


                extra.set("creatures", Object.entries(creGenerator).length > 0 ? creGenerator : creaturesMap)
                extra.set("enemy_hero", enemy_hero)
                extra.set("wave", document.body.innerText.match(/(Задание|Task): (\d{1,3})/)[2])
                extra.set("enemy", enemy.innerText.match(/(Враг|Enemy) #(\d{1,2})/)[1])

                setLoading(e.target.parentElement)
                getResources(getWaveInfo, createLeaderTemplate, e.target.parentElement, extra)
                e.target.remove()
            })
        })
    }

    if (/(leader_rogues|leader_winter)/.test(location.href)) {
        removeLeaderboard()
        setTimer(document.querySelector(".global_container_block_header"))

        isEvent = true
        if (document.body.innerHTML.includes("leader_rogues.php?action=cancel_merc")) {
            let filtersContainer = document.querySelector('.Global')
            let filtersPosition = "afterend"
            if (typeof hwm_mobile_view !== "undefined" && hwm_mobile_view === true) {
                filtersContainer = document.querySelector("#lre_merc_block")
                filtersPosition = "beforebegin"
            }
            addFilteringArea(filtersContainer, filtersPosition)
            processFilters()
            return
        }
        if (location.href.includes("?show_2x2_form=1") || location.href.includes("?show_merc_dialog=1")) {
            return
        }
        let settingsContainer = document.querySelector('.Global')
        if (typeof hwm_mobile_view !== "undefined" && hwm_mobile_view === true) {
            settingsContainer = document.querySelector('.new_event_map').querySelector('.global_container_block:last-child > div').getElementsByTagName("table")[0]
        }
        eventHelperSettings(settingsContainer, (container) => {
            setSettings("auto_send_event_lg", "Отправлять бои из ГЛ ивента в сервис автоматически", container)
            setSettings("only_clan_visibility", "Мои бои доступны только для клана", container, false)
            setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false)
            setSettings("lg_show_available", "Отображать только доступные наборы", container, false)
            setSettings("lg_hide_duplicates", "Скрывать дубликаты наборов", container, false)
            setSettings("lg_show_harder", "Отображать сложные бои", container)
            setSettings("lg_show_standard", "Отображать обычные бои", container)
            setSettings("lg_show_easier", "Отображать облегченные бои", container)
        }, "afterend")
        collapseEventDesc()
        setClickableLevels()
        let leaderBoardTarget = Array.from(document.querySelector('.new_event_map').querySelector('.global_container_block:last-child > div').getElementsByTagName("center")).slice(-1)[0]
        setLeaderboard(leaderBoardTarget, "beforebegin")

        let examplesElem;
        if (typeof hwm_mobile_view !== "undefined" && hwm_mobile_view === true) {
            examplesElem = document.querySelector('.new_event_map').querySelector('.global_container_block:last-child > div')
        } else {
            examplesElem = $(`event_map`)
            $(`hwm_no_zoom`).style.width = "unset"
            $(`hwm_no_zoom`).style.maxWidth = "80vw"
            let mapContainer = document.querySelector('.new_event_map').children[0]
            mapContainer.style.flex = "1 0 40%"
            let mapHeight = mapContainer.style.height
            mapContainer.style.height = "unset"
            $(`Global`).style.height = "unset"
            $(`Global`).style.width = "unset"

            mapContainer.querySelector(".CampaignMapBorder").style.width = "-webkit-fill-available"
            mapContainer.querySelector(".CampaignMapBorder").style.width = "-moz-available"
            mapContainer.querySelector(".CampaignMapCorners").style.width = "-webkit-fill-available"
            mapContainer.querySelector(".CampaignMapCorners").style.width = "-moz-available"

            $(`CampaignMapContainer`).style.height = mapHeight
            $(`CampaignMapContainer`).style.width = "unset"


            document.querySelector('.new_event_map').children[1].style.flex = "1 0 0%"
        }

        setLoading(examplesElem)
        getResources(getWaveInfo, createLeaderTemplate, examplesElem)
            .then(_ => {
                if (typeof hwm_mobile_view !== "undefined" && hwm_mobile_view === true) {
                    $(`main-data`).style.width = "360px"
                    $(`event_helper_settings_container`).style.width = "360px"
                }
            })
    }

    function createLeaderTemplate() {
        return `
                    <div class="records-container-body global_container_block" id="main-data"></div>
                `
    }

    if (location.href.includes("leader_guild")) {
        //createWelcomeTemplate()
        lg_lvl = document.body.innerHTML.match(/lev=(\d{1,2})/)[1] - 0
        set("hero_leader_lvl", lg_lvl)
        eventHelperSettings(Array.from(document.querySelectorAll(`.leader_ramka`)).at(-1), (container) => {
            setSettings("auto_send_lg", "Отправлять бои с опасными бандитами в сервис автоматически", container)
            setSettings("lg_show_available", "Отображать только доступные наборы", container, false)
            setSettings("lg_hide_duplicates", "Скрывать дубликаты наборов", container, false)
        }, "afterend")
        if (!document.body.innerText.includes("Опасная цель устранена")) {
            setLoading(Array.from(document.querySelectorAll(`.leader_ramka`)).at(-1))
            getResources(getTodayBandits, createBanditsTemplate, Array.from(document.querySelectorAll(`.leader_ramka`)).at(-1))
        }
    }

    function createBanditsTemplate() {
        return `
            <div class="wrapper">
                <div class="records-container-body" id="main-data"></div>
            </div>
        `
    }

    function getResources(getExamples, showExamples, target, extraData = null) {
        return Promise.all([getHeroCreatures(), getExamples(extraData)]).then(() => {
            setExampleBattles(showExamples(), target)
        })
    }

    function setLoading(where = document.body) {
        where.insertAdjacentHTML("beforeend", `
            <div style="display: flex; justify-content: center;"  id="loading" >
                <img style="margin-top: 20px" src="https://i.imgur.com/4RrPm82.gif" width="400" alt="">
            </div>
        `)
    }

    async function getHeroCreatures() {
        if (Object.entries(heroCreatures).length === 0) {
            let doc = await doGet('/leader_army.php', true)
            processLeaderArmyResponse(doc)
        }
    }

    function processLeaderArmyResponse(doc) {
        let script = Array.from(doc.body.getElementsByTagName("script")).filter(scr => scr.innerHTML.includes("obj[1] = {"))[0]

        const str2obj = str => str.replace(/(\w+: )/g, s => '"' + s.substring(0, s.length - 2) + '": ');

        let objs = findAll(/obj\[\d{1,4}] = (\{.*});/g, script.innerText).map(match => {
            return JSON.parse(str2obj(match[1].replaceAll("'", "\"")))
        })
        objs.forEach(obj => {
            heroCreatures[obj.lname] = {
                'count': obj.count,
                'cost': obj.cost,
                'name': obj.name,
                'id': obj.monster_id,
                'version': obj.version,
                'rarity': obj.rarity,
                'race': obj.race,
            }
        })
    }

    async function getWaveInfo(extraData = null) {
        if (extraData) {
            if (originalBattles.length === 0) {
                originalBattles = await doGet(`getEventLeaderBattles?wave=${extraData.get("wave")}&token=${get("hwm_events_token", "")}`)
                originalBattles.sort((a, b) => {
                    a = parseFloat(a.cost)
                    b = parseFloat(b.cost)
                    if (a < 0 || b < 0) {
                        return b - a
                    } else {
                        return a - b
                    }
                })
            }

            let targetHits = Math.floor(Object.entries(extraData.get("creatures")).length/2) + 1

            battles = originalBattles.filter(battle => {
                if ("enemy_hero" in battle && extraData.get("enemy_hero") || extraData.get("enemy_hero") === false) {
                    let hits = 0
                    for (const [cre, amount] of Object.entries(extraData.get("creatures"))) {
                        if (cre in battle.enemy_creatures) {
                            hits++
                        }
                    }
                    if (hits >= targetHits) {
                        return true
                    }
                }
                return false
            })
            if (battles.length > 0) {
                return
            } else {
                battles = originalBattles.filter(battle => {
                    let enemy = extraData.get("enemy")-0
                    return battle.no === enemy;
                })
                return
            }
        }
        battles = await doGet(`getEventLeaderBattles?wave=${getCurrentLevel()}&token=${get("hwm_events_token", "")}`)
        if (battles.length > 0) {
            battles.sort((a, b) => {
                a = parseFloat(a.cost)
                b = parseFloat(b.cost)
                if (a < 0 || b < 0) {
                    return b - a
                } else {
                    return a - b
                }
            })
        } else {
            battles = await doGet(`getEventLeaderFailedBattles?wave=${getCurrentLevel()}&token=${get("hwm_events_token", "")}`)
            isLostBattles = true
        }
    }

    async function getTodayBandits(extraData = null) {
        battles = await doGet(`lg_daily.php?lg_lvl=${lg_lvl}`)
        battles.sort((a, b) => parseFloat(b.survived) - parseFloat(a.survived))
    }

    function setExampleBattles(template, where = document.body) {
        $('loading').remove()
        where.insertAdjacentHTML("beforeend", template);
        if (!isLostBattles) {
            processRecords(battles)
        } else {
            processFailedRecords(battles)
        }
    }

    function processFailedRecords(failedEventBattles) {
        let allRecords = failedEventBattles.reduce((prev, curr, index) => {
            return prev + `
                <div style="display: flex; justify-content: space-between; padding: 1px;">
                    <div>${index + 1}. </div>
                    <div style="text-align: center">${getRecordPlayersTemplate(curr.nicknames)}</div>
                    <div> <a target="_blank" href="/warlog.php?warid=${curr["battle_id"]}&show_for_all=${curr["battle_secret"]}&lt=-1">Бой</a></div>
                </div>`
        }, "")

        let result = `<div class="failed-records-wrapper">
                                <div class="failed-records-container">
                                    <div style="text-align: center;">
                                        <h3>Примеры поражений</h3>
                                    </div>
                                    ${allRecords}
                                </div>
                            </div>`
        $('main-data').insertAdjacentHTML("beforeend", result)
    }

    let processedBattleCreatures = []
    let rowDatas = {}

    function processRecords(records) {
        let favRecords = records.filter(battle => favourites.includes(battle.nicknames[0]))
        let notFavRecords = records.filter(battle => !favourites.includes(battle.nicknames[0]))

        let harderRecords = []
        if (get("lg_show_harder", true)) {
            harderRecords = notFavRecords.filter(battle => battle.hasOwnProperty("harder"))
        }
        let standardRecords = []
        if (get("lg_show_standard", true)) {
            standardRecords = notFavRecords.filter(battle => !battle.hasOwnProperty("harder") && !battle.hasOwnProperty("easier"))
        }
        let easierRecords = []
        if (get("lg_show_easier", true)) {
            easierRecords = notFavRecords.filter(battle => battle.hasOwnProperty("easier"))
        }
        let allRecords;
        if (isEvent && !location.href.includes("lg_event.php")) {
            allRecords = [...favRecords, ...harderRecords, ...standardRecords, ...easierRecords]
        } else {
            allRecords = favRecords.concat(notFavRecords)
        }

        let pageIndex = 0
        let pageSize = 25

        function addPage() {
            if (pageIndex * pageSize < allRecords.length) {
                let result = allRecords.slice(pageIndex * pageSize, pageIndex * pageSize + 25).reduce((prev, curr, index) => {
                    return prev + addRecord(curr, pageIndex * pageSize + index)
                }, "")
                $('main-data').insertAdjacentHTML("beforeend", result)
                pageIndex++
            }
        }

        addPage()

        setInterval(() => {
            if (!document.querySelector("#android_outside") && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
                addPage()
            } else if (document.querySelector("#android_outside") && (document.querySelector("#android_outside").clientHeight + document.querySelector("#android_outside").scrollTop) >= document.querySelector("#hwm_no_zoom").offsetHeight - 100) {
                addPage()
            }
        }, 50)
    }

    function addRecord(record, index) {
        let isFav = favourites.includes(record.nicknames[0])
        let playersCreaturesInfo = []
        record.creatures.forEach((playerCreatures, playerId) => {
            let rowData = []
            Object
                .entries(playerCreatures)
                .forEach(([creaturePortrait, creatureAmount]) => {
                    processRecordHeroCreatures(rowData, creatureAmount, creaturePortrait)
                })
            playersCreaturesInfo.push(rowData)
            rowDatas[`${index}:${playerId}`] = rowData
        })
        let isAllCreaturesAvailable = isAllPresent(playersCreaturesInfo[0])
        let recordLeadership = getLeadership(playersCreaturesInfo[0])
        if (!get("lg_show_available", false) || isAllCreaturesAvailable && recordLeadership > (lg_lvl + 9) * 1000 && recordLeadership <= (lg_lvl + 10) * 1000 || isFav) {
            let recordCreatureIds = Object.keys(record.creatures[0])
            recordCreatureIds.sort((a, b) => a.localeCompare(b))
            if (!get("lg_hide_duplicates", false) || !processedBattleCreatures.includes(recordCreatureIds.join(":")) || isFav) {
                let playersCreatures = record.creatures.map((playerCreatures, playerId) => {
                    let playerCreaturesHTML = ""
                    let rowData = []
                    Object
                        .entries(playerCreatures)
                        .forEach(([creaturePortrait, creatureAmount], cellId) => {
                            let isGood = processRecordHeroCreatures(rowData, creatureAmount, creaturePortrait)
                            playerCreaturesHTML += `<div id="creature-${index}-${playerId}-${cellId}">${getNewCreatureIcon(creaturePortrait, creatureAmount, isGood ? "good-creature" : "bad-creature")}</div>`
                        })
                    return `
                        <div class="record-player-creatures" id="creatures-${index}-${playerId}">
                            <div id="creatures-${index}-${playerId}-apply" class="creatures-apply">
                                <div id="creatures-${index}-${playerId}-apply-button" class="home_button2 btn_hover2" onclick="sendApplyArmy('${index}:${playerId}')">Набрать</div>
                                <div id="creatures-${index}-${playerId}-leadership" class="player-leadership">
                                    ${getRecordPlayerLeadershipTemplate(index, playerId, getLeadership(rowData), isAllCreaturesAvailable)}
                                </div>
                            </div>
                            <div id="creatures-${index}-${playerId}-creatures" class="player-creatures-row">${playerCreaturesHTML}</div>
                        </div>`
                }).join(`<img src="https://i.imgur.com/Y3sbLcM.png" alt="" class="record-players-arms">`)
                //onwheel="if(this.scrollWidth > this.clientWidth){ if (event.deltaY > 0) {this.scrollLeft += 100;} else {this.scrollLeft -= 100;}; event.preventDefault()}"
                let recordContainer = `
                            <div class="record-number">
                                ${record.is_clan ? `<img src="https://www.freeiconspng.com/thumbs/lock-icon/black-lock-icon-14.png" style="height: 14px;">` : ""}
                                <div>${index + 1}</div>
                                <div id="fav_${index}" class="fav_player_button" onclick="saveFav('${record.nicknames[0]}', this)">
                                    ${isFav ? fav_icon : not_fav_icon}
                                </div>
                            </div>
                            <div class="record-players" id="record-${index}-players">
                                <div>${getRecordPlayersTemplate(record.nicknames)}</div>
                                <div>${getRecordResultTemplate(record)}</div>
                            </div>
                            ${record.special_creature ? getSpecialCreatureTemplate(record.special_creature, index) : `<div class="special-creature"></div>`}
                            <div class="record-players-creatures" id="record-${index}-creatures">${playersCreatures}</div>
                            <div class="record-enemy-creatures">${getEnemyCreaturesTemplate(record)}</div>
                            <div class="special-creature-extended" id="special-creature-extended-${index}">
                                ${record.special_creature ? getSpecialCreatureExtraData(record.special_creature) : ""}
                            </div>`
                processedBattleCreatures.push(recordCreatureIds.join(":"))
                return recordContainer
            }
        }
        return ""
    }

    function getEnemyCreaturesTemplate(record) {
        if (!record.enemy_creatures) {
            return ""
        }
        return `<div class="enemy-text">враг --></div>` + Object.entries(record.enemy_creatures).sort(([key1, value1], [key2, value2]) => key1.localeCompare(key2)).map(([creaturePortrait, creatureAmount]) => {
            return `<div>${getNewCreatureIcon(creaturePortrait, creatureAmount, "good-creature")}</div>`
        }).join("")
    }

    function saveFav(nickname, elem) {
        if (favourites.includes(nickname)) {
            elem.innerHTML = not_fav_icon
            favourites = favourites.filter(v => v !== nickname);
        } else {
            elem.innerHTML = fav_icon
            favourites.push(nickname)
        }
        set("leader_favourites", favourites)
    }

    function processRecordHeroCreatures(rowData, creatureAmount, creaturePortrait) {
        let isGood = false;
        if (heroCreatures.hasOwnProperty(creaturePortrait)) {
            if (creatureAmount - 0 <= heroCreatures[creaturePortrait].count) {
                rowData.push([creaturePortrait, creatureAmount, true])
                isGood = true
            } else {
                rowData.push([creaturePortrait, creatureAmount, false])
            }
        } else {
            rowData.push([creaturePortrait, creatureAmount, false])
        }
        return isGood
    }



    function isAllPresent(rowData) {
        let isAllPresent = true;
        rowData.forEach(cre => {
            if (!cre[2]) {
                isAllPresent = false
            }
        })
        return isAllPresent
    }

    function getRecordPlayersTemplate(nicknames) {
        return nicknames.map(nickname => `<a href="/search.php?key=${nickname}">${nickname}</a>`).join("<br>+<br>")
    }

    function getRecordResultTemplate(record) {
        let arrow = ""
        if (record.easier) {
            arrow = greenArrowSvg
        }
        if (record.harder) {
            arrow = redArrowSvg
        }
        return `
            <div class="record-result">
                <div><img src="https://${cdnHost}/i/r/48/gold.png?v=3.23de65" title="Потрачено на воскрешение" alt="gold"><span> ${record.cost}</span></div>
                <div><a href="/war.php?lt=-1&warid=${record.battle_id}&show_for_all=${record.battle_secret}" target="_blank">Бой</a>${arrow}</div>
                ${record.survived === undefined ? "" : `<div>${record.survived}%</div>`}
            </div>`
    }


    function getRecordPlayerLeadershipTemplate(recordId, playerId, leadership, allPresent) {
        return `
                <img height="24" src="https://${cdnHost}/i/icons/attr_leadership.png?v=1" alt="" title="Лидерство сборки">
                <span id="leadership-number-${recordId}-${playerId}" style="color: ${allPresent ? "green" : "red"}">
                    ${leadership}
                </span>`
    }

    function getLeadership(rowData) {
        return rowData.filter(cre => cre[2]).reduce((leadership, cre) => {
            return leadership + (heroCreatures[cre[0]]['cost'] - 0) * (cre[1] - 0)
        }, 0)
    }


    async function sendApplyArmy(rowDataId) {
        await doPost(`/leader_army_apply.php${isEvent ? "?from_event=1" : ""}`, getApplyArmyForm(rowDatas[rowDataId]), true)
        location.reload()
    }

    function getApplyArmyForm(rowData) {
        let formData = new FormData()
        formData.append('set_id', "7")
        formData.append('sign', my_sign)
        formData.append('idx', "0")
        rowData.filter(cre => cre[2]).forEach((creData, index) => {
            formData.append(`countv${index + 1}`, creData[1])
            formData.append(`mon_id${index + 1}`, heroCreatures[creData[0]]['id'])
        })
        return formData
    }

}

export function getSpecialCreatureTemplate(creatureData, index) {
    let build = "attack"
    if (creatureData.casts.length > 5) {
        let temp = creatureData.casts.map(spell => magicSpells[spell])
        build = mode(temp)
    }
    return `
                <div class="special-creature">
                    <div class="special-creature-info">
                        ${getNewCreatureIcon(creatureData.portrait, `<img src="https://hwm.achepta.com/battles/skills/${build}.png">`)}
                        <div class="special-creature-info-button" onclick="showSpecialCreatureData('${index}')">
                            <img src="https://${cdnHost}/i/combat/btn_info.png" alt="creature info" height="50">
                        </div>
                    </div>
                </div>
                `
}

export function showSpecialCreatureData(index) {
    $(`special-creature-extended-${index}`).classList.toggle("visible")
}

export function getSpecialCreatureExtraData(creatureData) {
    return `
                <div class="special-creature-stats">
                    <div>
                        <div><img class="special-creature-stat-icon" src="https://${cdnHost}/i/icons/attr_attack.png?v=1" alt="attack"></div>
                        <div class="special-creature-stat-value">${creatureData.attack.toFixed()}</div>
                    </div>
                    <div>
                        <div><img class="special-creature-stat-icon" src="https://${cdnHost}/i/icons/attr_defense.png?v=1" alt="attack"></div>
                        <div class="special-creature-stat-value">${creatureData.defence.toFixed()}</div>
                    </div>
                    <div>
                        <div><img class="special-creature-stat-icon" src="https://${cdnHost}/i/icons/attr_hit_points.png?v=1" alt="attack"></div>
                        <div class="special-creature-stat-value">${creatureData.health.toFixed()}</div>
                    </div>
                    <div>
                        <div><img class="special-creature-stat-icon" src="https://${cdnHost}/i/icons/attr_mana.png?v=1" alt="mana"></div>
                        <div class="special-creature-stat-value">${creatureData.maxmanna.toFixed()}</div>
                    </div>
                    <div>
                        <div><img class="special-creature-stat-icon" src="https://${cdnHost}/i/icons/attr_speed.png?v=1" alt="attack"></div>
                        <div class="special-creature-stat-value">${creatureData.speed.toFixed()}</div>
                    </div>
                    <div>
                        <div><img class="special-creature-stat-icon" src="https://${cdnHost}/i/icons/attr_initiative.png?v=1" alt="attack"></div>
                        <div class="special-creature-stat-value">${creatureData.maxinit}</div>
                    </div>
                    <div>
                        <div><img class="special-creature-stat-icon" src="https://${cdnHost}/i/icons/attr_shoots.png?v=1" alt="attack"></div>
                        <div class="special-creature-stat-value">${creatureData.shots.toFixed()}</div>
                    </div>
                    <div>
                        <div><img class="special-creature-stat-icon" src="https://${cdnHost}/i/icons/attr_damage.png?v=1" alt="attack"></div>
                        <div class="special-creature-stat-value">${creatureData.mindam.toFixed()}-${creatureData.maxdam.toFixed()}</div>
                    </div>
                </div>
                <b>Навыки</b>: ${creatureData.skills.map(skill => skill.replace(". ", "").replace(".", "")).join(", ")}.<br>
                <b>Заклинания</b>: ${creatureData.casts.map((cast, index) => {
        if (creatureData.casts_effects) {
            return `${cast} (${creatureData.casts_effects[index]})`
        }
        return cast
    }).join(", ")}.
                        `
}