import {setLeaderboard} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {$, get, set, sortByKey} from "../utils/commonUtils";
import {collapseEventDesc, getCurrentLevel} from "../utils/eventUtils";
import {getEventBattles} from "../battles";
import {doGet} from "../utils/networkUtils";

export default function hireEvent() {
    if (location.href.includes("naym_event.")) {
        // addFilteringArea()
        // processFilters()
        setLeaderboard(Array.from(document.querySelectorAll('[align="left"][valign="top"]')[0].getElementsByTagName("center")).slice(-1)[0])
        eventHelperSettings(document.querySelector('.Global'), (container) => {
            setSettings("auto_send_rogues_event", "Отправлять бои из разбойничьего ивента в сервис автоматически", container)
            setSettings("only_clan_visibility", "Мои бои доступны только для клана", container, false)
            setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false)
            setSettings("hide_rogues_event_enemies", "Показывать статистику цен", container)
            setSettings("return_to_prev_level", "Возвращать на незавершенный уровень", container, false)
        }, "afterend")
        set("eh_current_level", null)
        collapseEventDesc()
        interceptButtons()
        getEventBattles(document.querySelector(".Global").parentElement, "getRoguesEventBattles", 1)
    }
    if (location.href.includes("naym_event_set")) {
        let buy_history = get("buy_history", [])

        Array.from(Array.from(document.querySelectorAll('td[class="wbwhite"][valign="top"]')).slice(-2, -1)[0].getElementsByTagName("tr"))
            .filter(elem => elem.innerHTML.includes("cre_creature"))
            .forEach((elem, index) => {
                let submit = elem.querySelector("input[type=submit]")
                if (submit) {
                    let data = submit["onclick"].toString()
                    let findings = data.match(/(\d{1,5}), '([a-zA-Z0-9_-]+)', '(\d{0,3},?\d{1,3})', (\d{1,5})\)/)


                    let price = parseInt(findings[4].replace(",", ""))
                    let count = parseInt(findings[1])
                    let name = findings[2]
                    let time = Date.now()


                    submit.addEventListener("click", () => {
                        buy_history.push({
                            "name": name,
                            "price": price,
                            "count": count,
                            "time": time,
                            "action": "sell"
                        })
                        set("buy_history", buy_history.filter(elem => Date.now() - elem.time < 86400 * 14 * 1000))
                    })
                }
            })
        Array.from(Array.from(document.querySelectorAll('td[class="wbwhite"][valign="top"]')).slice(-1)[0].getElementsByTagName("tr"))
            .filter(elem => elem.innerHTML.includes("cre_creature"))
            .forEach((elem, index) => {
                let submit = elem.querySelector("input[type=submit]")

                if (submit) {
                    submit.addEventListener("click", () => {
                        let form = elem.querySelector("form")

                        let price = parseInt(form.querySelector("input[name=price]").value)
                        let count = parseInt(form.querySelector("select[name=cnt]").value)
                        let name = form.querySelector("input[name=mid]").value
                        let time = Date.now()
                        buy_history.push({
                            "name": name,
                            "price": price,
                            "count": count,
                            "time": time,
                            "action": "buy"
                        })
                        set("buy_history", buy_history.filter(elem => Date.now() - elem.time < 86400 * 14 * 1000))
                    })
                }
            })


                function drawChart(prices, index, elem) {
            elem.insertAdjacentHTML("afterend", `
                    <tr>
                        <td colspan="3">
                            <div style="height: 130px; overflow: hidden">
                                <canvas id="chart${index}" height="150" style="width: 100%"></canvas>
                            </div>
                        </td>
                    </tr>`)
            const labels = Array.from(' '.repeat(prices.length));
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Price',
                        data: prices.map(price=>parseInt(price)),
                        borderColor: "blue",
                        backgroundColor: "rgb(44,73,107)",
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
                        },
                        point: {
                            radius: 1
                        }
                    }
                },
            };
            const ctx = document.getElementById(`chart${index}`).getContext('2d');
            const myChart = new Chart(ctx, config)
        }

        function showPriceChange() {
            doGet(`getRoguesCreaturesPrices`, doc => {

                Array.from(Array.from(document.querySelectorAll('td[class="wbwhite"][valign="top"]')).slice(-1)[0].getElementsByTagName("tr"))
                    .filter(elem => elem.innerHTML.includes("cre_creature"))
                    .forEach((elem, index) => {
                        let creatureName = elem.innerHTML.match(/name=([a-zA-Z0-9]+)/)[1]
                        let prices = doc[creatureName].map(price => price - 0)
                        let priceElem = elem.querySelector(".txt_with_icons")
                        if (prices[prices.length - 1] > prices[prices.length - 2]) {
                            elem.style.background = "#ff9e9e"
                        } else if (prices[prices.length - 1] < prices[prices.length - 2]) {
                            elem.style.background = "#9eff98"
                        }
                        priceElem.insertAdjacentHTML("beforeend", ` (${(prices[prices.length - 1] / Math.max(...prices) * 100).toFixed()}%)`)
                        Array.from(elem.querySelectorAll('input[type="submit"]'))
                            .forEach(input => {
                                input.classList.add("btn_hover2", "home_button2")
                            })
                        if (get("hide_rogues_event_enemies", true)) {
                            drawChart(prices, index, elem)
                        }
                    })

            }, false)
        }

        if (get("hide_rogues_event_enemies", true)) {
            let newScript = document.createElement('script');
            newScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js');
            document.head.appendChild(newScript);

            newScript.onload = () => {
                showPriceChange()
            }
        } else {
            showPriceChange()
        }

        if (buy_history.length > 0) {
            let rows = sortByKey(buy_history, "time").reverse().reduce((prev, curr) => {
                return prev +  `
                    <div style="display: flex; justify-content: space-evenly;
    align-items: center;
    border: 1px solid #000000;">
                        <div>   
                            ${new Date(curr.time).toLocaleTimeString()}
                        </div>
                        <div>
                            ${curr.action === "buy" ? "<p style='color: green'>куплено</p>" : "<p style='color: red'>продано</p>"}
                        </div>
                        <div>
                            ${curr.count}
                        </div>
                        <div>
                            <div style="width: 40px"><img src="https://cfcdn.lordswm.com/i/portraits/${curr.name}anip33.png" style="height: 48px; width: 48px; border-radius: 50%; object-fit: cover;"></div>
                        </div>
                        <div>
                            по ${curr.price}
                        </div>
                    </div>
                `
            }, "")
            Array.from(document.querySelectorAll('td[class="wbwhite"][valign="top"]')).slice(-2, -1)[0]
                .insertAdjacentHTML("beforeend", `
                    <div style="display: flex; flex-direction: column">
                     <div><h3>История покупок и продаж</h3></div>
                     ${rows}
                    </div>
                `)
        }
    }

    function interceptButtons() {
        let buttons = Array.from(document.querySelector(".TextBlock.TextBlockBOTTOM").querySelectorAll("#close-image"))
        if (buttons.length === 2) {
            let available = 2 - buttons.filter(x => x.disabled).length
            buttons.forEach((button, index) => {
                button.addEventListener("mousedown", () => {
                    set("event_battle_side", index % 2)
                    set("eh_current_level", [getCurrentLevel(), available])
                })
            })
        }
    }
}