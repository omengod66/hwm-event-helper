import {doGet, doPost} from "./utils/networkUtils";
import {$, my_sign, pl_id, set} from "./utils/commonUtils";

export async function startRegistration(event) {
    event.target.outerHTML = `
                <div id="reg_progress" style="text-align: center">Процесс регистрации запущен...</div>
            `
    let regStatus = $(`reg_progress`)
    let register = await doGet(`register?pl_id=${pl_id}`)
    regStatus.innerHTML = "Учетная запись создана..."

    let formData = new FormData()
    formData.append('cdata', Math.floor(Math.random() * (20000 - 1000 + 1) + 1000).toFixed())
    formData.append('action', "")
    formData.append('parent_id', "0")
    formData.append('mailto', register.receiver)
    formData.append('subject', register.token)
    formData.append('msg', "")
    formData.append('sign', my_sign)
    formData.append('subm', "%CE%F2%EF%F0%E0%E2%E8%F2%FC+%28CTRL%2BEnter%29")

    await doPost(`/sms-create.php`, formData, true)
    regStatus.innerHTML = "Производится подтверждение личности..."

    let validate = await doGet(`checkRegistration?pl_id=${pl_id}`)
    if (validate.status === "good") {
        regStatus.innerHTML = "Регистрация прошла успешно!"
        set("hwm_events_token", register.token)
    } else {
        regStatus.innerHTML = "Что-то пошло не так :("
    }

    let smsOutDoc = await doGet('/sms.php?box=out', true)
    let smsId = smsOutDoc.querySelector('input[type="checkbox"]').value
    let smsDeleteFormData = new FormData()
    smsDeleteFormData.append("id1", smsId)
    smsDeleteFormData.append("box", "out")
    smsDeleteFormData.append("filter", "")
    smsDeleteFormData.append("page", "0")
    smsDeleteFormData.append("action", "mass_delete")
    doPost("/sms.php", smsDeleteFormData, true)
}