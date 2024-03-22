document.addEventListener('DOMContentLoaded', function () {
    const startScanBtn = document.getElementById('startScanBtn');
    const qrResult = document.getElementById('qrResult');
    console.log(document.cookie)

    // startScanBtn.addEventListener('click', function () {
    //     // Function to handle QR scanning
    //     var html5QrcodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    //     html5QrcodeScanner.render(onScanSuccess);


    //     function onScanSuccess(decodedText, decodedResult) {
    //     // Handle on success condition with the decoded text or result.
    //     console.log(`Scan result: ${decodedText}`, decodedResult);
    //     qrResult.innerText = scannedText;
    //     // ...
    //     html5QrcodeScanner.clear();
    //     // ^ this will stop the scanner (video feed) and clear the scan area.
    //     }

    //     function onScanFailure(error) {
    //         // handle scan failure, usually better to ignore and keep scanning.
    //         // for example:
    //         console.warn(`Code scan error = ${error}`);
    //     }

    //     html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    // });

    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeSuccessCallback = async function(decodedText, decodedResult) {
        qrResult.innerText= decodedText
        html5QrCode.stop()
        console.log(decodedText)
        const response = await fetch(
            "http://localhost:8000/api/v1/security/verify-hash",
            {
                method: "POST",
                headers: {
                    "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY4OGRlMDQxY2Q5NDMxMGI1N2Q2ZGUiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJ1c2VybmFtZSI6InRlc3RuYW1lIiwiZnVsbE5hbWUiOiJUZXN0IiwiaWF0IjoxNzExMDU5MjAxLCJleHAiOjE3MTExNDU2MDF9.ZFYIrKBWWh1djGOsIKhNQdHb4yb-3h5BzgR8rbDoXr4",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"hash" : decodedText })
            }
        )
        const data = await response.json()
        qrResult.innerText = data.data.fullName
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


