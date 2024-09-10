import {setLeaderboard, setTopClanAttempts} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {$, get, groupBy, groupByKey, set, sortByKey} from "../utils/commonUtils";
import {collapseEventDesc, getCurrentLevel, removeLeaderboard, setClickableLevels, setTimer} from "../utils/eventUtils";
import {getEventBattles} from "../battles";
import {doGet} from "../utils/networkUtils";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";
import {getSpoiler} from "../templates";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("auto_send_rogues_event", "Send battles from the rogue event to the service automatically", "Отправлять бои из разбойничьего ивента в сервис автоматически", "Відправляти бої з розбійницького івента у сервіс автоматично"))
    texts.addText(new LocalizedText("only_clan_visibility", "My battles are only available to the clan", "Мои бои доступны только для клана", "Мої бої доступні лише для клану"))
    texts.addText(new LocalizedText("collapse_event_desc", "Always collapse fight descriptions", "Всегда сворачивать описания боев", "Завжди згортати описи боїв"))
    texts.addText(new LocalizedText("hide_rogues_event_enemies", "Show price statistics", "Показывать статистику цен", "Показувати статистику цін"))
    texts.addText(new LocalizedText("return_to_prev_level", "Return to an unfinished level", "Возвращать на незавершенный уровень", "Повертати на незавершений рівень"))
    texts.addText(new LocalizedText("bought", "bought", "куплено", "куплено"))
    texts.addText(new LocalizedText("sold", "sold", "продано", "продано"))
    texts.addText(new LocalizedText("trade_for", "for", "по", "по"))
    texts.addText(new LocalizedText("hire_all", "Recruit all", "Нанять всех", "Найняти всіх"))
    texts.addText(new LocalizedText("trade_history", "Trade history", "История покупок и продаж", "Історія покупок та продажів"))
    texts.addText(new LocalizedText("show_event_timer", "Show time until the end of the event", "Показывать время до конца ивента", "Показувати час до кінця івента"))
    texts.addText(new LocalizedText("show_top_clan_attempts", "Show remaining attempts for TOP3 clans", "Показывать оставшиеся попытки у ТОП3 кланов", "Показувати спроби, що залишилися, у ТОП3 кланів"))
    texts.addText(new LocalizedText("hire_hint", "Red means higher prices, while green means the opposite. At this event, the cost of a creature can only be within + -15% of the initial cost. Thus, if 115% is written next to the price, it will no longer rise upwards, and if the price is 85%, then it will no longer fall either.",
        "Красный цвет значит подорожание, а зеленый наоборот. На этом ивенте цена существа может находиться только в пределах +-15% от изначальной стоимости. Таким образом, если рядом с ценой написано 115%, она больше расти вверх не будет, а если цена 85%, то падать больше не будет тоже.",
        "Червоний колір означає подорожчання, а зелений – навпаки. На цьому івенті ціна істоти може бути лише в межах +-15% від початкової вартості. Таким чином, якщо поряд з ціною написано 115%, вона більше не зростатиме, а якщо ціна 85%, то падати більше не буде теж."))

    return texts
}

let allTexts = getAllTexts()


