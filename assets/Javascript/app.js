var TriviaQuestion = {
    Question: null,
    CorrectAndWrongArray: null,
    CorrectAnswer: null,
    QuestionNumber: 0,
    GuessedQuestion: null,
    queryURL: "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple",
    GetQuestions: function () {
        return $.ajax({
            url: queryURL,
            method: "GET"
        });
    },

};



var queryURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";
$(document).ready(function () {
    document.getElementById("MainGame").style.display = "none";
    document.getElementById("LoadingScreen").style.display = "none";

    TriviaQuestion.GetQuestions().done(function (response) {

        TriviaQuestion.Question = response.results;
        var myTime;
        var othertime;
        var time = 0;

        var QuestionNumber = 0;
        var CorrectAnswer = 0;
        var othertime;

        function myTimer(sec) {
            time = sec;
            myTime = setInterval(timer, 1000);
        };

        function loadingTime() {
            console.log("sfjkalsfjksf");

            time--;
            console.log(time);
            $("#Timeleft").empty();
            $("#Timeleft").append("Next Question in: " + time);
            if (time === 0) {
                clearInterval(othertime);

                setQuestion();
                console.log("jflkafjsalfjskfjsklfjsd;");

            }

        }

        function loadingTimer() {
            console.log("loading Timer");
            time = 5;
            othertime = setInterval(loadingTime, 1000);
        }

        function timer() {
            console.log(TriviaQuestion.CorrectAnswer);
            time = time - 1;
            $("#timer").empty();
            $("#timer").append("Time left: " + time);
            if (time === 0) {
                RanOutOftime();
                clearInterval(myTime);
            }
        }

        function RanOutOftime() {
            clearInterval(myTime);
            console.log("Runoutoftime");
            document.getElementById("MainGame").style.display = "none";
            document.getElementById("LoadingScreen").style.display = "initial";
            $("#WinnerOrLower").empty();
            console.log("Runoutoftime");
            $("#WinnerOrLower").append("You Ran out of time!");
            console.log("Runoutoftime");
            $("#RightAnswer").empty();
            console.log("Runoutoftime");
            $("#RightAnswer").append("The Correct Answer was: " + TriviaQuestion.CorrectAnswer)
            console.log("Runoutoftime");
            loadingTimer();
            console.log(TriviaQuestion.CorrectAnswer)
        }


        function setQuestion() {
            if (TriviaQuestion.QuestionNumber === 9) {
                document.getElementById("LoadingScreen").style.display = "initial";
                document.getElementById("StartMenu").style.display = "none";
                document.getElementById("MainGame").style.display = "none";
                $("#Timeleft").empty();
                $("#Timeleft").append("Congrats you answered " + CorrectAnswer  + " out of " + " 10 " + " right!");
            } else {
                myTimer(10);
                document.getElementById("LoadingScreen").style.display = "none";
                document.getElementById("StartMenu").style.display = "none";
                document.getElementById("MainGame").style.display = "initial";
                $("#Question").html(TriviaQuestion.Question[TriviaQuestion.QuestionNumber].question);
                TriviaQuestion.CorrectAnswer = TriviaQuestion.Question[TriviaQuestion.QuestionNumber].correct_answer;
                TriviaQuestion.CorrectAndWrongArray = [TriviaQuestion.Question[TriviaQuestion.QuestionNumber].correct_answer, TriviaQuestion.Question[TriviaQuestion.QuestionNumber].incorrect_answers[0], TriviaQuestion.Question[TriviaQuestion.QuestionNumber].incorrect_answers[1], TriviaQuestion.Question[TriviaQuestion.QuestionNumber].incorrect_answers[2]];
                console.log(TriviaQuestion.CorrectAndWrongArray.length);
                for (i = 0; i < TriviaQuestion.CorrectAndWrongArray.length; i++) {
                    console.log(TriviaQuestion.CorrectAndWrongArray[i]);
                }
                QuestionNumber++;
                setAnswer();
                TriviaQuestion.QuestionNumber++;
            }

        }

        function setAnswer() {
            var AnswerNumber = 1;
            TriviaQuestion.CorrectAndWrongArray = shuffle(TriviaQuestion.CorrectAndWrongArray);
            for (i = 0; i < TriviaQuestion.CorrectAndWrongArray.length; i++) {
                $("#Answer_" + AnswerNumber).empty();
                $("#Answer_" + AnswerNumber).append(TriviaQuestion.CorrectAndWrongArray[i])
                AnswerNumber++;
            }
        }

        function shuffle(a) {
            var j, x, i;
            for (i = a.length; i; i--) {
                j = Math.floor(Math.random() * i);
                x = a[i - 1];
                a[i - 1] = a[j];
                a[j] = x;
            }
            return a;
        }


        function checkanswer(answer) {
            clearInterval(myTime);
            if (TriviaQuestion.CorrectAnswer === TriviaQuestion.CorrectAndWrongArray[answer]) {
                thatWasCorrect();
            } else {
                thatWasWrong();
            }
            loadingTimer();

        };

        function thatWasCorrect() {
            CorrectAnswer = CorrectAnswer + 1;


            console.log("Correct!")
            $("#WinnerOrLower").empty();
            $("#WinnerOrLower").append("Congrants you got That right!");
            $("#RightAnswer").empty();
            $("#RightAnswer").append("asfdasfdasfds");
        }

        function thatWasWrong() {
            console.log("Loser");
            $("#WinnerOrLower").empty();
            $("#WinnerOrLower").append("You got that wrong!");
            $("#RightAnswer").empty();
            $("#RightAnswer").append("The Correct answer was: " + TriviaQuestion.CorrectAnswer)
        }

        $("#StartTheQuiz").on("click", function (event) {
            console.log("Start the quiz button");

            setQuestion();
        });

        $("#Answer_1").on("click", function (event) {
            TriviaQuestion.GuessedQuestion = 0;

        });
        $("#Answer_2").on("click", function (event) {
            TriviaQuestion.GuessedQuestion = 1;

        });
        $("#Answer_3").on("click", function (event) {
            TriviaQuestion.GuessedQuestion = 2;

        });
        $("#Answer_4").on("click", function (event) {
            TriviaQuestion.GuessedQuestion = 3;

        });

        $("#YesButton").on("click", function (event) {
            checkanswer(TriviaQuestion.GuessedQuestion);
            document.getElementById("MainGame").style.display = "none";
            document.getElementById("LoadingScreen").style.display = "initial";
            clearInterval(myTime);
        });

    });
})