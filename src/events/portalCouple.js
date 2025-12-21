import {setLeaderboard} from "../leaderboard";
import {removeAndSetLeaderboard, setTimer} from "../utils/eventUtils";

export default function portalCoupleEvent() {
    if (location.href.includes("tj_event2")) {
        removeAndSetLeaderboard()
        setTimer(document.querySelector(".global_container_block_header"))
    }
}