import {$, pl_id} from "../utils/commonUtils";
import {doGet} from "../utils/networkUtils";
import {setLeaderboard} from "../leaderboard";

export default function portalSoloEvent() {
    let loadStarted = false;
    let maxPages = 50;
    let pageCount = 0;
    let battleCount = 0;
    if (location.href.includes("tj_single")) {
        setLeaderboard(Array.from(document.querySelector(".tj_left_div").getElementsByTagName("center")).at(-1))

        mainTJSolo();
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
            processResponse(doc)
            pageCount++
        }
    }

    function processResponse(doc) {
        let arr = Array.from(doc.querySelectorAll('.global_a_hover')).slice(-1)[0].innerHTML.toString().split("\n");
        arr = arr.slice(2, 42);
        for (let i = 0; i < arr.length; i++) {
            let currwarid = arr[i].match(/warid=\d{10}/g)[0].match(/\d{10}/g)[0] - 0;
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