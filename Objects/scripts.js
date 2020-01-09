/*
// Function constructor
// creating the blueprint
var Person = function(name, yearOfBirth, job){
	this.name = name; 
	this.yearOfBirth = yearOfBirth; 
	this.job = job; 
}

// Inheritance in JavaScript
Person.prototype.calculateAge = function(){
	console.log(2020 - this.yearOfBirth);
};
Person.prototype.lastName = "Smith"; 

var john = new Person('John', 1990, 'teacher'); 
var jane = new Person('Jane', 1969, 'designer'); 
var mark = new Person('Mark', 1948, 'retired'); 
*/ 

/*
// Object.create
var personProto = {
	calculateAge: function(){
		console.log(2020 - this.yearOfBirth)
	}
}

var john = Object.create(personProto); 
john.name = 'John'; 
john.yearOfBirth = 1990; 
john.job = 'teacher'

var jane = Object.create(personProto, {
	name: { value: 'Jane'}, 
	yearOfBirth: { value: 1969}, 
	job: { value: 'designer'}
})
*/

/*
// Primitives vs objects

// Primitives
var a = 23; 
var b = a; 
a = 46; 
console.log(a); 
console.log(b); 

// Objects
var obj1 = {
	name: "John", 
	age: 26
}
var obj2 = obj1; // pointer to the object
obj1.age = 30; 
console.log(obj1.age); 
console.log(obj2.age); 
*/

/*
// Passing function as arguments
var years = [1990, 1965, 1937, 2005, 1998]; 

function arrayCal(array, callbackFunc){
	var arrayRes = []; 
	for (var i = 0; i < array.length; i++){
		arrayRes.push(callbackFunc(array[i]));
	}
	return arrayRes; 
}

function calculateAge(element){
	return 2020 - element; 
}

function isFullAge(element){
	return element >= 18; 
}

function maxHeartRate(element){
	if(element >= 18 && element <= 81){  
		return Math.round(206.9 - (0.67 * element)); 
	}else{
		return -1;
	}
}
var ages = arrayCal(years, calculateAge);
var fullAges = arrayCal(ages, isFullAge);
var rates = arrayCal(ages, maxHeartRate); 

console.log(ages)
console.log(fullAges)
console.log(rates)
*/

/*
// Functions returning functions
function interviewQuestion(job){
	if( job === 'designer'){
		return function(name){
			console.log(name + ', can you please explain what UX design is?');
		}
	}else if ( job === 'teacher'){
		return function(name){
			console.log('What subject do you teach, ' + name +'?');
		}
	}else{
		return function(name){
			console.log('Hello ' + name + ', What do you do?'); 
		}
	}
}

var teacherQuestion = interviewQuestion('teacher') // this assigns the function to teacherQuestion variable
teacherQuestion('John')
var designerQuestion = interviewQuestion('designer')
designerQuestion('Jane')
var generalQuestion = interviewQuestion()
generalQuestion('James')
interviewQuestion('teacher')('Mark')
*/

/*
// Immediately Invoked Function Expressions (IIFE)
(function (goodluck){
	var score = Math.random() * 10; 
	console.log(score >= 5 - goodluck)
})(5);
*/

/*
// Closures
function retirement(retirementAge){
	var a = ' years left until retirement.';
	return function(yearOfBirth){
		var age = 2020 - yearOfBirth;
		console.log((retirementAge - age) + a); 
	}
}

var retirementUS = retirement(66); 
var retirementGermany = retirement(65); 
var retirementIceLand = retirement(67); 

retirementUS(1990); 
retirementGermany(1990); 
retirementIceLand(1990); 

function interviewQuestion(job){
	return function(name){
		if( job === 'designer'){
			console.log(name + ', can you please explain what UX design is?');
		}else if ( job === 'teacher'){
			console.log('What subject do you teach, ' + name +'?');
		}else{
			console.log('Hello ' + name + ', What do you do?'); 
		}
	}
}

interviewQuestion('teacher')('John')
*/

/*
// Bind, call and apply 
var john = {
	name: 'John', 
	age: 26, 
	job: 'teacher', 
	presentation: function(style, timeOfDay){
		if(style === 'formal'){
			console.log("Good " + timeOfDay + ", Ladies and gentlemen! and I'm a " + this.job + " and I'm " + this.age + " years old"); 
		}else if(style === 'friendly'){
			console.log("Hey! What's up? I'm " + this.name + ", I'm a " + this.job + " and I'm " + this.age + " years old. Have a nice " + timeOfDay);
		}
	}
}

var emily = {
	name: 'Emily', 
	age: 35, 
	job: 'designer'
}

john.presentation('friendly','evening')
john.presentation.call(emily, 'formal', 'morning') // this function sets every this keyword into emily so we are accessing emily's elements
// john.presentation.apply(emily, ['friendly', 'afternoon']) // we cannot use apply in this case because the function does not accept array 
var emilyFriendly = john.presentation.bind(emily, 'friendly')
emilyFriendly('afternoon')

var years = [1990, 1965, 1937, 2005, 1998]; 

function arrayCal(array, callbackFunc){
	var arrayRes = []; 
	for (var i = 0; i < array.length; i++){
		arrayRes.push(callbackFunc(array[i]));
	}
	return arrayRes; 
}

function calculateAge(element){
	return 2020 - element; 
}

function isFullAge(limit, element){
	return element >= limit; 
}

var ages = arrayCal(years, calculateAge); 
var fullJapan = arrayCal(ages, isFullAge.bind(this, 20))
console.log(ages)
console.log(fullJapan)
*/
var Question = function(ques, answers, correct){
	this.ques = ques; 
	this.correct = correct; 
	this.answers = answers;
}
function printing(question){
	console.log(question.ques)
	for(var i = 0; i < question.answers.length; i++){
		console.log(question.answers[i]);
	}
}
function compareAns(correct, choice){
	if(choice === correct){
		console.log("CORRECT"); 
	}else{
		console.log("WRONG"); 
	}
}

var ques1 = new Question("Is it hot?", ['0: yes', '1: no'], '0'); 
var ques2 = new Question("Is it cold?", ['0: yes', '1: no'], '1'); 
var ques3 = new Question("Is it excited?", ['0: yes', '1: no', '2: so so'], '2'); 

var questions = [ques1, ques2, ques3]; 

var real = Math.floor(Math.random() * 3); 
printing(questions[real])
var choice = prompt("What is your answer?"); 
compareAns(questions[real].correct, choice)


