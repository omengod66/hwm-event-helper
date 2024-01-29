import {startRegistration} from "./registration";
import {$, get, set} from "./utils/commonUtils";
import {LocalizedText, LocalizedTextMap} from "./utils/localizationUtils";

function getAllTexts() {
    let texts = new LocalizedTextMap()
    texts.addText(new LocalizedText("settings", "Settings", "Настройки", "Налаштування"))
    texts.addText(new LocalizedText("support_alert", "If you like this script, please consider supporting it.", "Если тебе нравится этот скрипт, просьба рассмотреть возможность поддержать его работоспособность.", "Якщо тобі подобається цей скрипт, прохання розглянути можливість підтримати його працездатність."))
    texts.addText(new LocalizedText("support", "Keep the services alive", "Поддержать существование сервисов", "Підтримати існування сервісів"))
    texts.addText(new LocalizedText("patreon", "Patreon", "Патреон", "Патреон"))
    texts.addText(new LocalizedText("boosty", "Boosty", "Бусти", "Бусті"))
    texts.addText(new LocalizedText("ok", "Hide", "Скрыть", "Сховати"))
    texts.addText(new LocalizedText("warning", "Warning!", "Внимание!", "Увага!"))
    texts.addText(new LocalizedText("hide", "Hide", "Скрыть", "Сховати"))
    texts.addText(new LocalizedText("reg_available", "Registration available!", "Доступна регистрация!", "Доступна реєстрація!"))
    texts.addText(new LocalizedText("signup", "Sign up", "Зарегистрироваться", "Зареєструватись"))
    texts.addText(new LocalizedText("manifest_notif",
        `&emsp;In the summer, Google will launch Manifest V3, which will limit the use of userscripts in Chromium-based browsers (Chrome, Edge, Opera). 
                    However, according to the official <a style="color: cornflowerblue;" href="https://developer.chrome.com/docs/extensions/reference/api/userScripts#developer_mode_for_extension_users">documentation</a>, the user can enable developer mode to remove restrictions. 
                    If you see this message, your browser may no longer support scripts. <br>Prevention requires:
                    <p>&emsp;1. Paste into the address bar and open</p>
                    <p>&emsp;&emsp;- in Chrome, Kiwi <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">chrome://extensions</span></p>
                    <p>&emsp;&emsp;- in Edge <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">edge://extensions</span></p>
                    <p>&emsp;&emsp;- in Opera <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">opera://extensions</span></p>
                    <p>&emsp;2. Click on the "developer mode" switch if it is not already on.</p>`,
        `&emsp;Летом Google запустит Manifest V3, который в браузерах на основе Chromium (Chrome, Edge, Opera) ограничит использование скриптов. 
                    Однако согласно официальной <a style="color: cornflowerblue;" href="https://developer.chrome.com/docs/extensions/reference/api/userScripts#developer_mode_for_extension_users">документации</a>, пользователь может включить режим разработчика, чтобы снять ограничения. 
                    Если ты видишь это сообщение, твой браузер может перестать поддерживать скрипты. <br>Для предотвращение нужно:
                    <p>&emsp;1. Вставить в адресную строку и открыть</p>
                    <p>&emsp;&emsp;- в Chrome, Kiwi <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">chrome://extensions</span></p>
                    <p>&emsp;&emsp;- в Edge <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">edge://extensions</span></p>
                    <p>&emsp;&emsp;- в Opera <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">opera://extensions</span></p>
                    <p>&emsp;2. Нажать на переключатель "режим разработчика" или "developer mode" если он еще не во включенном состоянии.</p>`,
        `&emsp;Влітку Google запустить Manifest V3, який у браузерах на основі Chromium (Chrome, Edge, Opera) обмежить використання скриптів. 
                    Однак згідно офіційної <a style="color: cornflowerblue;" href="https://developer.chrome.com/docs/extensions/reference/api/userScripts#developer_mode_for_extension_users">документації</a>, користувач може увімкнути режим розробника, щоб зняти обмеження. 
                    Якщо ти бачиш це повідомлення, твій браузер може перестати підтримувати скрипти. <br>Для запобігання потрібно:
                    <p>&emsp;1. Вставити в адресний рядок та відкрити</p>
                    <p>&emsp;&emsp;- у Chrome, Kiwi <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">chrome://extensions</span></p>
                    <p>&emsp;&emsp;- у Edge <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">edge://extensions</span></p>
                    <p>&emsp;&emsp;- у Opera <span style="background-color: #504c4c;padding: 3px;border-radius: 3px;">opera://extensions</span></p>
                    <p>&emsp;2. Натиснути на перемикач "режим розробника" або "developer mode", якщо він ще не увімкнений.</p>`))
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
    let scriptNotice = ""
    if (!!window.chrome) {
        scriptNotice = `
            <div style="display: flex; flex-direction: column">
                <div style="color: #dadada;background-color: #862d2d;text-align: center;font-weight: bold;">⚠️${allTexts.get("warning")}</div>
                <div style="color: #dadada; background-color: #690303; padding: 5px">
                    ${allTexts.get("manifest_notif")}
                    <div><div class="home_button2 btn_hover2" id="eh_manifest_notif_hide" style="width: fit-content; margin: auto">${allTexts.get("hide")}</div></div>
                </div>
            </div>
        `
    }
    where.insertAdjacentHTML(position, `
                <div style="margin-top: 10px; display: flex; flex-direction: column;"  id="event_helper_settings_container">
                    <div id="event_helper_settings" class="home_button2 btn_hover2" style="width: fit-content;align-self: center">${allTexts.get("settings")} EventHelper</div>
                    ${(() => {
                        if (!get("eh_manifest_notif_shown", false)) {
                            return scriptNotice
                        } else {
                            return ``
                        }
                    })()}
                    ${(() => {
                       if (!get("eh_patreon_notification_shown", false)) {
                           return `<div style="align-self: center;display: flex;flex-direction: column;align-items: center;">
                                        <div>${allTexts.get("support_alert")}</div>
                                        <div style="display: flex;">
                                            <div style="    align-items: center;
                                                display: flex;">${allTexts.get("support")} </div>
                                            <div id="patreon_link" class="home_button2 btn_hover2" style="padding: 2px 4px;
                                                margin-top: 4px;
                                                width: fit-content;"><a href="https://www.patreon.com/user?u=58444506" target="_blank" style="display: flex; align-items: center">${allTexts.get("patreon")}<img src="https://cdn.icon-icons.com/icons2/2429/PNG/512/patreon_logo_icon_147253.png" style="height: 24px;"></a></div>
                                            <div id="boosty_link" class="home_button2 btn_hover2" style="padding: 2px 4px;
                                                margin-top: 4px;
                                                width: fit-content;"><a href="https://boosty.to/thunder_hwm" target="_blank" style="display: flex; align-items: center">${allTexts.get("boosty")}<img src="https://mikulski.rocks/wp-content/uploads/2022/04/Color.png" style="height: 24px;"></a></div>
                                            <div id="patreon_accept" class="home_button2 btn_hover2" style="padding: 2px 4px;
                            margin-top: 4px; margin-left: 10px;
                            width: fit-content;">${allTexts.get("ok")}</div>
                                        </div>
                                    </div>`
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

    if (!get("eh_manifest_notif_shown", false)) {
        let button = $(`eh_manifest_notif_hide`)
        if (button) {
            button.addEventListener("click", () => {
                set("eh_manifest_notif_shown", true)
                button.parentElement.parentElement.parentElement.remove()
            })
        }
    }

    $(`event_helper_settings`).addEventListener("click", (e) => {
        e.target.remove()
        let container = $(`event_helper_settings_container`)
        callback(container)

        let regHTML;
        if (!get("hwm_events_token", null)) {
            regHTML = `
                <div style="width: 100%; text-align: center"><b>${allTexts.get("reg_available")}</b></div>
                <div id="start_registration" class="home_button2 btn_hover2" style="padding: 2px 4px; margin-top: 4px">${allTexts.get("signup")}</div>
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

