import {setLeaderboard} from "../leaderboard";
import {pl_id} from "../utils/commonUtils";

export default function portalCoupleEvent() {
    if (location.href.includes("tj_event2")) {
        document.querySelector(".tj_rating").previousElementSibling.remove()
        setLeaderboard(document.querySelector(".tj_rating").parentElement)
        let myEventPosition = parseInt(Array.from(document.querySelectorAll('[width="50%"]')[0].getElementsByTagName("tr")).find(elem => elem.innerHTML.includes(pl_id)).firstElementChild.innerText)
        document.querySelectorAll('[width="400"]')[0].insertAdjacentHTML("beforeend", `<br><b>Место: ${myEventPosition}</b>`)
    }
}