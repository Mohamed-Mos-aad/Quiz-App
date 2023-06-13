let categorys = document.getElementsByClassName('box');
let category = null;


// Get Category Function
for(let i = 0 ; i < categorys.length; i++)
{
    categorys[i].addEventListener('click',function(e)
    {
        category = e.target.id;
        for(let j = 0 ; j < categorys.length;j++)
        {
            if(j != i )
            {
                categorys[j].style.color = '#393E46';
                categorys[j].style.borderColor = '#393E46';
            }
            else
            {
                categorys[j].style.color = '#00ADB5';
                categorys[j].style.borderColor = '#00ADB5';
            }
        }
        switch(category)
        {
            case 'generalKnowledge':
                category = 9;
                break;
            case 'Books':
                category = 10;
                break;
            case 'Film':
                category = 11;
                break;
            case 'Music':
                category = 12;
                break;
            case 'Musicals':
                category = 13;
                break;
            case 'Television':
                category = 14;
                break;
            case 'videoGames':
                category = 15;
                break;
            case 'boardGames':
                category = 16;
                break;
            case 'Science':
                category = 17;
                break;
            case 'Computers':
                category = 18;
                break;
            case 'Mathematics':
                category = 19;
                break;
            case 'Sports':
                category = 21;
                break;
            case 'Geography':
                category = 22;
                break;
            case 'History':
                category = 23;
                break;
            case 'Politics':
                category = 24;
                break;
            case 'Animals':
                category = 27;
                break;
            case 'Vehicles':
                category = 28;
                break;
            case 'Comics':
                category = 29;
                break;
        }
    })
}


let nums = document.getElementsByClassName('num');
let num = null;
// Get Questions Num Function
for(let i = 0 ; i < nums.length; i++)
{
    nums[i].addEventListener('click',function(e)
    {
        num = e.target.id;
        for(let j = 0 ; j < nums.length;j++)
        {
            if(j != i )
            {
                nums[j].style.color = '#393E46';
                nums[j].style.borderColor = '#393E46';
            }
            else
            {
                nums[j].style.color = '#00ADB5';
                nums[j].style.borderColor = '#00ADB5';
            }
        }
    })
}


let startBtn = document.getElementById('startBtn');
// Start Quiz Function
startBtn.addEventListener('click',function()
{
    if(category != null && num != null)
    {
        startBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" style="color: #393E46;"></i>';
        getQuestions(num,category);
    }
    else if(category === null && num === null )
    {
        for(let i = 0; i < categorys.length;i++)
        {
            categorys[i].style.borderColor = 'red';
        }
        for(let i = 0; i < nums.length;i++)
        {
            nums[i].style.borderColor = 'red';
        }
    }
    else if(category === null)
    {
        for(let i = 0; i < categorys.length;i++)
        {
            categorys[i].style.borderColor = 'red';
        }
    }
    else if(num === null)
    {
        for(let i = 0; i < nums.length;i++)
        {
            nums[i].style.borderColor = 'red';
        }
    }
})


// Get Questions From Api Function
async function getQuestions(num,category)
{
    let data = await fetch(`https://opentdb.com/api.php?amount=${num}&category=${category}&type=multiple`);
    let questions = await data.json();
    storeQuestions(questions.results);
    hideMenu();
    startCount;
    zeroTimerBar();
}


let correctAnswer = [];
let store = [];
// Store Questions Function
function storeQuestions(questions)
{
    for(let i = 0; i < questions.length ; i++)
    {
        let ask = [questions[i].question,questions[i].correct_answer,questions[i].incorrect_answers[0],questions[i].incorrect_answers[1],questions[i].incorrect_answers[2]];
        correctAnswer.push(questions[i].correct_answer);
        for (let i = 1; i < ask.length; i++) 
        {
            const j = Math.floor(Math.random() * (ask.length - 1)) + 1;
            [ask[i], ask[j]] = [ask[j], ask[i]];
        } 
        store.push(ask);
    }
    postQuestions(store);
}


let index = 0;
let nextBtn = document.getElementById('nextBtn');
// Post Question function
function postQuestions(store)
{
    let question = document.getElementById('question');
    let options =  document.getElementsByClassName('option');
    if(index < store.length - 1)
    {
        question.innerHTML = `${store[index][0]}`
        options[0].innerHTML = `${store[index][1]}`
        options[1].innerHTML = `${store[index][2]}`
        options[2].innerHTML = `${store[index][3]}`
        options[3].innerHTML = `${store[index][4]}`
        index += 1;
    }
    else if(index < store.length)
    {
        question.innerHTML = `${store[index][0]}`
        options[0].innerHTML = `${store[index][1]}`
        options[1].innerHTML = `${store[index][2]}`
        options[2].innerHTML = `${store[index][3]}`
        options[3].innerHTML = `${store[index][4]}`
        index += 1;
        nextBtn.innerHTML = 'Finsh';
    }
    else
    {
        nextBtn.innerHTML = 'Finsh';
    }
}


