// & Create unchanging variables to add functionality to the webpage
// ~ document.querySelector method returns the element that matches the specified selector
// ~ document.querySelectorAll method returns the all the elements that matches the specified selector
const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

// & create variable for all the characters for password settings-> abc's, #'s, & symbols.
const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*(){}[]:;.,<>+-~/"
} 

// & create functionality to generate the password
const generatePassword = () => {
    let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    // ~ the password length requirement will be whatever the user decides using the length slider
    passLength = lengthSlider.value;

    // ~ will call this function for each time a requirement is checked off to make sure it is met
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword += ` ${staticPassword}  `;
            } else {
                excludeDuplicate = true;
            }
        }
    });

    // ~ this ensures that when the password is being generated this it is random and meets the length specified by the user and that the password characters are not duplicated
    for (let i = 0; i < passLength; i++){
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];

        if (excludeDuplicate) {
            !randomPassword.includes(randomChar) | randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar;
        }
    };

    passwordInput.value = randomPassword;
}; 


// & create a variable to update the password indicator (the strength of the password)-> whether the password is weak, medium, or strong
const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 15 ? "medium" : "strong";
}

// & create a variable to update the number for the slider length with the password is generated
const updateSlider = () => {
    document.querySelector(".pass-length span").innerText = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}

updateSlider();

// & create a variable to copy the password
const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#2ebf91";

    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

// & Event listeners 
copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);


