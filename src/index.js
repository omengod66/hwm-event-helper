import {doHWMGet} from "./utils/networkUtils";
import {my_sign, pl_id, pl_lvl, set} from "./utils/commonUtils";
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


if (!pl_lvl) {
    doHWMGet(`/pl_info.php?id=${pl_id}`, doc => {
        set("hero_combat_lvl", doc.body.innerText.match(/(Боевой уровень|Combat level): (\d{1,2})/)[2] - 0)
        location.reload()
    });
}
if (!my_sign) {
    doHWMGet(`/shop.php`, (doc) => {
        set("my_sign", doc.body.innerHTML.match(/sign=([a-z0-9]+)/)[1])
        location.reload()
    })
}

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
