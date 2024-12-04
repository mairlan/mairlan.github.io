const questions = [
    {
        question: "O que é sífilis?",
        answers: [
            { text: "A) É uma doença localizada nos cromossomos sexuais", correct: false },
            { text: "B) É uma infecção Sexualmente Transmissível (IST) causada por bactérias", correct: true },
            { text: "C) É uma Doença Sexualmente Transmissível (DST) causada por vírus", correct: false },
        ]
    },    
        {
            question : "O que a sífilis pode causar?", 
            VF    : 'false',
            answers  : [
                { text: "A) Ferida indolor na genitália, reto ou boca; irritação na pele; danos para o cérebro, coração, nervos, olhos.", correct : true},
                { text: "B) É uma doença assintomática em todos os estágios", correct : false},
                { text: "C) Irritação na genitália, coceira, odor forte vindo da secreção e corrimento abundante", correct : false},
            ]
        },
        {
            question : "Existe tratamento para a sífilis?", 
            VF    : 'false',
            answers  : [
                { text: "a) Sim, o uso de antibióticos, principalmente a penicilina.", correct : true},
                { text: "b) Sim, o uso de antivirais, principalmente o aciclovir.", correct : false},
                { text: "c) Não há tratamento para a sífilis a partir do contágio.", correct : false},
            ]
        },
        {
            question : "Como pode ser transmitida?", 
            VF    : 'false',
            answers  : [
                { text: "a) Sexo sem proteção, produtos sanguíneos contaminados usados, a mãe contaminada passa para o feto.", correct : true},
                { text: "b) Sexo sem proteção, uso de objetos compartilhados e falta de higiene nas regiões íntimas", correct : false},
                { text: "c) Uso de seringas contaminadas, falta de higiene nas regiões íntima e erro na divisão do cromossomo X", correct : false},
            ]
        },
        {
            question : "Qual exame é comum para diagnosticar a sífilis?", 
            VF    : 'false',
            answers  : [
                { text: "a) Ultrassonografia", correct : false},
                { text: "a) Raio-X", correct : false},
                { text: "c) Hemograma", correct : false},
                { text: "d) Teste VDRL", correct : true},
            ]
        },
        {
            question : "Analise as alternativas a seguir e marque aquela que indica o nome do agente etiológico da sífilis", 
            VF    : 'false',
            answers  : [
                { text: "a) Cândida albicans", correct : false},
                { text: "a) Tricomoníase vaginalis", correct : false},
                { text: "c) Neisseria gonorrhoeae", correct : false},
                { text: "d) Treponema pallidum", correct : true},
            ]
        }
];

const questionElement = document.querySelector(".question");
const answerButtons = document.querySelector(".respostas");
const feedbackElement = document.createElement("div"); // Elemento para o feedback
const nextButton = document.getElementById("next-btn");
const pontosElement = document.querySelector(".pontos");

let currentQuestionIndex = 0;
let score = 0;

// Estiliza o feedback para integrá-lo ao design
feedbackElement.style.marginTop = "20px";
feedbackElement.style.fontSize = "1rem";
feedbackElement.style.color = "#555";
feedbackElement.style.fontWeight = "bold";
feedbackElement.style.textAlign = "center";

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    pontosElement.textContent = `Pontos: ${score}`;
    feedbackElement.textContent = ""; // Reseta o feedback
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    // Adiciona o elemento de feedback ao final da lista de respostas
    answerButtons.appendChild(feedbackElement);
}

function resetState() {
    nextButton.style.display = "none";
    feedbackElement.textContent = ""; // Limpa o feedback anterior
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    if (isCorrect) {
        selectedButton.classList.add("correct");
        score += 100; // Incrementa a pontuação para respostas corretas
        pontosElement.textContent = `Pontos: ${score}`;
        feedbackElement.textContent = "Parabéns! Você acertou!";
        feedbackElement.style.color = "#4caf50"; // Verde para acertos
    } else {
        selectedButton.classList.add("incorrect");
        feedbackElement.textContent = "Resposta errada! A resposta correta é: " + getCorrectAnswer();
        feedbackElement.style.color = "#f44336"; // Vermelho para erros
    }

    // Mostra o feedback correto em todos os botões
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; // Desabilita todos os botões após responder
    });

    nextButton.style.display = "block"; // Mostra o botão "Próximo"
}

function getCorrectAnswer() {
    // Retorna o texto da resposta correta
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answers.find((answer) => answer.correct);
    return correctAnswer ? correctAnswer.text : "Não encontrada";
}

function showScore() {
    resetState();
    questionElement.textContent = `Você finalizou o quiz! Sua pontuação final foi: ${score} pontos.`;
    nextButton.textContent = "Recomeçar";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Inicia o quiz ao carregar
startQuiz();
