import {doGet} from "./utils/networkUtils";
import {get, my_sign, pl_id, pl_lvl, set} from "./utils/commonUtils";
import {setGlobalStyles} from "./styles";
import leaderEvent from "./events/leader";
import adventureEvent from "./events/adventure";
import factionEvent from "./events/faction";
import hireEvent from "./events/hire";
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


async function setup() {
    if (!pl_lvl) {
        let doc = await doGet(`/pl_info.php?id=${pl_id}`, true);
        set("hero_combat_lvl", doc.body.innerText.match(/(Боевой уровень|Combat level): (\d{1,2})/)[2] - 0)
        location.reload()
    }
    if (!my_sign) {
        let doc = await doGet(`/shop.php`, true)
        set("my_sign", doc.body.innerHTML.match(/sign=([a-z0-9]+)/)[1])
        location.reload()
    }
    if (location.href.includes("inventory")) {
        set("my_sign", window.sign)
        set("hero_combat_lvl", window.pl_level)
    }
}
setup()

setGlobalStyles()

// EVENTS
leaderEvent()
adventureEvent()
factionEvent()
hireEvent()
pirateEvent()
pirateHuntEvent()
portalCoupleEvent()
portalSoloEvent()
thiefEvent()
huntEvent()
villageEvent()

customInsertion()
processHeroPage()
processBattlePage()
processBattleLogPage()
