import {get, set} from "./commonUtils";
import {doGet} from "./networkUtils";

let creatures = get("creature_infos", {})

export async function getCreatureInfo(partialInfo) {
    let info = creatures[partialInfo.id]
    if (info) {
        return info
    } else {
        let creatureDoc = await doGet(`/army_info.php?name=${partialInfo.id}`, true)
        let statElems = Array.from(creatureDoc.querySelectorAll(".scroll_content_half > div")).map(elem => elem.innerText)
        partialInfo.attack = statElems[0]
        partialInfo.defence = statElems[1]
        partialInfo.shots = statElems[2]
        partialInfo.mana = statElems[3]
        partialInfo.damage = statElems[4]
        partialInfo.range = statElems[5]
        partialInfo.hp = statElems[6]
        partialInfo.ini = statElems[7]
        partialInfo.speed = statElems[8]
        partialInfo.leadership = statElems[9]
        creatures[partialInfo.id] = partialInfo
        set("creature_infos", creatures)
        return partialInfo
    }
}
