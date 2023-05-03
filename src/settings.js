import {startRegistration} from "./registration";
import {$, get, set} from "./utils/commonUtils";
import {LocalizedText, LocalizedTextMap} from "./utils/localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("settings", "Settings", "Настройки", "Настройки"))
    texts.addText(new LocalizedText("support_alert", "If you like this script, please consider supporting it.", "Если тебе нравится этот скрипт, просьба рассмотреть возможность поддержать его работоспособность.", "Якщо тобі подобається цей скрипт, прохання розглянути можливість підтримати його працездатність."))
    texts.addText(new LocalizedText("support", "Keep the services alive", "Поддержать существование сервисов", "Підтримати існування сервісів"))
    texts.addText(new LocalizedText("patreon", "Patreon", "Патреон", "Патреон"))
    texts.addText(new LocalizedText("boosty", "Boosty", "Бусти", "Бусті"))
    texts.addText(new LocalizedText("ok", "X", "X", "X"))
    texts.addText(new LocalizedText("reg_available", "Registration available!", "Доступна регистрация!", "Доступна реєстрація!"))
    texts.addText(new LocalizedText("signup", "Sign up", "Зарегистрироваться", "Зареєструватись"))
    return texts
}

let allTexts = getAllTexts()


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
                    <div id="event_helper_settings" class="home_button2 btn_hover2" style="width: fit-content;align-self: center">${allTexts.get("settings")} EventHelper</div>
                    ${(() => {
                       if (!get("eh_patreon_notification_shown", false)) {
                           return `<div style="    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;"><div>${allTexts.get("support_alert")}</div>
<div style="display: flex;"><div style="    align-items: center;
    display: flex;">${allTexts.get("support")} </div>
<div id="patreon_link" class="home_button2 btn_hover2" style="padding: 2px 4px;
    margin-top: 4px;
    width: fit-content;"><a href="https://www.patreon.com/user?u=58444506" target="_blank" style="display: flex; align-items: center">${allTexts.get("patreon")}<img src="https://cdn.icon-icons.com/icons2/2429/PNG/512/patreon_logo_icon_147253.png" style="height: 24px;"></a></div>
<div id="boosty_link" class="home_button2 btn_hover2" style="padding: 2px 4px;
    margin-top: 4px;
    width: fit-content;"><a href="https://boosty.to/thunder_hwm" target="_blank" style="display: flex; align-items: center">${allTexts.get("boosty")}<img src="https://mikulski.rocks/wp-content/uploads/2022/04/Color.png" style="height: 24px;"></a></div>
<div id="patreon_accept" class="home_button2 btn_hover2" style="padding: 2px 4px;
    margin-top: 4px; margin-left: 10px;
    width: fit-content;">${allTexts.get("ok")}</div></div></div>`
                       } else {
                           return ``
                       }
                    })()}
                </div>
            `)
    if (!get("eh_patreon_notification_shown", false)) {
        $(`patreon_accept`).addEventListener("click", () => {
            set("eh_patreon_notification_shown", true)
        })
    }

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
<div style="display: flex;"><div style="    align-items: center;
    display: flex;">${allTexts.get("support")} </div>
<div id="patreon_link" class="home_button2 btn_hover2" style="padding: 2px 4px;
    margin-top: 4px;
    width: fit-content;"><a href="https://www.patreon.com/user?u=58444506" target="_blank" style="display: flex; align-items: center">${allTexts.get("patreon")}<img src="https://cdn.icon-icons.com/icons2/2429/PNG/512/patreon_logo_icon_147253.png" style="height: 24px;"></a></div>
<div id="boosty_link" class="home_button2 btn_hover2" style="padding: 2px 4px;
    margin-top: 4px;
    width: fit-content;"><a href="https://boosty.to/thunder_hwm" target="_blank" style="display: flex; align-items: center">${allTexts.get("boosty")}<img src="https://mikulski.rocks/wp-content/uploads/2022/04/Color.png" style="height: 24px;"></a></div>
</div>                    </div>
                `)

        if (regHTML) {
            $(`start_registration`).addEventListener("click", startRegistration)
        }
    })
}

