/* ===========================
   تنظیمات اصلی
=========================== */

const EXAM_DURATION = 45 * 60;

let studentInfo = {};
let currentQuestion = 0;
let answers = [];
let shuffledQuestions = [];
let timerInterval;

/* ===========================
   عناصر صفحه
=========================== */

const loginPage =
document.getElementById("loginPage");

const examPage =
document.getElementById("examPage");

const resultPage =
document.getElementById("resultPage");

const questionTitle =
document.getElementById("questionTitle");

const optionsContainer =
document.getElementById("optionsContainer");

const nextBtn =
document.getElementById("nextBtn");

const progressBar =
document.getElementById("progressBar");

const questionCounter =
document.getElementById("questionCounter");

/* ===========================
   بانک سوالات
=========================== */

const questions = [

{
id:1,
question:"کدام مجموعه نامتناهی است؟",
options:[
"شمارنده‌های عدد 24",
"دانش‌آموزان یک کلاس",
"مضرب‌های طبیعی عدد 5",
"ماه‌های سال"
],
correct:2
},

{
id:2,
question:"در یک مثلث قائم الزاویه، سینوس یک زاویه تند چیست؟",
options:[
"مجاور / وتر",
"مقابل / وتر",
"مقابل / مجاور",
"وتر / مقابل"
],
correct:1
},

{
id:3,
question:"مقدار sin30° چیست؟",
options:[
"1",
"√3/2",
"1/2",
"0"
],
correct:2
},

{
id:4,
question:"مقدار √81 برابر است با:",
options:[
"7",
"8",
"9",
"10"
],
correct:2
},

{
id:5,
question:"حاصل (x+3)(x−3) چیست؟",
options:[
"x²−9",
"x²+9",
"x²−6x+9",
"x²+6x+9"
],
correct:0
},

{
id:6,
question:"جواب معادله x+5=12 چیست؟",
options:[
"5",
"6",
"7",
"8"
],
correct:2
},

{
id:7,
question:"مجموع جواب‌های معادله x²−5x+6=0 چیست؟",
options:[
"5",
"6",
"1",
"2"
],
correct:0
},

{
id:8,
question:"کدام رابطه یک تابع است؟",
options:[
"هر دانش‌آموز ← یک کدملی",
"هر دانش‌آموز ← چند کدملی",
"هر عدد ← دو خروجی",
"هیچکدام"
],
correct:0
},

{
id:9,
question:"در تابع y=2x+1 اگر x=3 باشد y چند است؟",
options:[
"5",
"6",
"7",
"8"
],
correct:2
},

{
id:10,
question:"دامنه تابع y=1/x چیست؟",
options:[
"همه اعداد حقیقی",
"همه اعداد حقیقی بجز صفر",
"فقط مثبت‌ها",
"فقط صحیح‌ها"
],
correct:1
},

{
id:11,
question:"اگر f(x)=x² باشد f(-3) چند است؟",
options:[
"-9",
"3",
"9",
"-3"
],
correct:2
},

{
id:12,
question:"چند رقم یک رقمی داریم؟",
options:[
"9",
"10",
"8",
"11"
],
correct:1
},

{
id:13,
question:"انتخاب یک نفر از بین 5 نفر چند حالت دارد؟",
options:[
"1",
"5",
"10",
"25"
],
correct:1
},

{
id:14,
question:"چیدن 3 کتاب مختلف چند حالت دارد؟",
options:[
"3",
"6",
"9",
"27"
],
correct:1
},

{
id:15,
question:"از میان 4 نفر انتخاب 2 نفر چند حالت دارد؟",
options:[
"4",
"6",
"8",
"12"
],
correct:1
},

{
id:16,
question:"احتمال آمدن شیر در پرتاب سکه چیست؟",
options:[
"0",
"1",
"1/2",
"2"
],
correct:2
},

{
id:17,
question:"احتمال آمدن عدد 6 در یک تاس چیست؟",
options:[
"1/3",
"1/6",
"1/2",
"1"
],
correct:1
},

{
id:18,
question:"میانگین 2 ،4 ،6 ،8 چند است؟",
options:[
"4",
"5",
"6",
"7"
],
correct:1
},

{
id:19,
question:"در کلاس 20 نفره با 8 دختر، نسبت دختران چیست؟",
options:[
"2/5",
"3/5",
"4/5",
"1/5"
],
correct:0
},

{
id:20,
question:"جامعه آماری بررسی قد دانش‌آموزان چیست؟",
options:[
"فقط یک کلاس",
"فقط قدبلندها",
"همه دانش‌آموزان مدرسه",
"فقط دهم"
],
correct:2
}

];

/* ===========================
   توابع کمکی
=========================== */

function shuffle(array){

for(let i=array.length-1;i>0;i--){

const j =
Math.floor(Math.random()*(i+1));

[array[i],array[j]] =
[array[j],array[i]];

}

return array;

}

/* ===========================
   شروع آزمون
=========================== */

document
.getElementById("startBtn")
.addEventListener("click",startExam);

function startExam(){

const name =
document.getElementById("studentName")
.value.trim();

const classNumber =
document.getElementById("classNumber")
.value.trim();

const studentCode =
document.getElementById("studentCode")
.value.trim();

if(!name || !classNumber || !studentCode){

alert("تمام اطلاعات را وارد کنید");

return;
}

studentInfo = {

name,
classNumber,
studentCode

};

shuffledQuestions =
shuffle([...questions]);

answers =
new Array(shuffledQuestions.length)
.fill(null);

loginPage.classList.remove("active");
examPage.classList.add("active");

showQuestion();

/* تایمر در بخش دوم */

}

