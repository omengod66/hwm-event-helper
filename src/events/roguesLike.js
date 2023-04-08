const {setLeaderboard} = require("../leaderboard");
export default function roguesLikeEvent() {
    if (/rogue_like_event\.php$/.test(location.href)) {
        setLeaderboard(Array.from(document.querySelectorAll(".global_container_block")).at(-1).children[1], "beforeend", true)
    }

}