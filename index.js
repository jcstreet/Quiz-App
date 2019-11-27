"use strict";

let tally = 0; 
let score = 0;
let questionNumber = 0;

// Gets the ball rolling when a user clicks the begin button
function beginQuiz() {
    $(".begin").on("click", function (event){
        event.preventDefault();
        $(".quizbox h1").hide();
        loadQAndA(questionNumber);
    });
}

// Grabs the appropriate quiz question and answer from STORE 
function loadQAndA(i) {
    // clears out any previous validation errors
    $("#quiz-form").get(0).reset();
    // load question
    let quizQuestion = (i + 1).toString() + ". " + STORE[i].question;
    $(".question").html(quizQuestion);
    // load answers
    STORE[i].options.forEach(function(val, index) {
        $(`<div><input type="radio" id="${questionNumber}-${index}" name="answer" value="${val}" required>
        <label for="${questionNumber}-${index}">${val}</label></div>`).appendTo(".just-answers")
    });
    $(".button").hide();
    $(".submit").show();
}

// When a user clicks the submit button, runs the answer check 
function submitThatAnswer() {
    $("#quiz-form").on("submit", function(event) {
        event.preventDefault();
        $(".question").html("")
        checkThatAnswer();
        $(".button").hide();
        $(".next").show();
    });
}

// Grabs the user's answer and compares it against the right answer
function checkThatAnswer() {
    let userAnswer = $("input:checked").val();
    let corrAnswer = STORE[questionNumber].correctAnswer;
    if (userAnswer === corrAnswer) {
        $(".just-answers").html("<h2>Purrfect! You are correct!</h2>");
        tally++;
        updateThatScoreboard(tally);
    } else {
        $(".just-answers").html(`<h2>Oh darn, the correct answer was "${corrAnswer}". Stay paw-sitive! You’ll get it next time! </h2>`);
    }
}

// Makes sure the score is up-to-date 
function updateThatScoreboard(i) {
    score = Math.round(100 * (i / STORE.length));
    $(".score-percent").html(score + "%");
    $(".score-fraction").html(i + "/" + STORE.length + " correct");
}

// When the user clicks the next button, displays either a question or the final score
function nextQuestion() {
    $(".next").on("click", function(event) {
        questionNumber++;
        if (questionNumber < STORE.length) {
            $(".just-answers").html("");
            loadQAndA(questionNumber);
        } else {
            thisIsTheEnd();
        }
    });
}

// Displays the final score at the end of the quiz
function thisIsTheEnd() {
    $(".final-message").html("Your final score is " + score + "%! Feline lucky? Try again!");
    $(".question").html("");
    $(".just-answers").html("");
    $(".button").hide();
    $(".again").show();
}

// Resets the score if the user wants to start again
function resetScore(){
    tally = 0;
    score = 0;
    questionNumber = 0;
}

// Handles if the user clicks the start again button
function startAgain() {
    $(".again").on("click", function(event) {
        $(".final-message").html("");
        resetScore();
        updateThatScoreboard(questionNumber);
        loadQAndA(questionNumber);
    });
    
}

// This does all of the things
function doAllTheThings() {
    beginQuiz();
    submitThatAnswer();
    nextQuestion();
    startAgain();
}

$(doAllTheThings);