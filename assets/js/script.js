const questions = [
    {
        question : "O que é sífilis? ", 
        VF    : 'false',
        answers  : [
            { text: "A) É uma doença localizada nos cromossomos sexuais", correct : false},
            { text: "B) É uma infecção Sexualmente transmissível (IST) causado por bactérias", correct : true},
            { text: "C) É uma Doença Sexualmente Transmissível (DST) causada por vírus", correct : false},
        ]
    },
    {
        question : "O que a sífilis pode causar?", 
        VF    : 'false',
        answers  : [
            { text: "A) Ferida indolor na genitália, reto ou boca; irritação na pele; donos para o cérebro, coração, nervos, olhos.", correct : true},
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
        question : "análise as alternativas a seguir e marque aquela que indica o nome do agente etiológico da sífilis", 
        VF    : 'false',
        answers  : [
            { text: "a) Cândida albicans", correct : false},
            { text: "a) Tricomoníase vaginalis", correct : false},
            { text: "c) Neisseria gonorrhoeae", correct : false},
            { text: "d) Treponema pallidum", correct : true},
        ]
    },
];



// h1 onde vai a pergunta (h1)
const questionElement = document.getElementById("question");
// div onde esta as alternativas
const answerButtons = document.getElementById("answer-buttons");
// Botão de proximo
const nextButton = document.getElementById("next-btn");
// onde ficará a pergunta e as imagens
const header = document.getElementById("header");

const imagen = document.getElementById("img");
// espaço onde vai a dica
const hint = document.getElementById("hint");
//botao dica
const hintBtn = document.getElementById("btnh");
// 
const footer = document.getElementById("footer");
// espaço onde ficara os pontos no HTML
const pontos = document.getElementById("score");
const button = document.createElement("input");

// variaveris do index da questão
let currentQuestionIndex = 0;
// variavel da pontuação
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    // nome do botão de proxima pergunta
    nextButton.innerHTML = "Proxima";
    //shuffle(questions);
    pontos.innerHTML = "pontos: " + score;
    showQuestion();
};
function showQuestion(){
    resetState();
    // variavel para armazenar a array com as questões
    let currentQuestion = questions[currentQuestionIndex];
    // variavel para adicionar mais 1 numero no index do array
    let questionNo = currentQuestionIndex + 1;
    //Adicionar a pergunda ao HTML
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question
    
    
    // para cada resposta no objeto
    currentQuestion.answers.forEach(answer => {
        // variavel que cria um botão dentro do HTML
        const butao = document.createElement("button");
        const button = document.createElement("input");
        const paragrafo = document.createElement("p");
        const div = document.createElement("div");
        //colocar as Alternativas nos botões
        //button.innerHTML = answer.text;
        // chama a variavel para criar com filho da DIV "answer-buttons"

        if(currentQuestion.VF == 'false'){
            answerButtons.appendChild(button);
            button.setAttribute("type", 'button');
            button.setAttribute("value", answer.text);
            button.classList.add("btn");
            paragrafo.style.display = "none"
        }else{
            answerButtons.appendChild(div);
            div.classList.add("alinhar");
            div.appendChild(button);
            button.setAttribute("type", "checkbox");
            button.classList.add("btn-check");
            div.appendChild(paragrafo);
            paragrafo.classList.add("paragrafo");
            paragrafo.innerHTML = answer.text;

        }
        
        if(answer.correct){
            // se sim, define o valor como correto
            button.dataset.correct = answer.correct;
        }else{
            button.dataset.correct = answer.correct;
        }
        // adiciona um evento ao botão e chama a função selectAnswer
        butao.addEventListener("click", selectAnswer);
        button.addEventListener('click', selectAnswer);
    });
}

function resetState(){
    // define o display como nenhum(botão desaparece)
    nextButton.style.display = "none";

    // remove os botões antigos para que possa ser substituidos pelos novos com as alternativas
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// MUDAR ESSE FUNÇÃO PARA QUANDO CLICAR NO BOTAO DE "PROXIMO" ELE VERIFICAR SE ESTA CORRETO
function selectAnswer(e){
    // variavel para receber o valor de qual botão foi clicado
    const selectedBtn = e.target;
    // variavel para receber o valor do botão que for "true"
    const isCorrect = selectedBtn.dataset.correct === "true";
    // se o valor for "true", ira ser colocado a class="correct" do css
    let currentQuestion = questions[currentQuestionIndex];
    if(isCorrect){
        // adiciona a class="correct" a alternativa
        selectedBtn.classList.add("correct");
        // aumenta a variavel da pontuação
        score += 100;
        pontos.innerHTML = "pontos: " + score;

    }

    Array.from(answerButtons.children).forEach(button => {
        // vai verificar qual é o botão que tem o valor "true" e definir ele como "correct"
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        if(button.dataset.correct === "false"){
            button.classList.add("incorrect");
        }

        // desabilita os botões não podendo clickar neles
        button.disabled = true;
    });
    //define o display do botão "proxima" como block
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    // muda o h1 da questão para a pontuação
    questionElement.innerHTML = 'Você pontuou ' +score+ ' de '+questions.length*100+'!';
    // define o botão de "proximo" como jogar novamente
    nextButton.innerHTML = "Jogar novamente";
    // define o display do botão "proximo" como block
    nextButton.style.display = "block";
}
// ao segurar o botão de proximo
function handleNextButton(){
    // aumentar o index da questão
    currentQuestionIndex++;
    // verifica se o index é maior que o tamanho da array com os objetos das perguntas
    if(currentQuestionIndex < questions.length){
        // se não chama a função de mostrar as perguntas
        showQuestion();
    }else{
        // se for maior chama a função de mostrar a pontuação
        showScore();
    }
}

// adiciona um evento quando "click" for chamado chama a arrow function
nextButton.addEventListener("click", ()=> {
    // verifica se o index das questões é menor que o tamanho da array
    if(currentQuestionIndex < questions.length){
        // se for menor define a função do botão "proximo" para passar para a proxima questão 
        handleNextButton()
    }else{
        // se for maior a função do botão "proximo" vai ser iniciar o quiz novamente; 
        startQuiz()
    }
})

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // enquanto existir elementos para trocar
    while (currentIndex != 0) {
  
      // pegar um elemento que falta para trocar
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // troca os elementos  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }
  let open = false;
function help(){
    let currentQuestion = questions[currentQuestionIndex];
    if(open == false){
        hint.innerText = currentQuestion.hint
        open = true;
        hint.style.background = "cyan";
    }else{
        hint.innerHTML = "";
        open = false;
    }
}
startQuiz();