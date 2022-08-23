import {setLeaderboard} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {get, set} from "../utils/commonUtils";
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
        function drawChart(prices, index, elem) {
            elem.insertAdjacentHTML("afterend", `
                    <tr>
                        <td colspan="3">
                            <div style="height: 100px; overflow: hidden">
                                <div id="chart${index}"></div>
                            </div>
                        </td>
                    </tr>`)
            let options = {
                series: [{
                    name: "Price",
                    data: prices
                }],
                chart: {
                    height: 128,
                    width: 480,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight',
                    width: 2
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: Array.from(' '.repeat(prices.length)),
                },
                yaxis: [
                    {
                        labels: {
                            formatter: function (val) {
                                return val.toFixed(0);
                            }
                        }
                    }
                ]
            };
            let chart = new ApexCharts($(`chart${index}`), options);
            chart.render();
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
            newScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/apexcharts');
            document.head.appendChild(newScript);

            newScript.onload = () => {
                showPriceChange()
            }
        } else {
            showPriceChange()
        }
    }

    function interceptButtons() {
        let buttons = Array.from(document.querySelectorAll("#close-image"))
        if (buttons.length === 2) {
            let available = 2 - buttons.filter(x => x.disabled).length
            buttons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    set("event_battle_side", index % 2)
                    set("eh_current_level", [getCurrentLevel(), available])
                })
            })
        }
    }
}