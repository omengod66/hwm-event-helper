import {doGet} from "../utils/networkUtils";
import {get, sortByKey} from "../utils/commonUtils";

const {eventHelperSettings, setSettings} = require("../settings");
export default async function clanPage() {
    if (/clan_info\.php/.test(location.href)) {
        let heroesTable = Array.from(document.getElementsByTagName("table")).at(-1)
        eventHelperSettings(heroesTable, (container) => {
            setSettings("show_event_attempts_left", "Показывать оставшиеся попытки у игроков", container, false)
        }, "beforebegin")

        if (get("show_event_attempts_left", false)) {
            let clanId = new URLSearchParams(window.location.search).get("id")
            let heroesAttempts = await doGet(`getTopClanDetailedAttempts?clan_id=${clanId}`)

            let heroes = heroesTable.querySelectorAll("tr")
            if (heroes.length - 10 < Object.keys(heroesAttempts).length) {
                heroes.forEach(heroElem => {
                    let heroId = heroElem.innerHTML.match(/id=(\d{1,8})/)[1]
                    let heroAttempts = heroesAttempts[heroId]
                    heroElem.insertAdjacentHTML("beforeend", `
                        <td class="wbwhite">${
                        heroAttempts ? heroAttempts : 0
                    }</td>
                    `)
                })
                replaceWithSortableTable(heroesTable)
            }
        }
    }
}

function replaceWithSortableTable(heroesTable) {
    let heroesData = []
    heroesTable.querySelectorAll("tr").forEach((heroTr, index) => {
        let tds = heroTr.querySelectorAll("td")
        switch (tds.length) {
            case 4: {
                heroesData.push({
                    order: index + 1,
                    info: tds[1].innerHTML,
                    cl: tds[2].innerText - 0,
                    description: tds[3].innerHTML
                })
                return
            }
            case 5: {
                heroesData.push({
                    order: index + 1,
                    status: tds[1].innerHTML.match(/clans\/(.+)\.gif/)[1],
                    info: tds[2].innerHTML,
                    cl: tds[3].innerText - 0,
                    description: tds[4].innerHTML
                })
                return
            }
            case 6: {
                heroesData.push({
                    order: index + 1,
                    info: tds[1].innerHTML,
                    cl: tds[2].innerText - 0,
                    description: tds[3].innerHTML,
                    score: tds[4].innerText.replaceAll(" ", "").match(/(\d{0,3},?\d{0,3})/)[1].replace(",", "") - 0,
                    attemptsLeft: tds[5].innerText - 0
                })
                return
            }
            case 7: {
                heroesData.push({
                    order: index + 1,
                    status: tds[1].innerHTML.match(/clans\/(.+)\.gif/)[1],
                    info: tds[2].innerHTML,
                    cl: tds[3].innerText - 0,
                    description: tds[4].innerHTML,
                    score: tds[5].innerText.replaceAll(" ", "").match(/(\d{0,3},?\d{0,3})/)[1].replace(",", "") - 0,
                    attemptsLeft: tds[6].innerText - 0
                })
                return
            }
        }
    })
    let threshold = sortByKey([...heroesData], "score", -1)[99].score
    heroesTable.outerHTML = `
    <table class="wb" width="100%">
        <thead>
            <tr>
                ${Object.keys(heroesData[0]).reduce((prev, columnName) => {
                    return prev + `<th><div class="home_button2 btn_hover2" id="sort_${columnName}"><img height="20px" src="https://static.thenounproject.com/png/2509814-200.png" style="pointer-events: none"></div></th>`
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
            let result = `<td class="wbwhite" width="30" style="text-align: center;">${index + 1}.</td>`
            if (hero.hasOwnProperty('status')) {
                result += `<td class="wbwhite" width="15" style="text-align: center;"><img align="absmiddle" src="https://dcdn.heroeswm.ru/i/clans/${hero.status}.gif" width="15" height="15" border="0" title="Не в игре" alt="Не в игре"></td>`
            }
            result += `<td class="wbwhite" width="150">${hero.info}</td>`
            result += `<td class="wbwhite" width="10" align="center">${hero.cl}</td>`
            result += `<td class="wbwhite">${hero.description}</td>`
            if (hero.hasOwnProperty('score')) {
                result += `<td class="wbwhite" width="30" style="text-align: center;">${hero.score >= threshold ? `<b style="color: blue">${hero.score}</b>` : hero.score}</td>`
                result += `<td class="wbwhite" width="30" style="text-align: center;">${hero.attemptsLeft}</td>`
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