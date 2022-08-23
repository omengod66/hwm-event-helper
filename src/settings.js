import {startRegistration} from "./registration";
import {$, get} from "./utils/commonUtils";

export function setSettings(key, text, where = document.body, enabled = true) {
    where
        .insertAdjacentHTML("beforeend", `
                <div style="display: flex; color: green; font-size: 20px; cursor: pointer"  id="${key}" >
                    <input style="height: 24px; width: 24px;" id="${key}_checkbox" type="checkbox" ${get(key, enabled) ? ' checked' : ''}>
                    <label for="${key}_checkbox">${text}</label>
                </div>`)
    $(key).addEventListener('click', () => {
        set(key, $(`${key}_checkbox`).checked)
    })
}

export function eventHelperSettings(where, callback, position = "beforeend") {
    where.insertAdjacentHTML(position, `
                <div style="margin-top: 10px; display: flex; flex-direction: column;"  id="event_helper_settings_container">
                    <div id="event_helper_settings" class="home_button2 btn_hover2" style="width: fit-content;align-self: center">Настройки EventHelper</div>
                </div>
            `)
    $(`event_helper_settings`).addEventListener("click", (e) => {
        e.target.remove()
        let container = $(`event_helper_settings_container`)
        callback(container)

        let regHTML;
        if (!get("hwm_events_token", null)) {
            regHTML = `
                <div style="width: 100%; text-align: center"><b>Доступна регистрация!</b></div>
                <div id="start_registration" class="home_button2 btn_hover2" style="padding: 2px 4px; margin-top: 4px">Зарегистрироваться</div>
            `
        } else {
            regHTML = ""
        }

        container.insertAdjacentHTML("beforeend", `
                    <div style="align-self: center">
                        ${regHTML}
<!--                        <br>-->
<!--                        <br>-->
<!--                        <br>-->
<!--                        <div style="width: 100%; text-align: center"><b>Реклама!</b></div>-->
<!--                        <p>Крафт ювелирки с откатом 2 пары <a href="/pl_info.php?id=6722246">Kerrigan</a></p>-->
        <!--                <p>Крафт оружия (мгновенный) с откатом 1 пара <a href="/pl_info.php?id=7197821">Гроза_ГВД</a></p>-->
                    </div>
                `)

        if (regHTML) {
            $(`start_registration`).addEventListener("click", startRegistration)
        }
    })
}

