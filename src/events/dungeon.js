import {$, cdnHost, pl_id} from "../utils/commonUtils";
import {setTimer} from "../utils/eventUtils";
import {setLeaderboard} from "../leaderboard";
import {LocalizedText, LocalizedTextMap} from "../utils/localizationUtils";
import {getCreatureInfo} from "../utils/creatureManager";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("place", "Place", "Место", "Місце"))
    return texts
}

let allTexts = getAllTexts()

function handleEventImage() {
    let annoyingPicture = document.querySelector(".global_inside_shadow")
    if (annoyingPicture) {
        annoyingPicture.remove()
    }
}

async function handleEnemies() {
    let enemies = Array.from(document.querySelectorAll(".recruit_event_enemy_block"))
    enemies.forEach(enemy => {
        if (enemy.innerText.includes("обороняющихся")) {
            let powerElem = enemy.querySelector("div:nth-child(3)>div:nth-child(3)")
            let powerRaw = powerElem.innerText
            let powerParsedTransformed = Math.floor(parseInt(powerRaw.replaceAll(",", "")) * 0.8)
                .toLocaleString()
            powerElem.innerHTML = `${powerRaw} (<i style="cursor: pointer" title="При потере в бою">${powerParsedTransformed}</i>)`
        }
    })

    for (const enemy of enemies) {
        let infoPromises = Array.from(enemy.firstElementChild.children).map(async creatureElem => {
            let portrait = creatureElem.innerHTML.match(/\/portraits\/([a-zA-Z0-9_-]+)anip33/)[1]
            let id = creatureElem.innerHTML.match(/army_info\.php\?name=([a-zA-Z0-9_-]+)/)[1]
            let amount = creatureElem.querySelector(".cre_amount48").innerText - 0
            let partialInfo = {
                id,
                portrait
            }
            let fullInfo = await getCreatureInfo(partialInfo)
            return {
                hp: (fullInfo.hp - 0 ) * amount,
            }
        })

        Promise.all(infoPromises).then(
            infos => {
                let totalHp = infos.reduce((result, info) => result + info.hp, 0)
                enemy.firstElementChild.insertAdjacentHTML("afterend", `
                    <div><img style="vertical-align: bottom; height: 16px" src="https://${cdnHost}/i/icons/attr_hit_points.png">${totalHp}</div>
                `)
            }
        )
    }
}

function transformRating() {
    let clanRating = ""
    let elem = document.querySelector(".recruit_event_loot_rating_inside > center")

    if (typeof hwm_mobile_view === "undefined") {
        elem.parentElement.parentElement.style.maxWidth = "unset"
        elem.parentElement.parentElement.style.minWidth = "unset"
        elem.parentElement.parentElement.style.width = "500px"
        $("hwm_no_zoom").style.width = "unset"
        $("hwm_no_zoom").style.maxWidth = "1440px"
    }

    let nextElem = elem.nextElementSibling
    elem.remove() // center
    elem = nextElem
    nextElem = elem.nextElementSibling
    elem.remove() // table
    elem = nextElem
    nextElem = elem.nextElementSibling
    elem.remove() // br
    elem = nextElem
    nextElem = elem.nextElementSibling
    clanRating += elem.outerHTML
    elem.remove() // center
    elem = nextElem
    clanRating += elem.outerHTML
    elem.outerHTML = `
    <div id="rating_container" style="display: flex; flex-direction: ${typeof hwm_mobile_view === "undefined" ? "row" : "column"}">
        <div id="solo_rating"></div>
        <div id="clan_rating">${clanRating}</div>
    </div>
    `

}

function handleYourPlace() {
    let place = "9999"
    let heroesTable = document.querySelector(".recruit_event_loot_rating_inside > table")
    Array.from(heroesTable.querySelectorAll("tr"))
        .forEach((tr, index) => {
            if (tr.innerHTML.includes(`pl_info.php?id=${pl_id}`)) {
                place = tr.querySelector("td").innerText.replaceAll(".", "")
            }
        })
    document.querySelector(".recruit_event_loot_rating_inside").insertAdjacentHTML("afterbegin",
        `${allTexts.get("place")}: ${place}<br>`
    )
}

export default async function dungeonEvent() {
    if (/recruit_event\./.test(location.href)) {
        setTimer(document.querySelector(".global_container_block_header"))
        handleYourPlace()
        handleEventImage();
        handleEnemies();
        transformRating();


        await setLeaderboard(
            $("solo_rating"),
            "afterbegin",
            false,
            true,
            document.querySelector(".recruit_event_army_attack_inside")
        )
    }
}