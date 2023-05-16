import {cdnHost, heroCreatures} from "./utils/commonUtils";

export function getSpoiler(type, index, spoilerHead, spoilerBody, spoilerWrapperClass = "", spoilerLabelClass = "") {
    return `
            <div class="${spoilerWrapperClass}" style="display: flex;
    flex-direction: column;
    align-items: center;">
                <input type="checkbox" id="spoiler_${type}_${index}"/>
                <label for="spoiler_${type}_${index}" class="${spoilerLabelClass}">
                    ${spoilerHead}
                </label>
                <div class="spoiler">
                    ${spoilerBody}
                </div>
            </div>
        `
}

export function getNewCreatureIcon(creaturePortrait, newAmount, cre_amount_class = "") {
    return `
        <div class="cre_creature custom-creature">
            <img src="https://${cdnHost}/i/army_html/fon_lvl${heroCreatures[creaturePortrait] ? heroCreatures[creaturePortrait].rarity : "1"}.png?v=1" width="50" height="50" class="cre_mon_image2" alt="">
            <img src="https://${cdnHost}/i/portraits/${creaturePortrait}p33.png" height="50" alt="" class="cre_mon_image1">
            <div class="cre_amount custom-amount ${cre_amount_class}" id="add_now_count">${newAmount}</div>
        </div>`
}