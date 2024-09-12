import {doGet} from "./utils/networkUtils";
import {$, cdnHost} from "./utils/commonUtils";
import {LocalizedText, LocalizedTextMap} from "./utils/localizationUtils";

let TOP_CLANS = ["1519", "928", "104", "1597", "1209", "18", "41", "5152", "88", "326", "8502", "73", "7777", "302", "823",
    "17", "997", "276", "249", "1512", "9426", "10557", "2304", "14", "11532", "10886", "846", "3305", "8433",
    "1488"]

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("top_heroes", "Top heroes", "Лучшие игроки", "Найкращі гравці"))
    texts.addText(new LocalizedText("top_battles", "Top battles by ", "Лучшие бои по ", "Найкращі бої по "))
    texts.addText(new LocalizedText("top_clans", "Top clans", "Лучшие кланы", "Найкращі клани"))
    texts.addText(new LocalizedText("attempts_left", "Attempts left", "Оставшиеся попытки", "Залишилось спроб"))
    texts.addText(new LocalizedText("progression", "Score progression", "Прогрессия очков", "Прогресія очок"))

    return texts
}

let allTexts = getAllTexts()

export async function setTopBattles() {
    let topBattles = await doGet(`getTopBattleScores`)
    let result = topBattles.map((battle, index) => {
        return `
                <div style="display: flex; justify-content: space-between; padding: 1px; font-size: smaller">
                    <span style="display: inline-block">${index + 1}.</span>
                    <span style="display: inline-block; text-align: center">
                        <a href="/clan_info.php?id=${battle["clan_id"]}">
                        <img style="height: 15px; vertical-align: bottom" src="https://${cdnHost}/i_clans/l_${battle["clan_id"]}.gif?1805" alt=""></a>
                         
                        <a href="/pl_info.php?id=${battle["member_id"]}" style="text-decoration: none; font-size: 9px">${battle["member_name"]}</a>
                         [${battle["member_cl"]}]
                    </span>
                    <span style="display: inline-block">${battle["score"]}</span>
                </div>`
    }).join("")
    $(`top_heroes_container`).insertAdjacentHTML("afterend",
        `<br><div style="display: flex; flex-direction: column" id="top_battles_container">
        <b style="user-select: none; text-align: center;">${allTexts.get("top_battles")}<img src="https://${cdnHost}/i/adv_ev_silver48.png" style="height: 16px; vertical-align: bottom"></b>${result}</div><br>`)
}

export async function setLeaderboard(where, position = "afterbegin", withClan = false, showStat = false, showStatWhere = document.querySelectorAll(".global_container_block")[1]) {
    window.showProgression = showProgression
    let isLeaderboardExpanded = false
    let topHeroes = await doGet(`getTopScoresV2`)
    where.insertAdjacentHTML(position,
        `<div style="display: flex; flex-direction: column; flex: 1 1 0;" id="top_heroes_container"></div>`)
    resetLeaderboard(showStat)
    if (showStat) {
        let newScript = document.createElement('script');
        newScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js');
        document.head.appendChild(newScript);

        showStatWhere
            .insertAdjacentHTML("afterend", `
                <div id="chart_area" class="global_container_block" style="display: none; width: 100%"></div>
            `)
    }
    if (withClan) {
        let topClans = await doGet(`getTopClanScores`)
        let result = topClans.reduce((prev, curr, index) => {
            return prev + getTopClanTemplate(curr, index)
        }, "")
        where.insertAdjacentHTML(position,
            `<div style="display: flex; flex-direction: column" id="top_clans_container">
            <b style="user-select: none; text-align: center;">${allTexts.get("top_clans")}</b>${result}
            </div>`)
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
                <div class="leaderboard-hero-record">
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
                                <div style="height: 165px; overflow: hidden; width: 100%">
                                <div>${allTexts.get("progression")} <b>${name}</b></div>
                                    <canvas id="chart${id}" style="width: 100%; height: 150px"></canvas>
                                </div>
                            `
    let heroData = await doGet(`getDunHeroData?pl_id=${id}`)
    let newData = []
    for (let i = 0; i < heroData.length; i++) {
        if (i > 0) {
            if (heroData[i][1] + newData.at(-1)[1] === 0) {
                newData.pop()
                continue
            }
        }
        newData.push(heroData[i])
    }
    heroData = newData.filter((entry, index) => {
        if (index > 0) {
            if (entry[1] > newData[index - 1][1] * 4) {
                return false
            }
        }
        return true
    })

    const cumulativeSum = (sum => value => sum += value)(0);

    const labels = heroData.map((entry, index) =>  `Бой №${index+1}: ${entry[0]} ${entry[1] > 0 ? "+" : ""}${entry[1]}`);
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Сумма очков',
                data: heroData.map(entry => entry[1]).map(cumulativeSum),
                borderColor: "blue",
                backgroundColor: "rgb(44,73,107)",
                pointStyle: 'circle',
                pointRadius: 1.5,
                pointHoverRadius: 2,
                yAxisID: 'y',
            },
            {
                label: 'Очки за бой',
                data: heroData.map(entry => entry[1]),
                borderColor: "green",
                backgroundColor: "rgb(44,107,69)",
                pointStyle: 'circle',
                pointRadius: 1.5,
                pointHoverRadius: 2,
                yAxisID: 'y1',
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
                    display: false,
                    ticks: {
                        display: false
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: 'blue'
                    },
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: 'green'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
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
    Array.from(where.querySelectorAll("tr")).filter(tr => tr.innerText !== "...").forEach(clanElem => {
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