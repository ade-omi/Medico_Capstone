
/*
    DoctorName
    PhoneNumber
    patientName
    issueDate
    prescriptionContent
    repeatNum
    daysApart
    prescriptionUID
    doctorCSPONum


    localStorage.setItem('prescriptionUID', data.prescriptionUID)
    localStorage.setItem('prescriptionContent', data.prescriptionContent)
    localStorage.setItem('repeatNum', data.repeatNum)
    localStorage.setItem('daysApart', data.daysApart)
    localStorage.setItem('issueDate', data.issueDate)
    localStorage.setItem('doctorPhone', data.doctorPhone)
    localStorage.setItem('doctorCPSONum', data.doctorCPSONum)
    localStorage.setItem('patientName', data.patientName)
    localStorage.setItem('doctorName', data.doctorName)
 */


let idList = ['doctorName', 'PhoneNumber', 'patientName', 
            'prescriptionContent', 'repeatNum', 'daysApart',
            'prescriptionUID', 'doctorCSPONum'];

document.addEventListener('DOMContentLoaded', () => {
    idList.forEach(id => {
        $(id).innerText = localStorage.getItem(id)
    })
})

document.addEventListener('beforeunload', () => {
    idList.forEach(id => localStorage.removeItem(id))
})


function $(id)
{
    return document.getElementById(id);
}