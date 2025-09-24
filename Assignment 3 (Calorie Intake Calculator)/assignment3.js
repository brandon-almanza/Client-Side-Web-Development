function calculateCalories(event) {

    //Prevent form from submitting
    event.preventDefault();

    //Get values from the form
    var age = parseInt(document.getElementById("age").value);
    var sex = document.querySelector('input[name="sex"]:checked')?.value;
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var unit = document.getElementById("unit").value;
    var activity = document.getElementById("activity").value;

    //Check if the inputs are valid
    if (isNaN(age) || isNaN(height) || isNaN(weight) || !sex) {
        alert("Please fill in all fields correctly.");
        return;
    }

    //Convert weight and height to imperial
    //inch to cm and pounds to kg
    if (unit === "imperial") {
        height *= 2.54;
        weight *= 0.453592;
    }

    var bmr;
    //Calculate male BMR
    if (sex === "male"){
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    }
    //Calculate female BMR
    else{
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    //Initialize activity level
    const activityLevel = {
        "none": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "heavy": 1.725,
    };

    var dailyCalories = bmr * activityLevel[activity];

    //display the output
    document.getElementById("output").innerHTML = `
        <h2>BMR: ${bmr.toFixed(2)}</h2>
        <h2>Calories per day: ${dailyCalories.toFixed(2)}</h2>`;

}