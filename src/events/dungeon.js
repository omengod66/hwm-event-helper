import {doGet} from "../utils/networkUtils";
import {$} from "../utils/commonUtils";

export default async function dungeonEvent() {
    if (/recruit_event/.test(location.href)) {
        let topHeroes = await doGet(`heroes/dun_scores.json`)
        let heroesTable = document.querySelector(".recruit_event_loot_rating_inside").querySelector("table")
        let firstTr = heroesTable.querySelector("tr")
        let highestPlace = parseInt(firstTr.querySelector("td").innerText)

        let heroesToRenderCount = Math.min(20, highestPlace - 1)

        let heroesToRender = topHeroes.slice(0, heroesToRenderCount)
        firstTr.insertAdjacentHTML("beforebegin", heroesToRender.join(""))

        let newScript = document.createElement('script');
        newScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js');
        document.head.appendChild(newScript);


        let CLANS = ["1519", "928", "104", "1597", "1209", "18", "41", "5152", "88", "326", "8502", "73", "7777", "302", "823",
            "17", "997", "276", "249", "1512", "9426", "10557", "2304", "14", "11532", "10886", "846", "3305", "8433",
            "1488"]

        document.querySelector(".recruit_event_army_attack_inside")
            .insertAdjacentHTML("beforeend", `
            <div id="chart_area"></div>
            `)

        Array.from(heroesTable.querySelectorAll("tr"))
            .forEach((tr, index) => {
                let clanMatch = tr.innerHTML.match(/clan_info\.php\?id=(\d{1,5})/)
                if (clanMatch) {
                    let clanId = clanMatch[1]
                    if (CLANS.includes(clanId)) {
                        let hero_id = tr.innerHTML.match(/pl_info\.php\?id=(\d{1,10})/)[1]
                        let hero_nick = tr.querySelector("td:nth-child(2)").innerText
                        let scoreTd = tr.querySelector("td:nth-child(3)")
                        scoreTd.innerHTML = `
                         <b style="font-size: 10px; text-decoration: underline; cursor: pointer" id="top_hero${index}">
                            ${scoreTd.innerText}
                         </b>
                        `
                        $(`top_hero${index}`).addEventListener("click", async () => {
                            $(`chart_area`).innerHTML = `
                                <div style="height: 150px; overflow: hidden">
                                <div>Прогрессия очков <b>${hero_nick}</b></div>
                                    <canvas id="chart${index}" height="150" style="width: 100%"></canvas>
                                </div>
                            `
                            let heroData = await doGet(`getDunHeroData?pl_id=${hero_id}`)
                            const cumulativeSum = (sum => value => sum += value)(0);

                            const labels = heroData.map(entry => entry[0]);
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
                                    }
                                },
                            };
                            const ctx = document.getElementById(`chart${index}`).getContext('2d');
                            const myChart = new Chart(ctx, config)
                        })
                    }
                }
            })

    }
}