export default function hireEvent() {
    if (location.href.includes("naym_event.")) {
        // addFilteringArea()
        // processFilters()
        removeLeaderboard()
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("center")).at(-1))
        if (get("show_top_clan_attempts", true)) {
            setTopClanAttempts(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("table")).at(-1))
        }
        eventHelperSettings(Array.from(document.querySelectorAll(".global_container_block")).at(-1).firstChild, (container) => {
            setSettings("auto_send_rogues_event", allTexts.get("auto_send_rogues_event"), container)
            setSettings("only_clan_visibility", allTexts.get("only_clan_visibility"), container, false)
            setSettings("collapse_event_desc", allTexts.get("collapse_event_desc"), container, false)
            setSettings("hide_rogues_event_enemies", allTexts.get("hide_rogues_event_enemies"), container)
            setSettings("return_to_prev_level", allTexts.get("return_to_prev_level"), container, false)
            setSettings("show_top_clan_attempts", allTexts.get("show_top_clan_attempts"), container)
            setSettings("show_event_timer", allTexts.get("show_event_timer"), container)
        }, "afterbegin")
        set("eh_current_level", null)
        if (get("show_event_timer", true)) {
            setTimer(document.querySelector(".global_container_block_header"))
        }
        collapseEventDesc()
        setClickableLevels()
        getEventBattles(Array.from(document.querySelectorAll(".global_container_block")).at(-2), "getRoguesEventBattles", 1)
        interceptButtons()
    }
    if (location.href.includes("naym_event_set")) {
        if (get("show_event_timer", true)) {
            setTimer(document.querySelector(".global_container_block_header"))
        }
        // Array.from(document.querySelectorAll(".hwm_event_block_header")).at(-1).insertAdjacentHTML("beforeend", `
        //     <div class="hwm_event_block_miniheader">${allTexts.get("hire_hint")}</div>
        // `)


        let buy_history = get("buy_history", [])
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


        setTotalPrice()
        initHireAll()
        setListeners()
        showBuyHistory()
        setInterval(() => {
            if (!$("set_check")) {
                setListeners()
                showPriceChange()
                showBuyHistory()
                initHireAll()
            }
        }, 100)

        function initHireAll() {
            let availableSilver = document.querySelector("#ne_set_points_now").innerText.replaceAll(",", "") - 0
            Array.from(document.querySelectorAll("#ne_set_troops_on_market > .hwm_event_set_stack_block"))
                .filter(elem => elem.innerHTML.includes("cre_creature"))
                .forEach((elem, index) => {
                    elem.style.padding = "unset"
                    let submit = elem.querySelector("div[id^=ne_set_button] > a")
                    let newSubmit = elem.querySelector("div[id^=hire_all]")
                    console.log("here")
                    if (submit && !newSubmit) {
                        console.log("here2")
                        let name = elem.innerHTML.match(/army_info\.php\?name=([a-zA-Z0-9_-]+)/)[1]
                        let price = parseInt(elem.innerText.match(/(?:Цена|Price): (\d{1,6})/)[1].replaceAll(",", ""))
                        let maxAmount = elem.querySelector("select > option:last-child").value - 0

                        // let currentAmount = 0
                        //
                        // let currentHire = Array.from(document.querySelectorAll("#ne_set_current_army > div"))
                        //     .filter(elem => elem.innerHTML.includes("cre_creature"))
                        //     .filter(elem => elem.innerHTML.includes(`=${name}"`))
                        // if (currentHire.length > 0) {
                        //     currentAmount = parseInt(currentHire[0].querySelector(".cre_creature").innerText)
                        // }

                        let possibleAmount = maxAmount/* - currentAmount*/
                        possibleAmount = Math.min(Math.floor(availableSilver / price), possibleAmount)

                        submit.parentElement.insertAdjacentHTML("afterend", `
                            <div id="hire_all_${index}" class="home_button2 btn_hover2" onclick="document.getElementById('ne_set_select_'+${index+1}).value = ${possibleAmount}; ne_set_js_send_buy_mid('${name}', ${index+1});return false;">
                                ${allTexts.get("hire_all")}
                            </div>
                        `)

                        submit.parentElement.style.margin = "unset"
                        submit.parentElement.style.marginTop = "unset"
                        submit.parentElement.parentElement.style.width = "unset"
                        submit.parentElement.parentElement.style.display = "flex"
                        submit.parentElement.parentElement.previousElementSibling.style.display = "inline-block"
                        submit.parentElement.parentElement.parentElement.style.margin = "unset"
                        submit.parentElement.parentElement.parentElement.style.width = "unset"
                    }
                })
        }

        function drawChart(prices, index, elem) {
            elem.insertAdjacentHTML("afterend", `
                    <tr>
                        <td colspan="3">
                            <div style="height: 165px; overflow: hidden">
                                <canvas id="chart${index}" height="150" style="width: 100%"></canvas>
                            </div>
                        </td>
                    </tr>`)

            function padTo2Digits(num) {
                return num.toString().padStart(2, '0');
            }

            function formatDate(date) {
                return (
                    [
                        padTo2Digits(date.getHours()),
                        "00"
                    ].join(':') +
                    ' ' +
                    [
                        padTo2Digits(date.getDate()),
                        date.toLocaleString('default', {month: 'long'})
                    ].join('-')
                );
            }

            let date = new Date(1725499234000)
            const labels = prices.map(() => {
                let label = formatDate(date)
                date.setHours(date.getHours() + 1)
                return label
            })
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Price',
                        data: prices.map(price => parseInt(price)),
                        borderColor: "rgb(100,100,100)",
                        backgroundColor: "rgb(116,152,168)",
                        pointStyle: 'circle',
                        pointRadius: 1.5,
                        pointHoverRadius: 5
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
                            },
                            grid: {
                                display: false
                            }
                        },
                        y: {
                            grid: {
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
            const ctx = document.getElementById(`chart${index}`).getContext('2d');
            const myChart = new Chart(ctx, config)
        }

        async function showPriceChange() {
            let doc = await doGet(`getRoguesCreaturesPrices`, false)
            Array.from(document.querySelector("#ne_set_troops_on_market").querySelectorAll(".hwm_event_set_stack_block"))
                .filter(elem => elem.innerHTML.includes("cre_creature"))
                .forEach((elem, index) => {
                    let creatureName = elem.innerHTML.match(/name=([a-zA-Z0-9]+)/)[1]
                    let prices = doc[creatureName].map(price => price - 0)
                    let priceElem = elem.querySelectorAll(".txt_with_icons")[1]
                    if (prices[prices.length - 1] - 0 > prices[prices.length - 2] - 0) {
                        elem.style.background = "#ff9e9e"
                    } else if (prices[prices.length - 1] - 0 < prices[prices.length - 2] - 0) {
                        elem.style.background = "#9eff98"
                    }
                    priceElem.insertAdjacentHTML("beforeend", ` (${Math.round(prices.at(-1) / prices[0] * 100)}%)`)
                    Array.from(elem.querySelectorAll('input[type="submit"]'))
                        .forEach(input => {
                            input.classList.add("btn_hover2", "home_button2")
                        })
                    if (get("hide_rogues_event_enemies", true)) {
                        drawChart(prices, index, elem)
                    }
                })
        }

        function showBuyHistory() {
            if (buy_history.length > 0) {
                let rows = groupBy(sortByKey(buy_history, "time").reverse(), "name")
                    .reduce((result, currCreatureList) => {
                        return result + `
                            <div style="display: flex; justify-content: space-evenly;align-items: center;padding: 0" class="hwm_event_set_stack_block">
                                ${getSpoiler(currCreatureList[0].name, "", `
                                    <div style="width: 40px">
                                        <img src="https://cfcdn.lordswm.com/i/portraits/${currCreatureList[0].name}anip33.png" style="height: 48px; width: 48px; border-radius: 50%; object-fit: cover;" alt="">
                                    </div>
                                `,
                            currCreatureList.reduce((prev, curr) => {
                                return prev + `
                                        <div style="display: flex; justify-content: space-evenly;align-items: center;padding: 0" class="hwm_event_set_stack_block">
                                            <div>
                                                ${new Date(curr.time).toLocaleTimeString()}
                                            </div>
                                            <div>
                                                ${curr.action === "buy" ? `<p style='color: green'>${allTexts.get("bought")}</p>` : `<p style='color: red'>${allTexts.get("sold")}</p>`}
                                            </div>
                                            <div>
                                                ${curr.count}
                                            </div>
                                            <div>
                                                <div style="width: 40px"><img src="https://cfcdn.lordswm.com/i/portraits/${curr.name}anip33.png" style="height: 48px; width: 48px; border-radius: 50%; object-fit: cover;" alt=""></div>
                                            </div>
                                            <div>
                                                ${allTexts.get("trade_for")} ${curr.price}
                                            </div>
                                        </div>
                                    `
                            }, ""),
                            "roguesSpoilerWrapper", "roguesSpoilerLabel")}
                            </div>
                        `
                    }, "")


                document.querySelector("#ne_set_available_troops")
                    .insertAdjacentHTML("beforeend", `
                    <div style="display: flex; flex-direction: column">
                     <div style="text-align: center"><h3>${allTexts.get("trade_history")}</h3></div>
                     ${rows}
                    </div>
                `)
            }
        }

        function setTotalPrice() {
            let totalPrice = Array.from(document.querySelector("#ne_set_available_troops").querySelectorAll(".hwm_event_set_stack_block"))
                .map(elem => {
                    return parseInt(Array.from(elem.querySelectorAll(".txt_with_icons.hwm_ne_event_img_q")).at(-1).innerText.replace(",", ""))
                })
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
                .toLocaleString()
            document.querySelector("#ne_set_now_power").insertAdjacentHTML("afterend", `
              <span id="ne_set_now_power" class="txt_with_icons hwm_ne_event_img_q" style="font-weight: bold; background-image: url('https://dcdn.heroeswm.ru/i/adv_ev_silver48.png')">${totalPrice}</span>
        `)
        }

        function setListeners() {
            document.querySelector("#ne_set_available_troops").insertAdjacentHTML("beforeend", `<div id="set_check"><div>`)

            Array.from(document.querySelector("#ne_set_available_troops").children)
                .filter(elem => elem.innerHTML.includes("cre_creature"))
                .forEach((elem, index) => {
                    let creatureName = elem.innerHTML.match(/\?name=([a-zA-Z0-9_-]+)/)[1]
                    let creatureCount = elem.querySelector(".cre_amount").innerText - 0
                    let creatureHistory = groupByKey(sortByKey(buy_history, "time").reverse(), "name")[creatureName] ?? []
                    let recentPurchases = [];
                    creatureHistory.some((item) => {
                        if ("sell" === item.action) {
                            return true;
                        } else {
                            recentPurchases.push(item);
                        }
                    });
                    let [totalCount, totalPrice] = recentPurchases.reduce(([resultCount, resultPrice], currentPurchase) => {
                        return [
                            resultCount + currentPurchase["count"],
                            resultPrice + currentPurchase["count"] * currentPurchase["price"]
                        ]
                    }, [0, 0])
                    let target = Array.from(elem.querySelectorAll(".txt_with_icons.hwm_ne_event_img_q")).at(-1)
                    if (totalPrice !== 0) {
                        let currentPriceElement = target.firstChild
                        let currentPrice = currentPriceElement.innerText.replace(",", "") - 0
                        if (totalCount === creatureCount) {
                            if (currentPrice > totalPrice) {
                                currentPriceElement.style.color = "green"
                            } else if (currentPrice < totalPrice) {
                                currentPriceElement.style.color = "red"
                            }
                        }

                        target.insertAdjacentHTML("beforeend", `
                            ${allTexts.get("bought")} ${totalCount} ${allTexts.get("trade_for")} ${totalPrice}
                        `)
                    }

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
            Array.from(document.querySelector("#ne_set_troops_on_market").querySelectorAll(".hwm_event_set_stack_block"))
                .filter(elem => elem.innerHTML.includes("cre_creature"))
                .forEach((elem, index) => {
                    let submit = elem.querySelector("div[id^=ne_set_button]")


                    if (submit) {
                        let submit_a = submit.querySelector("a")
                        submit.addEventListener("click", () => {
                            let data = submit_a["onclick"].toString()
                            let findings = data.match(/'([a-zA-Z0-9_-]+)', (\d{1,5})\)/)

                            let price = parseInt(elem.querySelector("input[id^=ne_set_market_price]").value)
                            let count = parseInt(elem.querySelector("select[name=cnt]").value)
                            let name = findings[1]
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
        }

    }

    function interceptButtons() {
        let buttons = Array.from(document.querySelectorAll('input[id^=ne_attack_button]'))
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