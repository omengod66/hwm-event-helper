import {doGet} from "../utils/networkUtils";

export default async function dungeonEvent() {
    if (/recruit_event/.test(location.href)) {
        let topHeroes = await doGet(`heroes/dun_scores.json`)
        let heroesTable = document.querySelector(".recruit_event_loot_rating_inside").querySelector("table")
        let firstTr = heroesTable.querySelector("tr")
        let highestPlace = parseInt(firstTr.querySelector("td").innerText)

        let heroesToRenderCount = Math.min(20, highestPlace-1)

        let heroesToRender = topHeroes.slice(0, heroesToRenderCount)
        firstTr.insertAdjacentHTML("beforebegin", heroesToRender.join(""))

    }
}