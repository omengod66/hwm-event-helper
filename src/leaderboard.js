import {doGet} from "./utils/networkUtils";
import {$, cdnHost} from "./utils/commonUtils";
import {LocalizedText, LocalizedTextMap} from "./utils/localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("top_heroes", "Top heroes", "Лучшие игроки", "Найкращі гравці"))
    texts.addText(new LocalizedText("top_clans", "Top clans", "Лучшие кланы", "Найкращі клани"))
    texts.addText(new LocalizedText("attempts_left", "Attempts left", "Оставшиеся попытки", "Залишилось спроб"))

    return texts
}

let allTexts = getAllTexts()
export async function setLeaderboard(where, position = "afterbegin", withClan = false) {
    let isLeaderboardExpanded = false
    let topHeroes = await doGet(`getTopScoresV2`)
    where.insertAdjacentHTML(position,
        `<div style="display: flex; flex-direction: column" id="top_heroes_container"></div><br>`)
    resetLeaderboard()

    if (withClan){
        let topClans = await doGet(`getTopClanScores`)
        let result = topClans.reduce((prev, curr, index) => {
            return prev + getTopClanTemplate(curr, index)
        }, "")
        where.insertAdjacentHTML(position,
            `<div style="display: flex; flex-direction: column" id="top_clans_container">
            <b style="user-select: none; text-align: center;">${allTexts.get("top_clans")}</b>${result}
            </div><br>`)
    }

    function resetLeaderboard() {
        let result = topHeroes.slice(0, 15).reduce((prev, curr, index) => {
            return prev + getTopHeroTemplate(curr, index)
        }, "")
        $(`top_heroes_container`).innerHTML = `
                <b style="user-select: none; text-align: center;">${allTexts.get("top_heroes")} (<span id="expand_top_heroes" style="cursor: pointer; text-decoration: underline">+</span>)</b>${result}
            `
        $(`expand_top_heroes`).addEventListener("click", (e) => {
            if (!isLeaderboardExpanded) {
                topHeroes.slice(15,).forEach((curr, index) => {
                    $(`top_heroes_container`).insertAdjacentHTML("beforeend", getTopHeroTemplate(curr, index + 15))
                })
                isLeaderboardExpanded = true
                e.target.innerHTML = "—"
            } else {
                resetLeaderboard()
                isLeaderboardExpanded = false
            }
        })
    }

    function getTopHeroTemplate(hero, index) {
        return `
                <div style="display: flex; justify-content: space-between; padding: 1px; font-size: smaller">
                    <span style="display: inline-block">${index + 1}.</span>
                    <span style="display: inline-block; text-align: center">
                        <a href="/clan_info.php?id=${hero["clan_id"]}">
                        <img style="height: 15px; vertical-align: bottom" src="https://${cdnHost}/i_clans/l_${hero["clan_id"]}.gif?1805" alt=""></a>
                         
                        <a href="/pl_info.php?id=${hero["member_id"]}" style="text-decoration: none; font-size: 9px">${hero["member_name"]}</a>
                         [${hero["member_cl"]}]
                    </span>
                    <span style="display: inline-block">${hero["member_score"]}${hero["attempts_left"] ? `<span title="${allTexts.get("attempts_left")}" style="cursor: help; font-size: 5pt">(${hero["attempts_left"]})</span>` : ""}</span>
                </div>`
    }

    function getTopClanTemplate(hero, index) {
        return `
                <div style="display: flex; justify-content: space-between; padding: 1px; font-size: smaller">
                    <span style="display: inline-block">${index + 1}.</span>
                    <span style="display: inline-block; text-align: center">
                        <a href="/clan_info.php?id=${hero[0]}">
                        <img style="height: 15px; vertical-align: bottom" src="https://${cdnHost}/i_clans/l_${hero[0]}.gif?1805" alt=""></a>
                         
                        <a href="/clan_info.php?id=${hero[0]}" style="text-decoration: none; font-size: 9px">#${hero[0]}</a>
                    </span>
                    <span style="display: inline-block">${hero[1]}</span>
                </div>`
    }
}

export async function setTopClanAttempts(where) {
    let topClanAttempts = await doGet(`getTopClanTotalAttempts`)
    where.querySelectorAll("tr").forEach(clanElem => {
        let clanId = clanElem.innerHTML.match(/id=(\d{1,5})/)[1]
        let scoreElem = Array.from(clanElem.querySelectorAll("td")).at(-1)
        let clanAttempts = topClanAttempts[clanId]
        if (clanAttempts) {
            scoreElem.insertAdjacentHTML("beforeend", `
                <span title="Оставшиеся попытки" style="cursor: help; font-size: 5pt">(${clanAttempts})</span>
            `)
        }
    })
}