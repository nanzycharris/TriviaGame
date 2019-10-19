const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Author of \"Holes\" and \"Sideway Stories from Wayside School\" among other chapter books popular among young readers. Winner of the National Book Award and Newbery Medal.',
        answers: [
            { text: 'Gary Paulsen', correct: false },
            { text: 'Stanley Sachar', correct: false },
            { text: 'Louis Sachar', correct: true },
            { text: 'Anna Sewell', correct: false }
        ]
    },
    {
        question: 'This classic novel written by Anna Sewell was first published in 1877. It is considered the predecessor of a genre later known as pony books.',
        answers: [
            { text: 'War Horse', correct: false },
            { text: 'Black Beauty', correct: true },
            { text: 'National Velvet', correct: false },
            { text: 'The Black Stallion', correct: false }
        ]
    },
    {
        question: 'This picture book by prolific author and illustrator Eric Carle celebrated its 50th anniversary in 2019. It is a favorite of kindergarten teachers and students because it involves curriculum related themes such as growth, numbers, and days of the week.',
        answers: [
            { text: 'The Very Hungry Caterpillar', correct: true },
            { text: 'Brown Bear, Brown Bear, What Do You See?', correct: false },
            { text: 'Today is Monday', correct: false },
            { text: 'Mister Seahorse', correct: false }
        ]
    },
    {
        question: 'Written and illustrated by Shel Silverstein, this children\'s picture book had sold over 8.5 million copies by 2011 and has been translated into numerous languages. Its interpretation has been dividing readers since 1964 when it was published by Harper & Row.',
        answers: [
            { text: 'Where the Sidewalk Ends', correct: false },
            { text: 'Runny Rabbit', correct: false },
            { text: 'Where the Wild Things Are', correct: false },
            { text: 'The Giving Tree', correct: true }
        ]
    },
    {
        question: 'Born in 1899, this American author was a long-time contributor to The New Yorker, in addition to writing classic children\'s books such as \"Charlotte\'s Web\" and \"Stuart Little.\"',
        answers: [
            { text: 'E. B. White', correct: true },
            { text: 'Truman Capote', correct: false },
            { text: 'J. D. Salinger', correct: false },
            { text: 'Roald Dahl', correct: false }
        ]
    },
    {
        question: 'Literary award given annually by the Association for Library Service to Children (ALSC), a division of the American Library Association (ALA) to the author of \"the most distinguished contribution to American literature for children.\" Among its recipients are Louis Sachar, Marguerite Henry, and Kate DiCamillo.',
        answers: [
            { text: 'Hans Christian Andersen Award', correct: false },
            { text: 'Newbery Medal', correct: true },
            { text: 'Caldecott Medal', correct: false },
            { text: 'Carnegie Medal', correct: false }
        ]
    },
]