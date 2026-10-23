// ===============================
// 1. DEFAULT GOALS
// ===============================

let goals = [

    {
        name: "Study Java for 1 hour",
        completed: false
    },

    {
        name: "Solve 2 DSA problems",
        completed: false
    },

    {
        name: "Exercise for 30 minutes",
        completed: false
    },

    {
        name: "Read 20 pages",
        completed: false
    }

];


// ===============================
// 2. SELECT HTML ELEMENTS
// ===============================

let goalInput =
    document.querySelector("#goalInput");

let addButton =
    document.querySelector("#addButton");

let goalsContainer =
    document.querySelector("#goals");

let progressText =
    document.querySelector("#progressText");

let progressBar =
    document.querySelector("#progressBar");

let progressPercentage =
    document.querySelector("#progressPercentage");

let progressDetails =
    document.querySelector("#progressDetails");

let streakText =
    document.querySelector("#streakText");

let affirmationTitle =
    document.querySelector("#affirmationTitle");

let affirmation =
    document.querySelector("#affirmation");

let goalCount =
    document.querySelector("#goalCount");


// ===============================
// 3. AFFIRMATIONS
// ===============================

let affirmations = [

    "🔥 Great job! Keep going!",

    "💪 You are doing amazing!",

    "🌟 One step closer to your goal!",

    "🚀 Keep pushing forward!",

    "❤️ Believe in yourself!",

    "🎯 You completed it! Well done!"

];


// ===============================
// 4. STREAK DATA
// ===============================

let streak = 0;

let lastCompletedDate = null;


// ===============================
// 5. GET TODAY'S DATE
// ===============================

function getToday() {

    let today = new Date();

    let year = today.getFullYear();

    let month = today.getMonth() + 1;

    let day = today.getDate();


    return year + "-" + month + "-" + day;
}


// ===============================
// 6. CHECK IF NEW DAY
// ===============================

function checkNewDay() {

    let today = getToday();


    // If there is no saved date,
    // this is the first time

    if (lastCompletedDate == null) {

        return;

    }


    // If saved date is different from today

    if (lastCompletedDate != today) {


        // Reset today's goals

        for (let i = 0; i < goals.length; i++) {

            goals[i].completed = false;

        }


        saveData();

    }

}


// ===============================
// 7. DISPLAY GOALS
// ===============================

function displayGoals() {


    // Remove old goals

    goalsContainer.innerHTML = "";


    // Show number of goals

    goalCount.textContent =
        goals.length + " goals";


    // If there are no goals

    if (goals.length == 0) {

        let emptyMessage =
            document.createElement("p");

        emptyMessage.textContent =
            "No goals yet. Add your first goal!";

        emptyMessage.classList.add("empty-message");

        goalsContainer.appendChild(emptyMessage);

    }


    // Loop through every goal

    for (let i = 0; i < goals.length; i++) {


        // ===============================
        // CREATE ELEMENTS
        // ===============================

        let goalDiv =
            document.createElement("div");


        let checkbox =
            document.createElement("input");


        let goalText =
            document.createElement("span");


        let deleteButton =
            document.createElement("button");


        // ===============================
        // ADD CLASSES
        // ===============================

        goalDiv.classList.add("goal");


        deleteButton.classList.add(
            "delete-button"
        );


        // ===============================
        // CHECKBOX
        // ===============================

        checkbox.type = "checkbox";


        checkbox.checked =
            goals[i].completed;


        // ===============================
        // GOAL TEXT
        // ===============================

        goalText.textContent =
            goals[i].name;


        // ===============================
        // DELETE BUTTON
        // ===============================

        deleteButton.textContent =
            "Delete";


        // ===============================
        // SHOW COMPLETED STYLE
        // ===============================

        if (goals[i].completed == true) {

            goalDiv.classList.add("completed");

        }


        // ===============================
        // CHECKBOX EVENT
        // ===============================

        checkbox.addEventListener(
            "change",
            function() {


                // Store checkbox value

                goals[i].completed =
                    checkbox.checked;


                // If goal was completed

                if (goals[i].completed == true) {

                    showAffirmation();

                    checkDailyCompletion();

                }


                // Save everything

                saveData();


                // Refresh page content

                displayGoals();

            }
        );


        // ===============================
        // DELETE EVENT
        // ===============================

        deleteButton.addEventListener(
            "click",
            function() {


                // Remove this goal

                goals.splice(i, 1);


                // Save

                saveData();


                // Refresh

                displayGoals();

            }
        );


        // ===============================
        // PUT ELEMENTS TOGETHER
        // ===============================

        goalDiv.appendChild(checkbox);

        goalDiv.appendChild(goalText);

        goalDiv.appendChild(deleteButton);


        // Add goal to page

        goalsContainer.appendChild(goalDiv);

    }


    // Update progress

    updateProgress();

}


