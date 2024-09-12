import {$, arrayToMapByKey, findAll, get, groupByKey, my_sign, set, sortByKey} from "../utils/commonUtils";
import {setLeaderboard, setTopBattles, setTopClanAttempts} from "../leaderboard";
import {eventHelperSettings, setSettings} from "../settings";
import {doGet, doPost} from "../utils/networkUtils";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";
import {setTimer} from "../utils/eventUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("item", "Item", "Товар", "Товар"))
    texts.addText(new LocalizedText("profit", "Profit per 1t.", "Прибыль за 1т.", "Прибуток за 1т."))
    texts.addText(new LocalizedText("weight", "Weight", "Вес", "Вага"))
    texts.addText(new LocalizedText("prices", "Prices", "Цены", "Ціни"))
    texts.addText(new LocalizedText("buy", "Buy", "Купить", "Придбати"))
    texts.addText(new LocalizedText("fill_max", "Load maximum", "Набрать максимум", "Набрати максимум"))
    texts.addText(new LocalizedText("hire_all", "Recruit all", "Нанять всех", "Найняти всіх"))
    texts.addText(new LocalizedText("fill_maxoff5", "Load -5 from the maximum", "Набрать -5 от максимума", "Набрати -5 від максимуму"))
    texts.addText(new LocalizedText("fill_process", "Loading in progress", "Идет погрузка", "Триває навантаження"))

    texts.addText(new LocalizedText("auto_return_after_battle", "Auto return after battle", "Автовозврат после боя", "Автоповернення після бою"))
    texts.addText(new LocalizedText("show_autofill_options", "Buttons for fast loading", "Кнопки для быстрой загрузки", "Кнопки для швидкого завантаження"))
    texts.addText(new LocalizedText("sort_products", "Sort products by profit", "Сортировать товары по прибыли", "Сортувати товари за прибутком"))
    texts.addText(new LocalizedText("show_event_timer", "Show time until the end of the event", "Показывать время до конца ивента", "Показувати час до кінця івента"))
    texts.addText(new LocalizedText("show_ship_available_alert", "Notify about new ship", "Уведомлять о новом корабле", "Повідомляти про новий корабель"))
    texts.addText(new LocalizedText("ship_available_alert", "STOP! New ship is available", "СТОЙ! Доступен новый корабль", "СТІЙ! Доступний новий корабель"))

    return texts
}

let allTexts = getAllTexts()


