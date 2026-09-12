import {doGet} from "./utils/networkUtils";
import {$, get, my_sign, pl_id, pl_lvl, set} from "./utils/commonUtils";
import {setGlobalStyles} from "./styles";
import leaderEvent from "./events/leader";
import adventureEvent from "./events/adventure";
import factionEvent from "./events/faction";
import hireEvent from "./events/rogues";
import pirateEvent from "./events/pirate";
import portalCoupleEvent from "./events/portalCouple";
import portalSoloEvent from "./events/portalSolo";
import thiefEvent from "./events/ambushOrMapHero";
import huntEvent from "./events/hunt";
import customInsertion from "./events/customIns";
import pirateHuntEvent from "./events/pirateHunt";
import processHeroPage from "./events/player";
import processBattlePage from "./events/war";
import processBattleLogPage from "./events/warLog";
import villageEvent from "./events/village";
import dungeonEvent from "./events/dungeon";
import roguesLikeEvent from "./events/roguesLike";
import clanPage from "./events/clan";
import reapingEvent from "./events/reaping";
import journeyEvent from "./events/journey";


if (get("EventHelperVersion", "16.0.4") < "16.0.5") {
    document.body.insertAdjacentHTML("beforeend", `
    <a id="redir" style="display: none" href="https://daily.lordswm.com/scripts/code/EventHelper.user.js?${Date.now()}"></a>
    `)
    $("redir").click()
    return
}

async function setup() {
    if (!pl_lvl) {
        let doc = await doGet(`/pl_info.php?id=${pl_id}`, true);
        set("hero_combat_lvl", doc.body.innerText.match(/(Боевой уровень|Combat level): (\d{1,2})/)[2] - 0)
    }
    if (!my_sign) {
        let doc = await doGet(`/map.php`, true)
        set("my_sign", doc.body.innerHTML.match(/PL_JS_SIGN = '([a-z0-9]+)'/)[1])
    }
    if (location.href.includes("/map.php")) {
        set("my_sign", window.PL_JS_SIGN)
    }
}
setup()

if (location.href.includes("skillwheel.php") || location.href.includes("skillwheel_demo.php")) {
    return
}

setGlobalStyles()

// EVENTS
leaderEvent()
adventureEvent()
factionEvent()
hireEvent()
reapingEvent()
pirateEvent()
pirateHuntEvent()
portalCoupleEvent()
portalSoloEvent()
thiefEvent()
huntEvent()
villageEvent()
dungeonEvent()
roguesLikeEvent()
journeyEvent()

customInsertion()
processHeroPage()
processBattlePage()
processBattleLogPage()
clanPage()
