function formValidation(){
const firstname = document.getElementById('firstname').value.trim();
const lastname = document.getElementById('lastname').value.trim();
const address = document.getElementById('address').value.trim();
const city = document.getElementById('city').value.trim();
const postalCode = document.getElementById('postalcode').value.trim();
const province = document.getElementById('province').value.trim();
const age = document.getElementById('age').value.trim();
const password = document.getElementById('password').value.trim();
const confirmPassword = document.getElementById('confirmpassword').value.trim();
const email = document.getElementById('email').value.trim();

if (!firstname || !lastname || !address || !city || !postalCode || !province || !age || !password || !confirmPassword || !email) {
    alert("All fields are required.");
    return false;
}

const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
if (!postalCodeRegex.test(postalCode)) {
    alert("Postal code must be in the format a0a0a0.");
    return false;
}

const validProvinces = ["QC", "ON", "MN", "SK", "AB", "BC"];
if (!validProvinces.includes(province)) {
    alert("Please select a valid province.");
    return false;
}

if (parseInt(age) < 18) {
    alert("You must be at least 18 years old.");
    return false;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
    alert("Please enter valid email address. Try again.");
    return false;
}

if (password !== confirmPassword) {
    alert("Passwords do not match, Try again.");
    return false;
}

const passwordRegex = /^(?=.*\d)(?=.*[A-Z]).{6,}$/;
if (!passwordRegex.test(password)) {
    alert("Password must be at least 6 characters long, have at least one number, and one uppercase letter.");
    return false;
}

alert("Thanks for registering! Your member data was created successfully.");
return true;
}
