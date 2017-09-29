var TriviaQuestion = {
    Question: "asdf",
    QuestionNumber: 0,
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

    TriviaQuestion.GetQuestions().done(function (response) {

        TriviaQuestion.Question = response.results;

        function setQuestion() {
            $("#Question").html(TriviaQuestion.Question[TriviaQuestion.QuestionNumber].question);
            TriviaQuestion.QuestionNumber++;
            setAnswer();
            console.log("RUnning");
            console.log(TriviaQuestion.QuestionNumber);
            console.log(TriviaQuestion.Question);
        }

        function setAnswer() {

        }

        function timer(time) {

        };

        function checkanswer(answer) {

        };

        function setPage() {

        };

        $("#ReadyButton").on("click", function (event) {
            setQuestion();
        });


        $("#Answer_1").on("click", function (event) {
            console.log("AJflkdsa" + this)
        });

        $("#YesButton").on("click", function (event) {
            console.log("HELLOJFiODsfjo;ajfds");
        });


        $("#NoButton").on("click", function (event) {
            console.log("HELLOJFsafdsfsdafsdafdsadiODsfjo;ajfds");
        });


    });
})