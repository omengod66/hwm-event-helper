import {removeLeaderboard, setTimer} from "../utils/eventUtils";

const {setLeaderboard} = require("../leaderboard");
export default function roguesLikeEvent() {
    if (/rogue_like_event\.php$/.test(location.href)) {
        removeLeaderboard()
        setTimer(document.querySelector(".global_container_block_header"))
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("center")).at(-1))
    }
}
