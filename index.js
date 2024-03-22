async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const loginApiUrl = 'http://students.iiserb.ac.in:8000/api/v1/security/login';

        const response = await fetch(loginApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
            // credentials: 'include'
        });

        // console.log(responseData)

        if (response.status === 200) {
       
            const responseData = await response.json();

            // Login successful, store team ID
            securityDetails = responseData.data;
            localStorage.setItem("accessToken", securityDetails.accessToken)
            window.location.href = "qr.html";

            // fetchLatestStockPrices();
        } else if(response.status === 401) {
            alert("Login failed. Authentication failed")
        } else if(response.status === 400) {
            alert("Login failed. Username or password is required")
        } else if(response.status === 404) {
            alert("Login failed. Security with username not found")
        } else {
            // Handle login failure
            alert(`Login failed. An unexpected error occured`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed. An unexpected error occurred.');
    }
}

document.getElementById('loginBtn').addEventListener('click', login);   