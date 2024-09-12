import {setLeaderboard} from "../leaderboard";
import {removeLeaderboard, setTimer} from "../utils/eventUtils";

export default function portalCoupleEvent() {
    if (location.href.includes("tj_event2")) {
        removeLeaderboard()
        setTimer(document.querySelector(".global_container_block_header"))
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("center")).at(-1))
    }
}