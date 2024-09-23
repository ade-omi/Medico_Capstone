// handler for patient signup
function signUpHandler() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Extract the form data
            const formData = {
                username: document.getElementById('username').value,
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phoneNumber: document.getElementById('phoneNumber').value,
                dateOfBirth: document.getElementById('dateOfBirth').value,
                gender: document.getElementById('gender').value,
                healthCardNumber: document.getElementById('healthCardNumber').value,
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirmPassword').value,
            };

            // Perform validation checks, e.g., if passwords match
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            // Send the form data to the server
            fetch('http://localhost:44368/api/signup-patient', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Signup failed');
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                window.location.href = 'login-patient.html';  // Redirect to login after signup
            })
            .catch(error => {
                alert(error.message);
            });
        });
    }
}

// Call the signup handler function
signUpHandler();
