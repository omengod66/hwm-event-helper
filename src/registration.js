import {doGet, doHWMGet, doHWMPost} from "./utils/networkUtils";
import {$, my_sign, pl_id, set} from "./utils/commonUtils";

export function startRegistration(event) {
    event.target.outerHTML = `
                <div id="reg_progress" style="text-align: center">Процесс регистрации запущен...</div>
            `
    doGet(`register?pl_id=${pl_id}`, response1 => {
        $(`reg_progress`).innerHTML = "Учетная запись создана..."
        let formData = new FormData()
        formData.append('cdata', Math.floor(Math.random() * (20000 - 1000 + 1) + 1000).toFixed())
        formData.append('action', "")
        formData.append('parent_id', "0")
        formData.append('mailto', response1.receiver)
        formData.append('subject', response1.token)
        formData.append('msg', "")
        formData.append('sign', my_sign)
        formData.append('subm', "%CE%F2%EF%F0%E0%E2%E8%F2%FC+%28CTRL%2BEnter%29")
        doHWMPost(`/sms-create.php`, formData, response2 => {
                $(`reg_progress`).innerHTML = "Производится подтверждение личности..."
                doGet(`checkRegistration?pl_id=${pl_id}`, response3 => {
                    if (response3.status === "good") {
                        $(`reg_progress`).innerHTML = "Регистрация прошла успешно!"
                        set("hwm_events_token", response1.token)
                    } else {
                        $(`reg_progress`).innerHTML = "Что-то пошло не так :("
                    }
                    doHWMGet('/sms.php?box=out', smsOutDoc => {
                        let smsId = smsOutDoc.querySelector('input[type="checkbox"]').value
                        let smsDeleteFormData = new FormData()
                        smsDeleteFormData.append("id1", smsId)
                        smsDeleteFormData.append("box", "out")
                        smsDeleteFormData.append("filter", "")
                        smsDeleteFormData.append("page", "0")
                        smsDeleteFormData.append("action", "mass_delete")
                        doHWMPost("/sms.php", smsDeleteFormData, ()=>{})
                    })
                })
            }
        )
    })
}