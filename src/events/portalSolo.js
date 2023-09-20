import {$, pl_id} from "../utils/commonUtils";
import {doGet, doPost} from "../utils/networkUtils";
import {setLeaderboard} from "../leaderboard";

export default async function portalSoloEvent() {
    let loadStarted = false;
    let maxPages = 50;
    let pageCount = 0;
    let battleCount = 0;
    if (location.href.includes("tj_single.")) {
        setLeaderboard(Array.from(document.querySelector(".tj_left_div").getElementsByTagName("center")).at(-1))

        mainTJSolo();
    }

    if (location.href.includes("tj_single_set")) {
        let megas = {}
        Array.from(document.querySelectorAll("a"))
            .filter(a => a.href.includes("name=mega"))
            .forEach(a => megas[a.href] = "")
        let all_megas = await doPost("getPortalMegaCreatures", JSON.stringify(megas))

        Array.from(document.querySelectorAll(".tj_block")).at(-1).insertAdjacentHTML("afterend",
            `<div class="tj_block" style="width: 100%; margin-bottom: 1em;margin-top:1em;">
                    <div class="global_table_div_bg"></div>
                    <div class="tj_inside_div">${Object.entries(all_megas).reduce((prev, [href, text]) => {
                        return prev + `<div style="font-size: 16px; text-align: center;"><a href="/${href.split("/").at(-1)}">${text}</a></div>`
                    }, "")}</div>
                </div>
                    `
        )

    }

    function mainTJSolo() {
        Array.from(document.querySelectorAll('.tj_inside_div')).at(-1)
            .insertAdjacentHTML("beforeend", createTJSoloTemplate());
        $(`statbut`).addEventListener('click', () => {
            processCollectBattles()
        })
    }

    function createTJSoloTemplate() {
        return `
                    <div class="wrapperStat">
                        <div><div id="statbut" class="home_button2 btn_hover2">Посчитать бои с существами</div></div>
                        <div id="progress" class="progress"></div>
                    </div>
                `
    }

    function processCollectBattles() {
        if (!loadStarted) {
            collectBattles();
            loadStarted = true;
            document.getElementById("statbut").innerHTML = "Поиск боев...";
        }
    }

    async function collectBattles() {
        if (pageCount < maxPages) {
            let doc = await doGet(`/pl_warlog.php?id=${pl_id}&page=${pageCount}`, true);
            pageCount++
            processResponse(doc)
        }
    }

    function processResponse(doc) {
        let arr = Array.from(doc.querySelectorAll('.global_a_hover')).slice(-1)[0].innerHTML.toString().split("\n");
        arr = arr.slice(2, 42);
        for (let i = 0; i < arr.length; i++) {
            let currwarid = arr[i].match(/warid=(\d{10})/)[1] - 0;

            if (/--117--/.test(arr[i])) {
                if (/<b>/.test(arr[i].split("vs")[1])) {
                    continue
                }
                battleCount++;
                document.getElementById("progress").innerHTML = "Найдено боев: " + battleCount.toString();
            }
            if (currwarid <= 1387305701) {
                let wins = document.querySelector(".tj_hide_top_div > div > b:nth-child(6)").textContent - 0;
                document.getElementById("progress").innerHTML = "Найдено боев: " + battleCount.toString() + " Осталось боев:" + ((wins * 7 + 20) - battleCount).toString();
                document.getElementById("statbut").remove()
                return
            }
        }
        collectBattles()
    }
}