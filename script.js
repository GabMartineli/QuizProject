let questNow = 0;
let correctQuestions = 0;

document.querySelector('.scoreArea button').addEventListener('click', () =>{
    document.querySelector('h1').style.display = 'block';
    document.querySelector('#ready').style.display = 'block';
    document.querySelector('.scoreArea').style.display = 'none';
    questNow = 0;
    correctQuestions = 0;
    
})


document.querySelector('.first button').addEventListener('click', () =>{
    document.querySelector('h1').style.display = 'none';
    document.querySelector('#ready').style.display = 'none';
    document.querySelector('.questionArea').style.display = 'block';
    showQuest();
})


function showQuest(){
    if(questions[questNow]){
        let q = questions[questNow];

        let pct = Math.floor((questNow / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`;


       document.querySelector('.question').innerHTML = q.question;

        let optHTML = '';

        for (let i in q.options){
            optHTML += `<div data-op="${i}"class="option"><span>${parseInt(i)+1}</span> ${q.options[i]} </div>`
        }

        document.querySelector('.options').innerHTML = optHTML;

        document.querySelectorAll('.options .option').forEach(item =>{
            item.addEventListener('click', optionEvent);
        })
        
    } else {
        finished();
    }
}


function optionEvent(e){

    let opSelected = parseInt(e.target.getAttribute('data-op'));
    let opCorrect = questions[questNow].answer;

    if(opCorrect === opSelected){
        correctQuestions += 1;

    } 

    questNow++;
    showQuest();

}

function finished(){

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';

    document.querySelector('.progress--bar').style.width = `100%`;

    let pctCorrectQuestions = Math.floor((correctQuestions / questions.length) * 100);

    document.querySelector('.scorePct').innerHTML = `Acertou ${pctCorrectQuestions}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctQuestions}.`;

    if(pctCorrectQuestions <= 30 ){

        document.querySelector('.scoreText1').innerHTML = 'Tá ruim hein';
        document.querySelector('.scorePct').style.color = 'red';
        

    } 
    else if(pctCorrectQuestions > 30 && pctCorrectQuestions <= 70 ){

        document.querySelector('.scoreText1').innerHTML = 'Foi bem demais!';
        document.querySelector('.scorePct').style.color = 'blue';

    } else {

        document.querySelector('.scoreText1').innerHTML = 'Vc é o maior genio que existe!';
       
    }
}