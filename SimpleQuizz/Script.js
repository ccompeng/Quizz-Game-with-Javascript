// Array of Questions
const questions = [
  {
    id: 1,
    question:
      "'Aziz İstanbul' ve 'Kendi Gök Kubbemiz' adlı eserler hangi yazara aittir?",
    choices: [
      "Faruk Nafiz Çamlıbel",
      "Orhan Kemal",
      "Yahya Kemal Beyatlı",
      "Ziya Gökalp",
    ],
    answer: "Yahya Kemal Beyatlı",
  },

  {
    id: 2,
    question: "'Belge' anlamına gelen kelimenin doğru yazılışı hangisidir?",
    choices: ["Döküman", "Dökuman", "Dokuman", "Doküman"],
    answer: "Doküman",
  },

  {
    id: 3,
    question:
      "Doktorunuz size 3 hap verirse ve bunları yarımşar saat arayla almanızı isterse hapların tamamını bitirmeniz ne kadar sürer?",
    choices: ["30 dakika", "1 saat", "1.5 saat", "2 saat"],
    answer: "1 saat",
  },

  {
    id: 4,
    question: "Türk mitolojisinde bereket tanrıçası hangisidir?",
    choices: ["Umay", "Ülgen", "Erlik", "Mergen"],
    answer: "Umay",
  },
];

let correct = 0;
let index = 1;
let NumberOfQuestions = questions.length;

let rnd = Math.floor(Math.random() * NumberOfQuestions);

//
//
//
// The id of the displayed question will be added in this array (asked_questions)
// so a question will not be displayed again
// until all questions have been shown
let asked_questions = [];

const startBtn = document.querySelector("#startBtn");

const panel = document.querySelector(".panel");

const correctly = document.querySelector("#correctly");
const totalPanel = document.querySelector("#totalPanel");
totalPanel.innerHTML = NumberOfQuestions;

const container = document.querySelector(".container");
const question = document.querySelector(".question-wrapper p");
const choicesWrapper = document.querySelector(".choices-wrapper");
const nextBtn = document.querySelector("#nextBtn");

const totalIndicator = document.querySelector("#totalIndicator");
totalIndicator.innerHTML = NumberOfQuestions;

const questionNo = document.querySelector("#questionNo");

//
//
// define a function that will generate numbers between 0 with array (questions) length
const rndFunc = () => {
  const rnd = Math.floor(Math.random() * NumberOfQuestions);

  return rnd;
};

//
//
//
// question that will be displayed when the quizz is started
const getQuestion = () => {
  const rnd = rndFunc();
  asked_questions.push(rnd);

  question.innerHTML = questions[rnd].question;

  questionNo.innerHTML = index;

  getChoices(rnd);
};

//
//
//
// question that will be displayed when next button is clicked
const nextQuestion = () => {
  const rnd = rndFunc();

  // if the generated number is not in the array (asked_questions)
  // it will display the question with this id (generated number)
  // then call the function again
  if (!asked_questions.includes(rnd)) {
    question.innerHTML = questions[rnd].question;
    asked_questions.push(rnd);

    // function that returns the choices for the question
    getChoices(rnd);

    // question number control to show
    if (index < questions.length) {
      index++;
    } else {
      index = 1;

      // when the index equal to number of questions the quizz will return to the beginning
      startBtn.style.display = "block";
      container.style.display = "none";
      panel.style.display = "block";
    }

    // show changing index
    questionNo.innerHTML = index;
  } else {
    // then call the function again
    // (if generated number is in the array 'asked_quesitons')
    nextQuestion();
  }

  // when all generated numbers (ids) are added to the array
  // empty the array to redo the same function
  if (asked_questions.length === questions.length) {
    asked_questions = [];
  }

  // this button will be visible after selecting a choose
  nextBtn.style.display = "none";
};

//
//
// when clicked the next button function (nextQuestion) will run
nextBtn.addEventListener("click", nextQuestion);

//
//
//
// function that returns the choices for the question
// takes a parameter to find out which question it belongs to
// the argument of this parameter will be question id
const getChoices = (num) => {
  // create a parent for the choices
  const choicesBox = document.createElement("div");
  // give this parent a style
  choicesBox.style.width = "100%";

  // if choicesWrapper has a child (parent of the choices 'choicesBox') remove it
  // this is necessary for the choices of the next question
  if (choicesWrapper.hasChildNodes()) {
    choicesWrapper.removeChild(choicesWrapper.firstChild);
  }

  // create a list of choices for the question
  // call item to each choice
  questions[num].choices.map((item) => {
    // create a button for each choice
    const choice = document.createElement("button");
    // add this button to parent (choiceBox)
    choicesBox.appendChild(choice);
    // add this parent to the grandparent
    choicesWrapper.appendChild(choicesBox);
    // add the choice to button
    choice.innerHTML = item;
  });

  // access all the buttons that created here
  const buttons = choicesWrapper.querySelectorAll("button");
  //
  //function that will happen when the choice is selected
  chooseFunc(buttons, num);
};

//
//
//
//function that will happen when the choice is selected
const chooseFunc = (buttons, num) => {
  // variable for correct choice check
  let correctBtn;

  // finde the correct choice among the buttons (choices)
  for (let i = 0; i < 4; i++) {
    if (buttons[i].innerHTML === questions[num].answer) {
      correctBtn = buttons[i];
    }
  }

  // each buttons click events is given
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // shown the next button for the next question
      nextBtn.style.display = "block";

      // cannot do a new event after the click event
      for (const button of buttons) {
        button.setAttribute("disabled", "");
      }

      // increase the correct by 1 if correct choice is selected
      if (this.innerHTML === questions[num].answer) {
        correct++;
        // classname of the correct button is 'correct'
        this.className = "correct";
      } else {
        // classname of the wrong button is 'wrong'
        this.className = "wrong";
        // classname of the correct button is 'correct'
        correctBtn.className = "correct";
      }

      // shown correct
      correctly.innerHTML = correct;
    });
  });
};

//
//
//
// function required to start the game at the first time
const startGame = () => {
  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    panel.style.display = "none";

    correct = 0;
  });

  getQuestion();
};

startGame();
