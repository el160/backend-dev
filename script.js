

//   Registration Form validation

document.getElementById('registrationform').onsubmit = function (event) {
    let valid = true;

    // First Name Validation
    let firstname = document.getElementById('First-Name').value;
    if (firstname === '') {
        document.getElementById('first-name-error').innerText = 'Error! First name is required.';
        valid = false;
    } else {
        document.getElementById('first-name-error').innerText = ''; // Clear error if valid
    }

    // Last Name Validation
    let lastname = document.getElementById('Last-Name').value;
    if (lastname === '') {
        document.getElementById('last-name-error').innerText = 'Error! Last name is required.';
        valid = false;
    } else {
        document.getElementById('last-name-error').innerText = ''; // Clear error if valid
    }

    // Email Validation
    let email = document.getElementById('Email').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === '') {
        document.getElementById('email-error').innerText = 'Error! Email is required.';
        valid = false;
    } else if (!emailPattern.test(email)) {  // Fix here
        document.getElementById('email-error').innerText = 'Error! Please enter a valid email address.';
        valid = false;
    } else {
        document.getElementById('email-error').innerText = ''; // Clear error if valid
    }

    // Age Validation
    let age = document.getElementById('Age').value;
    if (age === '') {
        document.getElementById('age-error').innerText = 'Error! Age is required.';
        valid = false;
    } else if (isNaN(age) || age < 18) {
        document.getElementById('age-error').innerText = 'Error! Age must be a number not less than 18.';
        valid = false;
    } else {
        document.getElementById('age-error').innerText = ''; // Clear error if valid
    }

// Password Validation
let password = document.getElementById('password').value;
if (password === '') {
    document.getElementById('password-error').innerText = 'Error! Password is required.';
    valid = false;
} else if (password.length < 6) {
    document.getElementById('password-error').innerText = 'Error! Password must be at least 6 characters.';
    valid = false;
} else {
    document.getElementById('password-error').innerText = ''; // Clear error if valid
}

// Confirm Password Validation
let confirmPassword = document.getElementById('confirm-password').value;
if (confirmPassword === '') {
    document.getElementById('confirm-password-error').innerText = 'Error! Confirm Password is required.';
    valid = false;
} else if (confirmPassword !== password) {
    document.getElementById('confirm-password-error').innerText = 'Error! Passwords do not match.';
    valid = false;
} else {
    document.getElementById('confirm-password-error').innerText = ''; // Clear error if valid
}
// terms and conditions checkbox validation

let terms = document.getElementById('terms').checked;
if (!terms) {
    document.getElementById('terms-error').innerText = 'Error! You must agree to the Terms and Conditions.';
    valid = false;
} else {
    document.getElementById('terms-error').innerText = ''; // Clear error if valid
}

if (!valid) {
    event.preventDefault(); // Prevent form submission if invalid
}


};
// Login form validation
document.getElementById('login-form').onsubmit = function(event) {
let valid = true;

// User Password Validation
let userpassword = document.getElementById('user-password').value;
if (userpassword === '') {
    document.getElementById('user-password-error').innerText = 'Error! Password is required.';
    valid = false;
} else if (userpassword.length < 6) { 
    document.getElementById('user-password-error').innerText = 'Error! Password must be at least 6 characters.';
    valid = false;
} else {
    document.getElementById('user-password-error').innerText = ''; // Clear error if valid
}

// User Email Validations
let userEmail = document.getElementById('user-email').value;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (userEmail === '') {
    document.getElementById('user-email-error').innerText = 'Error! Email is required.';
    valid = false;
} else if (!emailPattern.test(userEmail)) {  // Fix condition here
    document.getElementById('user-email-error').innerText = 'Error! Please enter a valid email address.';
    valid = false;
} else {
    document.getElementById('user-email-error').innerText = ''; // Clear error if valid
}

// Username Validation
let username = document.getElementById('username').value;
if (username === '') {
    document.getElementById('username-error').innerText = 'Error! Username is required.';
    valid = false;
} else {
    document.getElementById('username-error').innerText = ''; // Clear error if valid
}

if (!valid) {
    event.preventDefault(); // Prevent form submission if invalid
}


// toggle the visibility of the login form
document.getElementById("login-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    const loginForm = document.getElementById("login-form");
    loginForm.style.display = (loginForm.style.display === "none" || loginForm.style.display === "") ? "block" : "none";
});

};

