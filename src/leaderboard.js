import {doGet} from "./utils/networkUtils";
import {$, cdnHost} from "./utils/commonUtils";

export async function setLeaderboard(where, position = "afterbegin") {
    let isLeaderboardExpanded = false
    let topHeroes = await doGet(`getTopScores`)
    where.insertAdjacentHTML(position,
        `<div style="display: flex; flex-direction: column" id="top_heroes_container"></div><br>`)
    resetLeaderboard()

    function resetLeaderboard() {
        let result = topHeroes.slice(0, 15).reduce((prev, curr, index) => {
            return prev + getTopHeroTemplate(curr, index)
        }, "")
        $(`top_heroes_container`).innerHTML = `
                <b style="user-select: none; text-align: center;">Лучшие игроки (<span id="expand_top_heroes" style="cursor: pointer; text-decoration: underline">+</span>)</b>${result}
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
                    <div>${index + 1}.</div>
                    <div style="text-align: center">
                        <a href="/clan_info.php?id=${hero["clan_id"]}">
                        <img style="height: 15px; vertical-align: bottom" src="https://${cdnHost}/i_clans/l_${hero["clan_id"]}.gif?1805" alt=""></a>
                         
                        <a href="/pl_info.php?id=${hero["member_id"]}" style="text-decoration: none; font-size: 9px">${hero["member_name"]}</a>
                         [${hero["member_cl"]}]
                    </div>
                    <div>${hero["member_score"]}${hero["attempts_left"] ? `<span title="Оставшиеся попытки" style="cursor: help; font-size: 5pt">(${hero["attempts_left"]})</span>` : ""}</div>
                </div>`
    }
}
