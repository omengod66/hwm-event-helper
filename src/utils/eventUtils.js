import {get} from "./commonUtils";

export function collapseEventDesc() {
    if (get("collapse_event_desc", false)) {
        if (document.querySelector(".event_desc_block_inside").getAttribute("style") == null) {
            document.querySelector(".event_desc_open_btn").click()
        }
    }
}

export function getCurrentLevel() {
    let set_level = new URLSearchParams(window.location.search).get("sel_level")
    if (set_level) {
        return set_level
    } else {
        if (document.getElementsByClassName("CheckpointCurrent").length > 0) {
            return document.getElementsByClassName("CheckpointCurrent")[0].innerHTML.match(/\d{1,3}/)[0];
        } else {
            return "100";
        }
    }
}