// registration data form handling 

document.addEventListener("DOMContentLoaded", function() {
    // Grab the form and the area where we will display the form data
    const form = document.getElementById("registrationform");
    const summarySection = document.createElement('div');
    form.insertAdjacentElement('afterend', summarySection); // Add summary section after form
    
    // This event  clicks submit
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Stop the form from refreshing the page
        
        // Grab all form values
        const firstName = document.getElementById("First-Name").value;
        const lastName = document.getElementById("Last-Name").value;
        const email = document.getElementById("Email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const age = document.getElementById("Age").value;
        const gender = document.querySelector('input[name="Gender"]:checked');
        const contactMethod = document.querySelector('input[name="contact"]:checked');
        const termsAccepted = document.getElementById("terms").checked;

        // Simple validation
        let valid = true; // Assume everything is valid

        // Check if any required fields are empty
        if (!firstName || !lastName || !email || !password || !confirmPassword || !age || !gender || !contactMethod) {
            alert("Please fill out all required fields.");
            valid = false;
        }

        // Validate email format
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            valid = false;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            valid = false;
        }

        // Check if terms are accepted
        if (!termsAccepted) {
            alert("You need to accept the terms and conditions.");
            valid = false;
        }

        // If the form isn't valid, stop here
        if (!valid) return;

        // // Create a form data object to store all info
        const formData = {
            firstName,
            lastName,
            email,
           age,
            gender: gender ? gender.value : '',
           contactMethod: contactMethod ? contactMethod.value : '',
         };

        // Display the form data in the summary section
        summarySection.innerHTML = `
             <h3>Registration Summary</h3>
             <p><strong>Full Name:</strong> ${formData.firstName} ${formData.lastName}</p>
             <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Age:</strong> ${formData.age}</p>
             <p><strong>Gender:</strong> ${formData.gender}</p>
             <p><strong>Preferred Contact Method:</strong> ${formData.contactMethod}</p>
        `;

        // Display a success message
        alert("Form submitted successfully!");
    });

    // Email validation function (make sure the email looks like 'example@domain.com')
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression to match email format
        return re.test(String(email).toLowerCase());
    }

    // Real-time feedback for email validation (inform user if the email is wrong)
    document.getElementById("Email").addEventListener("input", function() {
        const email = this.value;
        const emailError = document.getElementById("email-error");
        if (!validateEmail(email)) {
            emailError.textContent = "Invalid email format.";
        } else {
            emailError.textContent = "";
        }
    });
});



//front-end form that allows patients to book appointments and log in.

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;
    const username = document.getElementById("username").value;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, email, password }),
    })
    .then((response) => response.text())
    .then((data) => {
        alert(data); // Show success message or handle errors
    });
});

///// backend  login/Resisten function



// document.getElementById('registrationform').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const firstName = document.getElementById('First-Name').value; 
//     const lastName = document.getElementById('last-Name').value;
//     const email = document.getElementById('Email').value; 
//     const password = document.getElementById('password').value; 
//     const male = document.getElementById('male').value; 
//     const female = document.getElementById('female').value;
//     //send the request to the server
//     const response = await fetch('/auth/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({ first_name,last_name,male,female, email, password })
//     });
//     const data = await response.json();

//     console.log('server response,',data)
    
//     alert(data.message,'New user created');
// });


// document.getElementById('login-form').addEventListener('submit', async function(e) {
//     e.preventDefault();
//     const email = document.getElementById('user-email').value; 
//     const password = document.getElementById('user-password').value; 

//     //send the request to the server
//     const response = await fetch('/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     });
//     const data = await response.json();
//     alert(data.message + 'Welcome ' + data.name + ' of email address: ' + data.email);
       
// });