/* ===========================
   نمایش سوال
=========================== */

function showQuestion(){

const q =
shuffledQuestions[currentQuestion];

questionCounter.innerText =
`سوال ${currentQuestion+1} از ${shuffledQuestions.length}`;

progressBar.style.width =
`${((currentQuestion)/
shuffledQuestions.length)*100}%`;

questionTitle.innerText =
q.question;

optionsContainer.innerHTML = "";

let optionObjects =
q.options.map((text,index)=>({

text,
original:index

}));

optionObjects =
shuffle(optionObjects);

optionObjects.forEach(option=>{

const label =
document.createElement("label");

label.className =
"option";

label.innerHTML = `
<input
type="radio"
name="answer"
value="${option.original}">
<span>${option.text}</span>
`;

optionsContainer.appendChild(label);

});

}

/* ===========================
   سوال بعدی
=========================== */

nextBtn.addEventListener(
"click",
saveAndNext
);

function saveAndNext(){

const selected =
document.querySelector(
'input[name="answer"]:checked'
);

if(!selected){

alert(
"لطفاً یک گزینه انتخاب کنید"
);

return;
}

answers[currentQuestion] =
parseInt(selected.value);

currentQuestion++;

if(
currentQuestion <
shuffledQuestions.length
){

showQuestion();

}
else{

finishExam();

}

}

/* ===========================
   تایمر آزمون
=========================== */

let remainingTime = EXAM_DURATION;

function startTimer(){

const timerElement =
document.getElementById("timer");

timerInterval =
setInterval(()=>{

remainingTime--;

let minutes =
Math.floor(remainingTime/60);

let seconds =
remainingTime%60;

timerElement.innerText =
`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

if(remainingTime<=0){

clearInterval(timerInterval);

finishExam();

}

},1000);

}

/* ===========================
   اصلاح تابع شروع آزمون
=========================== */

/*
در تابع startExam()
بعد از showQuestion()

این خط را اضافه کنید:

startTimer();

*/

/* ===========================
   محاسبه نمره
=========================== */

function calculateScore(){

let correctCount = 0;

for(
let i=0;
i<shuffledQuestions.length;
i++
){

if(
answers[i] ===
shuffledQuestions[i].correct
){

correctCount++;

}

}

return Number(
(correctCount).toFixed(2)
);

}

/* ===========================
   پایان آزمون
=========================== */

function finishExam(){

clearInterval(timerInterval);

examPage.classList.remove("active");

resultPage.classList.add("active");

const score =
calculateScore();

document
.getElementById("finalScore")
.innerText =
`نمره شما: ${score} از 20`;

const examData = {

student:studentInfo,

score:score,

answers:answers,

questionOrder:
shuffledQuestions.map(q=>q.id),

submitTime:
new Date().toISOString(),

reviewTime:
Date.now()+(60*60*1000)

};

localStorage.setItem(
"exam_result_"+studentInfo.studentCode,
JSON.stringify(examData)
);

localStorage.setItem(
"exam_completed_device",
"true"
);

submitToGoogleSheet(
examData
);

}

/* ===========================
   قفل دستگاه
=========================== */

window.addEventListener(
"load",
()=>{

const completed =
localStorage.getItem(
"exam_completed_device"
);

if(completed){

document
.getElementById("startBtn")
.disabled = true;

document
.getElementById("startBtn")
.innerText =
"این دستگاه قبلاً آزمون داده است";

}

}
);

/* ===========================
   ارسال به گوگل شیت
=========================== */

const GOOGLE_SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyt0I6YM19lCPQo-0rM52fDg4C9_cansvcEjUOqj47zFsvsufx_UFoOUC6DVRlrQN1O/exec";

async function submitToGoogleSheet(data){

try{

await fetch(
GOOGLE_SCRIPT_URL,
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:
JSON.stringify(data)
}
);

}
catch(error){

console.error(
"خطا در ارسال اطلاعات",
error
);

}

}

/* ===========================
   مشاهده عملکرد
=========================== */

document
.getElementById("reviewBtn")
.addEventListener(
"click",
showReview
);

function showReview(){

const code =
document
.getElementById("reviewCode")
.value
.trim();

if(!code){

alert(
"کد دانش آموزی را وارد کنید"
);

return;
}

const raw =
localStorage.getItem(
"exam_result_"+code
);

if(!raw){

alert(
"اطلاعاتی پیدا نشد"
);

return;
}

const result =
JSON.parse(raw);

if(
Date.now() <
result.reviewTime
){

const remain =
Math.ceil(
(result.reviewTime-Date.now())
/60000
);

document
.getElementById("reviewResult")
.innerHTML =

`امکان مشاهده پاسخنامه
پس از گذشت یک ساعت فعال می‌شود.

${remain}
دقیقه دیگر باقی مانده است.`;

return;

}

let html = `
<h3>
نتیجه آزمون
</h3>

<p>
نام:
${result.student.name}
</p>

<p>
نمره:
${result.score}
از 20
</p>

<hr>
`;

for(
let i=0;
i<result.answers.length;
i++
){

const q =
questions.find(
x=>x.id===
result.questionOrder[i]
);

const studentAnswer =
result.answers[i];

const correct =
q.correct;

html += `
<div style="margin-bottom:15px">

<b>
${i+1})
${q.question}
</b>

<br>

پاسخ شما:
${q.options[studentAnswer]}

<br>

پاسخ صحیح:
${q.options[correct]}

</div>
`;

}

document
.getElementById("reviewResult")
.innerHTML =
html;

}
