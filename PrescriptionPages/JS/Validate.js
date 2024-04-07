

document.getElementById('btnSubmit').addEventListener('click', (event) => {
    event.preventDefault()
    var inputVal = document.getElementById('prescriptionUUIDInput').value.trim()

    if(inputVal.length < 36)
    {
        alert("Invalid UUID")
        return
    }

    fetch(`https://localhost:44368/api/Prescriptions/ValidatePrescription?prescriptionUID=${inputVal}`)
    .then(res => {
        if (!res.ok) {
            return res.json().then(errorData => {
                alert(errorData["Erorrs"][0]);
            });
        }
        return res.json(); 
    })
    .then(data => {
        if(!data)
        {
            return;    
        }

        localStorage.setItem('prescriptionUID', data.prescriptionUID)
        localStorage.setItem('prescriptionContent', data.prescriptionContent)
        localStorage.setItem('repeatNum', data.repeatNum)
        localStorage.setItem('daysApart', data.daysApart)
        localStorage.setItem('issueDate', data.issueDate)
        localStorage.setItem('doctorPhone', data.doctorPhone)
        localStorage.setItem('doctorCPSONum', data.doctorCPSONum)
        localStorage.setItem('patientName', data.patientName)
        localStorage.setItem('doctorName', data.doctorName)

        window.location.href = 'Prescription.html'
        
    })
    .catch(error => {
        console.error('An error occurred:', error.message);
    });
})

