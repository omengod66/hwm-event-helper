import {doGet} from "./utils/networkUtils";
import {$, cdnHost} from "./utils/commonUtils";
import {LocalizedText, LocalizedTextMap} from "./utils/localizationUtils";

let TOP_CLANS = ["1519", "928", "104", "1597", "1209", "18", "41", "5152", "88", "326", "8502", "73", "7777", "302", "823",
    "17", "997", "276", "249", "1512", "9426", "10557", "2304", "14", "11532", "10886", "846", "3305", "8433",
    "1488"]

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("top_heroes", "Top heroes", "Лучшие игроки", "Найкращі гравці"))
    texts.addText(new LocalizedText("top_clans", "Top clans", "Лучшие кланы", "Найкращі клани"))
    texts.addText(new LocalizedText("attempts_left", "Attempts left", "Оставшиеся попытки", "Залишилось спроб"))
    texts.addText(new LocalizedText("progression", "Score progression", "Прогрессия очков", "Прогресія очок"))

    return texts
}

let allTexts = getAllTexts()
export async function setLeaderboard(where, position = "afterbegin", withClan = false, showStat = false) {
    window.showProgression = showProgression
    let isLeaderboardExpanded = false
    let topHeroes = await doGet(`getTopScoresV2`)
    where.insertAdjacentHTML(position,
        `<div style="display: flex; flex-direction: column" id="top_heroes_container"></div><br>`)
    resetLeaderboard(showStat)
    if (showStat) {
        document.querySelectorAll(".global_container_block")[1]
            .insertAdjacentHTML("afterend", `
                <div id="chart_area" class="global_container_block" style="display: none"></div>
            `)
    }
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

    function resetLeaderboard(showStat) {
        let result = topHeroes.slice(0, 15).reduce((prev, curr, index) => {
            return prev + getTopHeroTemplate(curr, index, showStat)
        }, "")
        $(`top_heroes_container`).innerHTML = `
                <b style="user-select: none; text-align: center;">${allTexts.get("top_heroes")} (<span id="expand_top_heroes" style="cursor: pointer; text-decoration: underline">+</span>)</b>${result}
            `
        $(`expand_top_heroes`).addEventListener("click", (e) => {
            if (!isLeaderboardExpanded) {
                topHeroes.slice(15,).forEach((curr, index) => {
                    $(`top_heroes_container`).insertAdjacentHTML("beforeend", getTopHeroTemplate(curr, index + 15, showStat))
                })
                isLeaderboardExpanded = true
                e.target.innerHTML = "—"
            } else {
                resetLeaderboard(showStat)
                isLeaderboardExpanded = false
            }
        })
    }

    function getTopHeroTemplate(hero, index, showStat) {
        let scoreElem = hero["member_score"]
        if (showStat && TOP_CLANS.includes(hero["clan_id"])) {
            scoreElem = `<b style="font-size: 10px; text-decoration: underline; cursor: pointer" onclick="showProgression(${hero["member_id"]}, '${hero["member_name"]}')">${hero["member_score"]}</b>`
        }
        return `
                <div style="display: flex; justify-content: space-between; padding: 1px; font-size: smaller">
                    <span style="display: inline-block">${index + 1}.</span>
                    <span style="display: inline-block; text-align: center">
                        <a href="/clan_info.php?id=${hero["clan_id"]}">
                        <img style="height: 15px; vertical-align: bottom" src="https://${cdnHost}/i_clans/l_${hero["clan_id"]}.gif?1805" alt=""></a>
                         
                        <a href="/pl_info.php?id=${hero["member_id"]}" style="text-decoration: none; font-size: 9px">${hero["member_name"]}</a>
                         [${hero["member_cl"]}]
                    </span>
                    <span style="display: inline-block">${scoreElem}${hero["attempts_left"] ? `<span title="${allTexts.get("attempts_left")}" style="cursor: help; font-size: 5pt">(${hero["attempts_left"]})</span>` : ""}</span>
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

async function showProgression(id, name) {
    let chartArea = $(`chart_area`)
    chartArea.style.display = "flex"
    chartArea.innerHTML = `
                                <div style="height: 165px; overflow: hidden">
                                <div>${allTexts.get("progression")} <b>${name}</b></div>
                                    <canvas id="chart${id}" style="width: 100%; height: 150px"></canvas>
                                </div>
                            `
    let heroData = await doGet(`getDunHeroData?pl_id=${id}`)
    const cumulativeSum = (sum => value => sum += value)(0);

    const labels = heroData.map(entry => entry[0] + ` ${entry[1] > 0 ? "+" : ""}${entry[1]}`);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Очки',
                data: heroData.map(entry => entry[1]).map(cumulativeSum),
                borderColor: "blue",
                backgroundColor: "rgb(44,73,107)",
                pointStyle: 'circle',
                pointRadius: 3,
                pointHoverRadius: 4
            },
        ]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            animation: false,
            responsive: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: false,
                    text: 'Chart.js Line Chart'
                }
            },
            elements: {
                line: {
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    ticks: {
                        display: false
                    }
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
        },
    };
    const ctx = document.getElementById(`chart${id}`).getContext('2d');
    const myChart = new Chart(ctx, config)
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