// ===============================
// 8. ADD NEW GOAL
// ===============================

addButton.addEventListener(
    "click",
    function() {


        // Get input

        let newGoal =
            goalInput.value.trim();


        // Check empty

        if (newGoal == "") {

            alert("Please enter a goal!");

            return;

        }


        // Add new goal

        goals.push({

            name: newGoal,

            completed: false

        });


        // Clear input

        goalInput.value = "";


        // Save

        saveData();


        // Display

        displayGoals();

    }
);


// ===============================
// 9. PRESS ENTER TO ADD GOAL
// ===============================

goalInput.addEventListener(
    "keydown",
    function(event) {


        if (event.key == "Enter") {

            addButton.click();

        }

    }
);


// ===============================
// 10. UPDATE PROGRESS
// ===============================

function updateProgress() {


    let totalGoals =
        goals.length;


    let completedGoals = 0;


    // Count completed goals

    for (let i = 0; i < goals.length; i++) {


        if (goals[i].completed == true) {

            completedGoals++;

        }

    }


    // Calculate percentage

    let percentage = 0;


    if (totalGoals > 0) {

        percentage =
            Math.round(
                (completedGoals / totalGoals) * 100
            );

    }


    // ===============================
    // UPDATE TEXT
    // ===============================

    progressText.textContent =
        percentage + "%";


    progressPercentage.textContent =
        percentage + "%";


    progressDetails.textContent =
        completedGoals +
        " of " +
        totalGoals +
        " goals completed";


    // ===============================
    // UPDATE BAR
    // ===============================

    progressBar.style.width =
        percentage + "%";


    // ===============================
    // UPDATE STREAK
    // ===============================

    if (streak == 1) {

        streakText.textContent =
            "1 day";

    } else {

        streakText.textContent =
            streak + " days";

    }

}


// ===============================
// 11. CHECK DAILY COMPLETION
// ===============================

function checkDailyCompletion() {


    // If there are no goals

    if (goals.length == 0) {

        return;

    }


    // Check whether every goal
    // has been completed

    let allCompleted = true;


    for (let i = 0; i < goals.length; i++) {


        if (goals[i].completed == false) {

            allCompleted = false;

            break;

        }

    }


    // If not everything is completed

    if (allCompleted == false) {

        return;

    }


    // Get today's date

    let today = getToday();


    // Don't count the same day twice

    if (lastCompletedDate == today) {

        return;

    }


    // ===============================
    // CHECK PREVIOUS DAY
    // ===============================

    if (lastCompletedDate == null) {


        // First completed day

        streak = 1;

    } else {


        let yesterday =
            getYesterday();


        if (lastCompletedDate == yesterday) {


            // Continued streak

            streak++;

        } else {


            // Streak was broken

            streak = 1;

        }

    }


    // Save today's completion date

    lastCompletedDate = today;


    // Show success message

    affirmationTitle.textContent =
        "🔥 Daily Goal Complete!";


    affirmation.textContent =
        "Amazing! You completed all your goals today!";


    // Save data

    saveData();

}


// ===============================
// 12. GET YESTERDAY
// ===============================

function getYesterday() {


    let date = new Date();


    date.setDate(
        date.getDate() - 1
    );


    let year =
        date.getFullYear();


    let month =
        date.getMonth() + 1;


    let day =
        date.getDate();


    return year + "-" + month + "-" + day;

}


// ===============================
// 13. SHOW RANDOM AFFIRMATION
// ===============================

function showAffirmation() {


    let randomNumber =
        Math.floor(
            Math.random() *
            affirmations.length
        );


    affirmationTitle.textContent =
        "🎉 Goal Completed!";


    affirmation.textContent =
        affirmations[randomNumber];

}


// ===============================
// 14. SAVE EVERYTHING
// ===============================

function saveData() {


    // Save goals

    localStorage.setItem(

        "myGoals",

        JSON.stringify(goals)

    );


    // Save streak

    localStorage.setItem(

        "myStreak",

        streak

    );


    // Save completion date

    localStorage.setItem(

        "lastCompletedDate",

        lastCompletedDate

    );

}


// ===============================
// 15. LOAD EVERYTHING
// ===============================

function loadData() {


    // Load goals

    let savedGoals =
        localStorage.getItem("myGoals");


    if (savedGoals != null) {


        goals =
            JSON.parse(savedGoals);

    }


    // Load streak

    let savedStreak =
        localStorage.getItem("myStreak");


    if (savedStreak != null) {


        streak =
            Number(savedStreak);

    }


    // Load last completion date

    let savedDate =
        localStorage.getItem(
            "lastCompletedDate"
        );


    if (
        savedDate != null &&
        savedDate != "null"
    ) {


        lastCompletedDate =
            savedDate;

    }

}


// ===============================
// 16. START APPLICATION
// ===============================

loadData();

checkNewDay();

displayGoals();