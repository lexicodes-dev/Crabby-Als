const fetch = require('node-fetch');

async function testSubmit() {
    try {
        const formData = new FormData();
        formData.append("access_key", "1604c578-6d39-4a0c-92e5-6e075e64e00d");
        formData.append("band-name", "Test Band");
        formData.append("email", "test@test.com");
        
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        
        const data = await response.json();
        console.log(data);
    } catch (e) {
        console.error(e);
    }
}

testSubmit();