let progressWidth = 0;
// Progress Bar Fuction
function progressBar()
{
    progressWidth += 100 / num;
    let progressBar = document.getElementById('progressBar');
    let progressTitle = document.getElementById('progressTitle');
    if(progressWidth < 101)
    {
        Math.floor(progressWidth);
        progressBar.style.width = `${Math.round(progressWidth)}%`;
        progressTitle.innerHTML = `Total test : ${Math.round(progressWidth)}% complated`;
    }
}


let time = 60;
let questionNum = 0;
let minute = 0;
let second = 0;
let options =  document.getElementsByClassName('option');
// Next Question Function
nextBtn.addEventListener('click',nextQuestion)
function nextQuestion()
{
    time = 60;
    zeroTimerBar();
    postQuestions(store);
    progressBar();
    questionNum += 1;
    for(let i = 0;i < options.length;i++)
    {
        options[i].style.borderColor = '#393E46';
    }
    loopAnswer();
    let questionBody = document.getElementById('questionBody');
    let resultBody = document.getElementById('result');
    if(questionNum == num)
    {
        questionBody.style.display = 'none';
        resultBody.style.display = 'flex';
        let message = document.getElementById('message');
        message.innerHTML =
        `
        Congratulations!
        <br><br>
        You have completed answering the questions. Here are the results of your test:
        <br><br>
        Number of correct answers: <span>${score}</span>
        <br><br>
        Number of incorrect answers: <span>${questionNum - score}</span>
        <br><br>
        Thank you for your efforts and participation in the test. We wish you success in the future!
        `;
        clearInterval(startCount);
        resultTimerBar();
        counter.innerHTML = '60';
    }
}

function resultTimerBar()
{
    topRight.style.animationName = 'aaa';
    topRight.offsetHeight;
    bottomRight.style.animationName = 'aaa';
    bottomRight.offsetHeight;
    bottomLeft.style.animationName = 'aaa';
    bottomLeft.offsetHeight;
    TopLeft.style.animationName = 'aaa';
    TopLeft.offsetHeight;
}


let topRight = document.getElementById('top-right');
let bottomRight = document.getElementById('bottom-right');
let bottomLeft = document.getElementById('bottom-left');
let TopLeft = document.getElementById('top-left');
// Reset Timer Bar Function
function zeroTimerBar()
{
    topRight.style.animationName = 'aaa';
    topRight.offsetHeight;
    bottomRight.style.animationName = 'aaa';
    bottomRight.offsetHeight;
    bottomLeft.style.animationName = 'aaa';
    bottomLeft.offsetHeight;
    TopLeft.style.animationName = 'aaa';
    TopLeft.offsetHeight;
    time = 60;
    resetTimerBar();
}
function resetTimerBar()
{
    topRight.style.animationName = 'top-right';
    bottomRight.style.animationName = 'bottom-right';
    bottomLeft.style.animationName = 'bottom-left';
    TopLeft.style.animationName = 'top-left';
}


let counter = document.getElementById('counter');
// Time Counter Function
let startCount = setInterval(timeCounter,1000);
function timeCounter()
{
    if(time > 0)
    {
        time -= 1;
        counter.innerHTML = time;
    }
    else
    {
        time = 60;
        nextQuestion();
        zeroTimerBar();
    }
}


let score = 0;
// Check Answer Function
loopAnswer();
function loopAnswer()
{
    for(let i = 0;i < options.length;i++)
    {
        options[i].addEventListener('click',checkAnswer)
    }
}
function checkAnswer(e)
{
    let theAnswer = e.target.innerHTML;
    if(theAnswer === correctAnswer[questionNum])
    {
        e.target.style.borderColor = 'green';
        score += 1;
    }
    else
    {
        e.target.style.borderColor = 'red';
        if(correctAnswer[questionNum].includes('&#039;'))
        {
            correctAnswer[questionNum] = correctAnswer[questionNum].replace(/&#039;/g,`'`);
        }
        for(let i = 0;i < options.length;i++)
        {
            if(options[i].innerHTML === correctAnswer[questionNum])
            {
                options[i].style.borderColor = 'green';
            }
        }
    }
    for (let i = 0; i < options.length; i++) 
    {
        options[i].removeEventListener('click',checkAnswer);
    }
}


// Hide Menu Function
function hideMenu()
{
    let menu = document.getElementById('menu');
    let quiz = document.getElementById('quiz');
    menu.style.display = 'none';
    quiz.style.display = 'flex';
}