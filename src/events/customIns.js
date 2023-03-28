import {$, cdnHost, get, set} from "../utils/commonUtils";

export default function customInsertion() {
    if (location.href.includes("war.") &&
        (get("pirate_hunt_custom_ins", false) || get("village_custom_ins", false) || get("faction_custom_ins", false))) {
        let loadId = setInterval(waitForBattleLoad, 200)
        let startId;

        function waitForBattleLoad() {
            if (!stage[war_scr].setted_atb) {
                return
            } else {
                window.clearInterval(loadId)
            }

            if (btype === 115 || btype === 119 || btype === 144) {
                let customInsertion = get(`insertionData_${btype}${btype === 144 ? defyn : ""}`, null)
                createSaveInsButton()
                if (customInsertion) {
                    if (get("custom_ins_auto", false)) {
                        makeIns(customInsertion)
                    } else {
                        createMakeInsButton(customInsertion)
                    }
                }
                startId = setInterval(waitForBattleStart, 200)
            }
        }

        function waitForBattleStart() {
            if (lastturn > -1) {
                window.clearInterval(startId)
                removeSaveInsButton()
                removeMakeInsButton()
            }
        }

        function createMakeInsButton(customInsertion) {
            $("right_button").insertAdjacentHTML("beforeend", `
                        <div id="custom_make_ins" class="toolbars_img" style="width: 47px;"><img src="https://${cdnHost}/i/combat/btn_autoalignment.png?v=6" alt=""></div>
                    `)
            $("custom_make_ins").addEventListener("click", () => {
                makeIns(customInsertion)
            })
        }

        function makeIns(customInsertion) {
            let currentCreatures = stekid.slice(1, stackcount + 1).filter(cre => cre !== 0)
            let filteredInsertion = customInsertion.filter(cre => currentCreatures.includes(cre[0]))
            currentCreatures.forEach((cre, index) => {
                if (!filteredInsertion.some(customInsCre => customInsCre[0] === cre)) {
                    filteredInsertion.push([cre, steknumber[index + 1], 1, 1])
                }
            })
            let insStr = filteredInsertion.map(cre => cre.join("#")).join("^") + "^"
            stage[war_scr].useinsertion_cre(insStr)
            removeMakeInsButton()
        }

        function createSaveInsButton() {
            $("right_button").insertAdjacentHTML("beforeend", `
                <div id="custom_save_ins" class="toolbars_img" style="width: 47px; border-radius: 50%; background: #dcc287;"><img src="https://i.imgur.com/08mNun9.png" alt=""></div>
            `)
            $("custom_save_ins").addEventListener("click", () => {
                let insertionData = []
                for (let i = 1; i <= stackcount; i++) {
                    if ((stekx[i] !== -10) && ((steknumber[i] > 0) && (steknumber[i] !== undefined)) && (stekid[i] !== 0) && (stekid[i] !== undefined)) {
                        insertionData.push([stekid[i], stage[war_scr].obj[i].nownumber, stekx[i], steky[i]])
                    }
                }
                set(`insertionData_${btype}${btype === 144 ? defyn : ""}`, insertionData)
                $("custom_save_ins").innerHTML = `<img src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/checkmark-24-512.png" alt=""></div>`
                setTimeout(() => {
                    $("custom_save_ins").innerHTML = `<img src="https://i.imgur.com/08mNun9.png" alt=""></div>`
                }, 1000)
            })
        }

        function removeSaveInsButton() {
            let button = $("custom_save_ins")
            if (button) {
                button.remove()
            }
        }

        function removeMakeInsButton() {
            let button = $("custom_make_ins")
            if (button) {
                button.remove()
            }
        }
    }
}