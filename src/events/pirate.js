import {get, set, sortByKey} from "../utils/commonUtils";
import {setLeaderboard} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {doGet} from "../utils/networkUtils";

export default function pirateEvent() {
    if (location.href.includes("pirate_event.")) {
        let trs = document.querySelectorAll("#tableDiv")[2].querySelector("table > tbody").childNodes;
        let items = [];
        for (let i = 1; i < trs.length; i++) {
            let item_info = {};
            item_info.name = trs[i].querySelector("td:nth-child(1) > img").src;
            item_info.weight = trs[i].querySelector("td:nth-child(2)").innerText - 0;
            item_info.buy_price = trs[i].querySelector("td:nth-child(3) table > tbody > tr > td:nth-child(2)").innerText.replace(/,/g, "") - 0;
            item_info.sell_price = trs[i].querySelector("td:nth-child(4) table > tbody > tr > td:nth-child(2)").innerText.replace(/,/g, "") - 0;
            item_info.buy_form = trs[i].querySelector("td:nth-child(5)").innerHTML;
            item_info.opt_price = (item_info.sell_price - item_info.buy_price) / item_info.weight;
            if (item_info.buy_form.toString().length > 100) {
                items.push(item_info)
            }
        }
        items = sortByKey(items, "opt_price").reverse();
        let template = getPirateEventTemplate(items);
        let target_td = document.querySelectorAll("#tableDiv")[2];
        target_td.removeChild(target_td.childNodes[0]);
        target_td.insertAdjacentHTML("beforeend", template);
    }

    function getPirateEventTemplate(items) {
        let final_str = `
                <style>
                    .items-container {
                        display: flex;
                        flex-direction: column;
                    }
                    .items-row {
                        display: flex;
                    }
                    .item-itself {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .item-itself:nth-child(1) {
                        width: 15%;
                    }
                    .item-itself:nth-child(2) {
                        width: 20%;
                    }
                    .item-itself:nth-child(3) {
                        width: 11%;
                    }
                    .item-itself:nth-child(4) {
                        width: 27%;
                    }
                    .item-itself:nth-child(5) {
                        width: 27%;
                    }
    
                </style>
                <div class="items-container">
                    <div class="items-row">
                        <div class="item-itself">Товар</div>
                        <div class="item-itself">Прибыль</div>
                        <div class="item-itself">Вес</div>
                        <div class="item-itself">Цены</div>
                        <div class="item-itself">Купить</div>
                    </div>`;
        items.forEach(item => {
            final_str += `
                    <div class="items-row">
                        <div class="item-itself"><img src="${item.name}" height="48" alt="icon"></div>
                        <div class="item-itself">${item.opt_price.toFixed(2)}</div>
                        <div class="item-itself">${item.weight}</div>
                        <div class="item-itself">${item.buy_price}->${item.sell_price}</div>
                        <div class="item-itself">${item.buy_form.toString().replaceAll("Погрузить", "Купить")}</div>
                    </div>`;
        })

        return final_str + `</div>`;
    }

    if (location.href.includes("pirate_self_event.")) {
        setLeaderboard(Array.from(document.querySelectorAll('table[width="100%"][align="left"]')).slice(-1)[0].previousElementSibling)
    }

    if (location.href.includes("pirate_land")) {
        document.querySelector("input[type=submit]").click()
    }

    if (location.href.includes("pirate_self_event_set")) {


        eventHelperSettings(document.querySelector(".pirate_self_top_block"), (container) => {
            setSettings("hide_solo_pirate_event_enemies", "Показывать статистику цен", container, false)
        }, "beforeend")
        if (get("hide_solo_pirate_event_enemies", true)) {
            let newScript = document.createElement('script');
            newScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/chart.js');
            document.head.appendChild(newScript);

            newScript.onload = async () => {
                document.querySelector("#global_table_div2").style.overflow = "auto"
                document.querySelector("#global_table_div2").style.overflowX = "hidden"
                document.querySelector("#global_table_div2").style.maxHeight = "60vh"

                let doc = await doGet(`getSoloPirateCreaturesPrices`)
                document.querySelector("#global_table_div2").setAttribute("style", "")
                document.querySelector("#global_table_div2 > .global_table_bg_color").style.height = ""
                document.querySelector("#global_table_div2 > .global_table_bg_color > table").style.position = ""

                Array.from(document.getElementsByClassName("pirate_self_table_padding")[1].getElementsByTagName("tr"))
                    .filter(elem => elem.innerHTML.includes("cre_creature"))
                    .forEach((elem, index) => {
                        let creatureName = elem.innerHTML.match(/name=([a-zA-Z0-9]+)/)[1]
                        let prices = doc[creatureName]
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
                                    data: prices.map(price => parseInt(price)),
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
                    })
            }
        }

        let buy_history = get("buy_history", [])

        Array.from(document.querySelector(".pirate_self_recruit_block_outside").children[0].getElementsByTagName("tr"))
            .filter(elem => elem.innerHTML.includes("cre_creature"))
            .forEach((elem, index) => {
                let submit = elem.querySelector("div[onclick^=javascript]")
                if (submit) {

                    let findings = submit["onclick"].toString().match(/(\d{1,5}), '([a-zA-Z0-9_-]+)', '(\d{0,3},?\d{1,3})', (\d{1,5})\)/)


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
        Array.from(document.querySelector(".pirate_self_recruit_block_outside").children[1].getElementsByTagName("tr"))
            .filter(elem => elem.innerHTML.includes("cre_creature"))
            .forEach((elem, index) => {
                let submit = elem.querySelector("div[id^=but]")
                if (submit) {
                    submit.addEventListener("click", () => {
                        let price = parseInt(submit.getAttribute("buystr").match(/price=(\d{1,6})/)[1])
                        let tempCount = submit.getAttribute("cnt")
                        let count = tempCount ? parseInt(submit.getAttribute("cnt")) : 1
                        let name = submit.getAttribute("buystr").match(/mid=([a-zA-Z0-9_-]+)/)[1]
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
        if (buy_history.length > 0) {
            let rows = sortByKey(buy_history, "time").reverse().reduce((prev, curr) => {
                return prev + `
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
            document.querySelector(".pirate_self_recruit_block_outside").children[0]
                .insertAdjacentHTML("beforeend", `
                    <div style="display: flex; flex-direction: column">
                     <div><h3>История покупок и продаж</h3></div>
                     ${rows}
                    </div>
                `)
        }
    }
}