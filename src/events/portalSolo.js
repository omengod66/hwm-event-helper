import {setLeaderboard} from "../leaderboard";
import {collapseEventDesc, removeLeaderboard, setTimer} from "../utils/eventUtils";
import {eventHelperSettings, setSettings} from "../settings";
import {$, allFactions, get} from "../utils/commonUtils";
import {doGet} from "../utils/networkUtils";

export default async function portalSoloEvent() {
    if (location.href.includes("tj_single.")) {
        removeLeaderboard()
        collapseEventDesc()
        setTimer(document.querySelector(".global_container_block_header"))
        setLeaderboard(Array.from(Array.from(document.querySelectorAll(".global_container_block")).at(-1).getElementsByTagName("center")).at(-1))
        eventHelperSettings($("tjset_but").parentElement, (container) => {
            setSettings("hide_portal_event_enemies", "Показывать только сложных противников.", container, false)
            setSettings("collapse_event_desc", "Всегда сворачивать описания боев", container, false)
        }, "beforebegin")

        if (get("hide_portal_event_enemies", false)) {
            Array.from(document.querySelectorAll(".global_container_block")).filter(e => e.innerHTML.includes("/i/combat/btn_autoalignment.png"))
                .forEach(e => {
                    if (!e.innerText.includes("Сложный противник") && !e.innerText.includes("Difficult Enemy")) {
                        e.remove()
                    }
                })
        }
    }

    if (location.href.includes("/map.php")) {
        let factionImg = {"Рыцарей":1, "Некромантов":2, "Магов":3, "Эльфов":4, "Варваров":5, "Темных эльфов":6, "Демонов":7, "Гномов":8, "Степных варваров":9, "Фараонов":10, "Knights":1, "Necromancers":2, "Wizards":3, "Elves":4, "Barbarians":5, "Dark elves":6, "Demons":7, "Dwarves":8, "Tribals":9, "Pharaoh":10};
        window.doSearch = doSearch
        $("hwm_map_objects_and_buttons").insertAdjacentHTML("beforebegin", `
            <div class="home_button2 btn_hover2" onclick="doSearch()" style="margin-bottom: 4px">Поиск существ</div>
            
        `)
        async function doSearch() {
            let promises = Array.from(document.querySelectorAll(".map_obj_table_hover"))
                .map(async (factory, index) => {
                    let img = document.querySelector(`#factory_faction_${index}`)
                    if (img) {
                        img.remove()
                    }
                    let id = factory.innerHTML.match(/id=([0-9]+)/)[1];
                    let doc = await doGet(`/object-info.php?id=${id}`, true)
                    let match = doc.body.innerHTML.match(/(?:Похоже, что тут скрывается один из отрядов|It seems that one of the squads of) <i>([^<]+)/);
                    if (match) {
                        factory.firstElementChild.firstElementChild.insertAdjacentHTML("afterbegin", `
                            <img id="factory_faction_${index}" src="/i/f/r${factionImg[match[1]]}.png" style="width: 15px; vertical-align: middle">
                        `);

                    }
                });
            await Promise.all(promises)
        }
    }

}