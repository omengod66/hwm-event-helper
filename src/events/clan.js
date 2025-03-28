import {doGet} from "../utils/networkUtils";
import {get, sortByKey} from "../utils/commonUtils";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";

const {eventHelperSettings, setSettings} = require("../settings");

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("show_event_attempts_left", "Show remaining attempts for players", "Показывать бои и оставшиеся попытки у игроков", "Показувати боі та спроби, які залишилися у гравців"))
    texts.addText(new LocalizedText("show_sort", "Show buttons to sort players", "Показывать кнопки для сортировки игроков", "Показувати кнопки для сортування гравців"))

    return texts
}

let allTexts = getAllTexts()
export default async function clanPage() {
    if (/clan_info\.php/.test(location.href)) {
        let heroesTable = Array.from(document.getElementsByTagName("table")).at(-1)
        eventHelperSettings(heroesTable, (container) => {
            setSettings("show_event_attempts_left", allTexts.get("show_event_attempts_left"), container, false)
            setSettings("show_sort", allTexts.get("show_sort"), container)
        }, "beforebegin")

        if (get("show_event_attempts_left", false)) {
            let clanId = new URLSearchParams(window.location.search).get("id")
            let clanInfo = await doGet(`rating.php?clan=${clanId}`)

            let heroes = heroesTable.querySelectorAll("tr")
            heroes.forEach(heroElem => {
                let heroId = heroElem.innerHTML.match(/id=(\d{1,8})/)[1]
                let heroInfo = clanInfo.members.find(memberInfo => memberInfo.id == heroId)

                heroElem.insertAdjacentHTML("beforeend", `
                    <td class="wbwhite">${
                        heroInfo ? heroInfo.total_battles : 0
                    }</td>
                    <td class="wbwhite">${
                        heroInfo ? heroInfo.attempts_left : 0
                    }</td>
                `)
            })
        }
        if (get("show_event_attempts_left", false) || get("show_sort", true)) {
            replaceWithSortableTable(heroesTable)
        }
    }
}

function replaceWithSortableTable(heroesTable) {
    let heroesData = []
    heroesTable.querySelectorAll("tr").forEach((heroTr, index) => {
        let tds = heroTr.querySelectorAll("td")
        let heroData = {}
        let tdIndex = 1
        heroData.order = index + 1
        if (tds[tdIndex].innerHTML.includes("i/clans/") || tds[tdIndex].innerText === " ") {
            let onlineMatch = tds[tdIndex++].innerHTML.match(/clans\/(.+)\.gif/)
            if (onlineMatch) {
                heroData.status = onlineMatch[1]
            } else {
                heroData.status = "offline"
            }
        }
        heroData.info = tds[tdIndex++].innerHTML
        heroData.cl = tds[tdIndex++].innerText - 0
        heroData.description = tds[tdIndex++].innerHTML
        if (tdIndex<tds.length) {
            heroData.score = tds[tdIndex++].innerText.replaceAll(" ", "").match(/(\d{0,3},?\d{0,3},?\d{0,3}\.?\d{0,5})/)[1].replaceAll(",", "") - 0
        }
        if (tdIndex === tds.length-2) {
            heroData.totalBattles = tds[tdIndex++].innerText - 0
        }
        if (tdIndex === tds.length-1) {
            heroData.attemptsLeft = tds[tdIndex].innerText - 0
        }
        heroesData.push(heroData)
    })
    let sortedHeroes = sortByKey([...heroesData], "score", -1)
    let threshold = sortedHeroes.length > 100 ? sortByKey([...heroesData], "score", -1)[99].score : 0
    heroesTable.outerHTML = `
    <table class="wb" width="100%">
        <thead>
            <tr style="background-color: white">
                ${Object.keys(heroesData[0]).reduce((prev, columnName) => {
                    return prev + `<th style="border: 1px solid"><div class="home_button2 btn_hover2" id="sort_${columnName}" style="margin: 2px"><img height="20px" src="https://static.thenounproject.com/png/2509814-200.png" style="pointer-events: none"></div></th>`
                }, "")}
            </tr>
        </thead>
        <tbody id="table-content"></tbody>
    </table>
    `

    const tableContent = document.getElementById("table-content")
    const tableButtons = document.querySelectorAll("th div");

    const getTableContent = (data) => {
        let tableHtml = data.reduce((prev, hero, index) => {
            let tdClass = hero.status === "offline" ? "wbwhite" : "wblight"
            let result = `<td class="${tdClass}" width="${hero.order === index + 1?30: 70}" style="text-align: center;">${index + 1} ${hero.order === index + 1?"":`(${hero.order})`}</td>`
            if (hero.hasOwnProperty('status')) {
                result += `<td class="${tdClass}" width="15" style="text-align: center;"><img align="absmiddle" src="https://dcdn.heroeswm.ru/i/clans/${hero.status}.gif" width="15" height="15" border="0"></td>`
            }
            result += `<td class="${tdClass}" width="150">${hero.info}</td>`
            result += `<td class="${tdClass}" width="10" align="center">${hero.cl}</td>`
            result += `<td class="${tdClass}">${hero.description}</td>`
            if (hero.hasOwnProperty('score')) {
                result += `<td class="${tdClass}" width="30" style="text-align: center;">${hero.score >= threshold ? `<b style="color: blue">${hero.score}</b>` : hero.score}</td>`
            }
            if (hero.hasOwnProperty('totalBattles')) {
                result += `<td class="${tdClass}" width="30" style="text-align: center;">${hero.totalBattles}</td>`
            }
            if (hero.hasOwnProperty('attemptsLeft')) {
                result += `<td class="${tdClass}" width="30" style="text-align: center;">${hero.attemptsLeft}</td>`
            }
            return prev + `<tr>${result}</tr>`
        }, "")
        tableContent.insertAdjacentHTML("beforeend", tableHtml)
    };

    const sortData = (data, param, direction = "asc") => {
        tableContent.innerHTML = '';
        const sortedData =
            direction === "asc"
                ? sortByKey([...data], param, -1)
                : sortByKey([...data], param)

        getTableContent(sortedData);
    };
    const resetButtons = (event) => {
        [...tableButtons].map((button) => {
            if (button !== event.target) {
                button.removeAttribute("data-dir");
            }
        });
    };
    getTableContent(heroesData);
    [...tableButtons].map((button) => {
        button.addEventListener("click", (e) => {
            resetButtons(e);
            if (e.target.getAttribute("data-dir") === "desc") {
                sortData(heroesData, e.target.id.split("_")[1], "desc");
                e.target.setAttribute("data-dir", "asc");
            } else {
                sortData(heroesData, e.target.id.split("_")[1], "asc");
                e.target.setAttribute("data-dir", "desc");
            }
        });
    });
}