import {$, get, set} from "../utils/commonUtils";

export default function processHeroPage() {
    let partners = get("partners", null);

    if (location.href.includes("pl_info")) {
        let target = document.querySelectorAll("td[align=right]")[1].parentElement;
        let heroId = new URLSearchParams(window.location.search).get("id");
        target.insertAdjacentHTML('afterend', `<tr><td id="partner-target" colspan="2" style="text-align: center;"></td></tr>`)
        if (!partners || partners !== heroId) {
            setPartner(heroId)
        } else {
            removePartner(heroId)
        }
    }

    function setPartner(heroId) {
        $('partner-target').innerHTML = `  <span id="partner-1" style="cursor: pointer; text-decoration: underline">Пометить напарником</span>`
        $('partner-1').addEventListener('click', () => {
            partners = heroId
            set('partners', partners)
            removePartner(heroId)
        })
    }

    function removePartner(heroId) {
        $('partner-target').innerHTML = `  <span id="partner-1" style="cursor: pointer; text-decoration: underline">Убрать из напарников</span>`
        $('partner-1').addEventListener('click', () => {
            partners = null
            set('partners', partners)
            setPartner(heroId)
        })
    }
}