export default async function pirateEvent() {
    if (location.href.includes("pirate_event.")) {
        document.querySelector(".pirate_event_blocks").style.width = "100%"
        document.querySelector("#set_mobile_max_width").style.justifyContent = "center"
        document.querySelector(".global_inside_shadow.pirate_event_picture").remove()
        Array.from(document.querySelectorAll("#tableDiv")).forEach(tdiv => {
            tdiv.style.height = "max-content"
            tdiv.firstChild.style.position = "unset"
        })

        if (get("show_ship_available_alert", true)) {
            let isNewShipAvailable = false
            let newShipButton = Array.from(document.querySelectorAll("input[type='submit']")).filter(input => input.nextElementSibling?.value === "buy_new_ship")
            if (newShipButton.length > 0) {
                isNewShipAvailable = !newShipButton[0].disabled
            }
            let battleButton = Array.from(document.querySelectorAll("input[type='submit']")).filter(input => input.parentElement.previousElementSibling?.value === "go_go_go")[0]
            let isBattleAvailable = !battleButton.disabled
            if (isNewShipAvailable && isBattleAvailable) {
                battleButton.insertAdjacentHTML("beforebegin", `<p><b style="color: red">${allTexts.get("ship_available_alert")}</b></p>`)
                let wasPrank = false
                battleButton.addEventListener("mouseover", () => {
                    if (!wasPrank) {
                        battleButton.style.transform = "translateX(100px)"
                        wasPrank = true
                    }
                })
            }
        }

        if (get("show_event_timer", true)) {
            setTimer(document.querySelector(".global_container_block_header"))
        }

        let tableDiv = document.querySelectorAll("#tableDiv")[2]
        let trs = tableDiv.querySelector("table > tbody").childNodes;
        let items = Array.from(trs)
            .filter(item => item.querySelector("td:nth-child(5)").innerHTML.length > 100)
            .map(item => {
                let item_info = {};
                item_info.name = item.querySelector("td:nth-child(1) > img").src;
                item_info.res_id = item.querySelector(`input[name="res_id"]`).value;
                item_info.weight = item.querySelector("td:nth-child(2)").innerText - 0;
                item_info.buy_price = item.querySelector("td:nth-child(3) table > tbody > tr > td:nth-child(2)").innerText.replace(/,/g, "") - 0;
                item_info.sell_price = item.querySelector("td:nth-child(4) table > tbody > tr > td:nth-child(2)").innerText.replace(/,/g, "") - 0;
                item_info.buy_form = item.querySelector("td:nth-child(5)").innerHTML;
                item_info.profit = item_info.sell_price - item_info.buy_price
                item_info.opt_price = item_info.profit / item_info.weight;
                return item_info
            })
        let itemsMap = arrayToMapByKey(items, "name")
        items = sortByKey(items, "opt_price", -1);
        let template = getPirateEventTemplate(items);
        let target_td = document.querySelectorAll("#tableDiv")[2];
        if (get("sort_products", true)) {
            target_td.removeChild(target_td.childNodes[0]);
            target_td.insertAdjacentHTML("beforeend", template);
        }

        let tonns = findAll(/[- ](\d{1,3}) [tт]\.\n[a-zA-Zа-яА-Я]+: (\d{1,3}) [tт]/, document.querySelectorAll("#tableDiv")[0].querySelector(" table > tbody > tr:nth-child(2) > td").innerText)
        let maxCapacity = tonns[0][1] - 0
        let currentCapacity = tonns[0][2] - 0
        if (currentCapacity === 0 && get("show_autofill_options", true)) {
            target_td.insertAdjacentHTML("beforeend", `
                <div id="fill_container">
                    <div id="fill_result" style="display: none; flex-direction: column; align-items: center">
                        <div><img src="https://hwm.events/img/shiploading.gif" width="300"></div>
                        <div><p><b>${allTexts.get("fill_process")}</b></p></div>
                    </div>
                    <div id="fill_options" style="display: flex; flex-direction: column; align-items: center">
                        <div id="fill_max" class="home_button2 btn_hover2" style="width: 80%; margin-bottom: 10px">${allTexts.get("fill_max")}</div>
                        <div id="fill_maxOff5" class="home_button2 btn_hover2" style="width: 80%;">${allTexts.get("fill_maxoff5")}</div>
                    </div>
                </div>
            `);

            async function fillShip(itemsForCapacity) {
                $(`fill_result`).style.display = "flex"
                $(`fill_options`).remove()
                $(`items_container`)?.remove()
                for (const item of itemsForCapacity) {
                    let count = item[1]
                    let res_id = itemsMap[item[0]].res_id

                    let formData = new FormData()
                    formData.append('action', "load")
                    formData.append('buy_cnt', count)
                    formData.append('res_id', res_id)
                    formData.append('sign', my_sign)

                    await doPost(`/pirate_event.php`, formData, true)
                }
            }

            $(`fill_max`).addEventListener("click", async () => {
                await fillShip(getItemsForCapacity(items, maxCapacity))
                setTimeout(() => location.reload(), 500)
            })
            $(`fill_maxOff5`).addEventListener("click", async () => {
                await fillShip(getItemsForCapacity(items, maxCapacity - 5))
                setTimeout(() => location.reload(), 500)
            })
        }

        eventHelperSettings(target_td, (container) => {
            setSettings("auto_return_after_battle", allTexts.get("auto_return_after_battle"), container)
            setSettings("show_autofill_options", allTexts.get("show_autofill_options"), container)
            setSettings("sort_products", allTexts.get("sort_products"), container)
            setSettings("show_event_timer", allTexts.get("show_event_timer"), container)
            setSettings("show_ship_available_alert", allTexts.get("show_ship_available_alert"), container)
        })
    }

    function getItemsForCapacity(items, target) {
        const lookup = Array.apply(null, Array(target + 1)).map(() => {
            return {items: [], totalProfit: 0}
        })

        for (let i = 0; i <= target; i++) {
            for (let j = 0; j < items.length; j++) {
                if (items[j].weight <= i) {
                    if (lookup[i].totalProfit < lookup[i - items[j].weight].totalProfit + items[j].profit) {
                        let newItems = JSON.parse(JSON.stringify(lookup[i - items[j].weight].items))
                        newItems.push(items[j])
                        lookup[i].items = newItems
                        lookup[i].totalProfit = lookup[i - items[j].weight].totalProfit + items[j].profit
                    }
                }
            }
        }

        return Object.entries(groupByKey(lookup[target].items, "name")).map(([key, value]) => [key, value.length]);
    }

    if (location.href.includes("pirate_land")) {
        if (get("auto_return_after_battle", true)) {
            document.querySelector("input[type=submit]").click()
        }
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
                <div class="items-container" id="items_container">
                    <div class="items-row">
                        <div class="item-itself">${allTexts.get("item")}</div>
                        <div class="item-itself">${allTexts.get("profit")}</div>
                        <div class="item-itself">${allTexts.get("weight")}</div>
                        <div class="item-itself">${allTexts.get("prices")}</div>
                        <div class="item-itself">${allTexts.get("buy")}</div>
                    </div>`;
        items.forEach(item => {
            final_str += `
                    <div class="items-row">
                        <div class="item-itself"><img src="${item.name}" height="48" alt="icon"></div>
                        <div class="item-itself">${item.opt_price.toFixed(2)}</div>
                        <div class="item-itself">${item.weight}</div>
                        <div class="item-itself">${item.buy_price}->${item.sell_price}</div>
                        <div class="item-itself">${item.buy_form.toString().replaceAll("Погрузить", "Купить").replaceAll("Load", "Buy")}</div>
                    </div>`;
        })

        return final_str + `</div>`;
    }

    if (location.href.includes("pirate_self_event.")) {
        document.querySelector(".pirate_self_left_block").style.maxWidth = "unset"
        await setLeaderboard(
            Array.from(document.querySelectorAll('table[width="100%"][align="left"]')).slice(-1)[0].previousElementSibling,
            "afterbegin",
            false,
            true)

        if (get("show_event_timer", true)) {
            setTimer(Array.from(document.querySelectorAll(".global_container_block_header")).at(1))
        }
        setTopBattles()
    }

    if (location.href.includes("pirate_self_event_set")) {
        let availableSilver = parseInt(document.body.innerText.match(/(Доступно серебра|Silver available): (\d{0,3},?\d{1,3})/)[2].replace(",", ""))

        Array.from(document.getElementsByClassName("pirate_self_table_padding"))
            .forEach(table => {
                table.style.position = "unset"
                table.parentElement.style.height = ""
            });

        Array.from(document.getElementsByClassName("pirate_self_table_padding")[1].getElementsByTagName("tr"))
            .filter(elem => elem.innerHTML.includes("cre_creature"))
            .forEach((elem, index) => {
                let submit = elem.querySelector("div[id^=but]")
                if (submit) {
                    let name = submit.getAttribute("buystr").match(/mid=([a-zA-Z0-9_-]+)/)[1]
                    let price = parseInt(submit.getAttribute("buystr").match(/price=(\d{1,6})/)[1])
                    let maxAmount = parseInt(elem.innerHTML.match(/(Макс|Max)\. (\d{1,3})/)[2])

                    let currentAmount = 0

                    let currentHire = Array.from(document.querySelector(".pirate_self_recruit_block_outside").children[0].getElementsByTagName("tr"))
                        .filter(elem => elem.innerHTML.includes("cre_creature"))
                        .filter(elem => elem.innerHTML.includes(`=${name}"`))
                    if (currentHire.length > 0) {
                        currentAmount = parseInt(currentHire[0].querySelector(".cre_creature").innerText)
                    }

                    let possibleAmount = maxAmount - currentAmount
                    possibleAmount = Math.min(parseInt(availableSilver / price), possibleAmount)

                    let allSubmit = submit.cloneNode(true)
                    allSubmit.innerText = allTexts.get("hire_all")
                    allSubmit.id = `hire_all_${index}`
                    allSubmit.setAttribute("style", "")
                    allSubmit.setAttribute("onclick", `location="pirate_self_event_set.php?${submit.getAttribute("buystr")}&cnt=${possibleAmount}"`)
                    submit.insertAdjacentHTML("afterend", allSubmit.outerHTML)
                }
            })
    }
}