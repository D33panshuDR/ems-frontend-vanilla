document.addEventListener('DOMContentLoaded', function () {
    const startScanBtn = document.getElementById('startScanBtn');
    const qrResult = document.getElementById('qrResult');
    const scannerSection = document.getElementById("scannerSection")
    const acceptedSection = document.getElementById("acceptedSection")
    const deniedSection = document.getElementById("deniedSection")

    const accessToken = localStorage.getItem("accessToken")

    const fullName = document.getElementById("fullName")
    const email = document.getElementById("email")
    const purpose = document.getElementById("purpose")
    const access = document.getElementById("access")
    const photoId = document.getElementById("photoId")
    const institution = document.getElementById("institution")

    if(!accessToken) window.location.href = "index.html"

    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = async function(decodedText, decodedResult) {
        qrResult.innerText= decodedText
        html5QrCode.stop()
        const response = await fetch(
            "http://students.iiserb.ac.in:8000/api/v1/security/verify-hash",
            {
                method: "POST",
                headers: {
                    "Authorization" : `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"hash" : decodedText })
            }
        )

        if(response.status === 200) {
            const data = await response.json()
            const teamMember = data.data

            scannerSection.classList.add("hidden")
            acceptedSection.classList.remove("hidden")

            //Update the html tags
            fullName.innerText = teamMember.fullName
            email.innerText = teamMember.email
            purpose.innerText = teamMember.purpose
            access.innerText = teamMember.access.split(",")
            photoId.src = teamMember.photoId
            institution.innerText = teamMember.institution
        } else {
            scannerSection.classList.add("hidden")
            deniedSection.classList.remove("hidden")
        }
        

    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    startScanBtn.addEventListener("click", function() {
        // If you want to prefer back camera
        html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
    })

    // // Select front camera or fail with `OverconstrainedError`.
    // html5QrCode.start({ facingMode: { exact: "user"} }, config, qrCodeSuccessCallback);

    // // Select back camera or fail with `OverconstrainedError`.
    // html5QrCode.start({ facingMode: { exact: "environment"} }, config, qrCodeSuccessCallback);
 });


