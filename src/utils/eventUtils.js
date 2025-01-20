import {$, get} from "./commonUtils";
import {LocalizedText, LocalizedTextMap} from "./localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("time_d", "d", "д", "д"))
    texts.addText(new LocalizedText("time_h", "h", "ч", "г"))
    texts.addText(new LocalizedText("time_m", "m", "м", "х"))
    texts.addText(new LocalizedText("time_s", "s", "с", "с"))

    return texts
}

let allTexts = getAllTexts()

export function collapseEventDesc() {
    if (get("collapse_event_desc", false)) {
        if (document.querySelector(".event_desc_block_inside")
            && document.querySelector(".event_desc_block_inside").getAttribute("style") == null
            && (document.querySelector("#event_desc_block") !== null && document.querySelector("#event_desc_block").style.display !== "none")) {
            document.querySelector(".event_desc_open_btn").click()
        }
        if (document.querySelector(".event_desc_block_outside.event_desc_border ")) {
            document.querySelector(".event_desc_open_btn").click()
        }
    }
}

export function getCurrentLevel() {
    let set_level = new URLSearchParams(window.location.search).get("sel_level")
    if (set_level) {
        return set_level
    }
    let match = document.body.innerText.match(/(Уровень сложности|Difficulty level): (\d{1,3})/)
    if (match && match.length > 0) {
        return match[2]
    }
    match = document.body.innerText.match(/(Цель №|Target №)(\d{1,3})/)
    if (match && match.length > 0) {
        return match[2]
    }
    if (document.querySelector(".CheckpointCurrent.btn_highlight")) {
        return document.querySelector(".CheckpointCurrent.btn_highlight").innerText.match(/\d{1,3}/)[0];
    }
    if (document.getElementsByClassName("CheckpointCurrent").length > 0) {
        return document.getElementsByClassName("CheckpointCurrent")[0].innerText.match(/\d{1,3}/)[0];
    }
    if (document.getElementsByClassName("Checkpoints_span").length > 0) {
        return Array.from(document.getElementsByClassName("Checkpoints_span")).at(-1).innerText.match(/\d{1,3}/)[0];
    }
    return "100";
}

export function setClickableLevels() {
    document.querySelectorAll(".Checkpoints").forEach(cp => {
        cp.style.zIndex = "1"
    })
    Array.from(document.querySelectorAll(".Checkpoints"))
        .filter(elem => elem.classList.contains("CheckpointComplete") || elem.classList.contains("CheckpointLocked"))
        .forEach(elem => {
            elem.style.pointerEvents = "all"
            elem.addEventListener("click", () => {
                location.href = location.pathname + "?sel_level=" + elem.innerText.trim()
            })
            elem.style.cursor = "pointer"
        })
}

export function setTimer(where) {
    where.style.display = "flex"
    where.style.justifyContent = "center"
    where.insertAdjacentHTML("beforeend", ` <span id="timer_container"></span>`)
    let container = $("timer_container")
    let countDownDate = new Date(1738270800000).getTime();
    function process() {
        let now = new Date().getTime();
        let distance = countDownDate - now;

        console.log(distance)
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance > 1000 * 60 * 60 * 24) {
            container.innerHTML = `${days}${allTexts.get("time_d")} ${hours}${allTexts.get("time_h")} ${minutes}${allTexts.get("time_m")} ${seconds}${allTexts.get("time_s")}`
        } else {
            if (distance < 0) {
                clearInterval(timer);
                container.innerHTML = ""
            } else {
                container.innerHTML = `<div style="color: red">${days}${allTexts.get("time_d")} ${hours}${allTexts.get("time_h")} ${minutes}${allTexts.get("time_m")} ${seconds}${allTexts.get("time_s")}</div>`
            }
        }
    }
    let timer = setInterval(process, 1000);
    process()
}

export function removeLeaderboard() {
    let centers = Array.from(document.querySelectorAll("center")).filter(elem => elem.innerText.length < 100 && (elem.innerText.includes("Общий рейтинг") || elem.innerText.includes("General rating")))
    if (centers.length > 0) {
        let center = centers[0]
        center.nextElementSibling.remove()
        center.remove()
    }
}
