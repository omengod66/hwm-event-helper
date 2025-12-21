import {removeAndSetLeaderboard, setTimer} from "../utils/eventUtils";

const {setLeaderboard} = require("../leaderboard");
export default function roguesLikeEvent() {
    if (/rogue_like_event\.php$/.test(location.href)) {
        removeAndSetLeaderboard()
        setTimer(document.querySelector(".global_container_block_header"))
    }
}
