// let and const has block scope when var has function scope
// meaning that let and const only work inside the function or the {} it was declared into 
// when the var work outside {}


// String in ES6
let firstName = 'John'; 
let lastName = 'Smith'; 
const yearOfBirth = 1990; 

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth)

// ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}`);

const n =`${firstName} ${lastName}`; 
console.log(n.startsWith('j')); 
console.log(n.endsWith('Sm')); 
console.log(n.includes('oh'));
console.log(`${firstName} `.repeat(5))

// Arrow functions
const years = [1990, 1965, 1982, 1937]; 

// ES5
var ages5 = years.map(function(el){
	return 2020 - el; 
})
console.log(ages5); 
// ES6
let ages6 = years.map(el => 2020 -el); 
console.log(ages6); 
ages6 = years.map((el, index) => `Age element ${index + 1}: ${2020 - el}.`); 
console.log(ages6);

// ES5
var box5 = {
	color: 'green', 
	position: 1, 
	clickMe: function(){
		var self = this; 

		document.querySelector('.green').addEventListener('click', function(){
			var str = 'This is box number ' + self.position + ' and it is ' + self.color; 
			alert(str) 
		})
		console.log(this.color + ' ' + this.position)
	}
}

// ES6	- Do not use arrow function with arrow function (when we change the click me function into arrow function it will not work )
var box6 = {
	color: 'green', 
	position: 1, 
	clickMe: function(){
		document.querySelector('.green').addEventListener('click', () => {
			var str = 'This is box number ' + this.position + ' and it is ' + this.color; 
			alert(str) 
		})
	}
}
box6.clickMe()

// Destructuring - using the same brackets and matching the keys with variables

// ES5
var john = ['John', 26]; 
var name = john[0]; 
// var age = john[1]; 

// ES6
// let [firstName, year] = ['John', 26]
const obj = {
	firstName: 'John', 
	lastName: 'Smith'
}; 
const {firstName, lastName} = obj;

const {firstName: a, lastName: b} = obj;

function calcAgeRetirement(year){
	const age = new Date().getFullYear() - year; 
	return [age, 65 - age]
}

const[age, retirement] = calcAgeRetirement(1990);


const boxes = document.querySelectorAll('.box'); 

// ES5
var boxesArr5 = Array.prototype.slice.call(boxes); 
boxesArr5.forEach(function(e){
	e.style.backgroundColor = 'red';
})

// ES6 - changes NodeList into an array
const boxesArr6 = Array.from(boxes); 
boxesArr6.forEach((e)=>{
	e.style.backgroundColor = 'dodgerblue';
})

// changing the text in each box
// ES5 
for(var i = 0; i < boxesArr5.length; i++){
	if(boxesArr5[i].className === 'box blue'){
		continue; 
	}else{
		boxesArr5[i].textContent = 'I changed to Blue'
	}
}

// ES6
for (const curr of boxesArr6){
	// if(curr.className === 'box blue'){
	if(curr.className.includes('blue')){
		continue; 
	}else{
		curr.textContent = 'I changed to Blue'
	}
}

// ES5
var ages = [12, 17, 8, 21, 14, 11]; 

var full = ages.map(function(curr){
	return curr >= 18;
})
var fullage = full.indexOf(true)
console.log(ages[fullage]);

// ES6
console.log(ages.findIndex((curr) => curr >= 18));
console.log(ages.find((curr) => curr >= 18))

// Spread Operator - expand the array into each element 
function addFourAges(a, b, c, d){
	return a+b+c+d; 
}
var sum1 = addFourAges(18,30,12,21); 
console.log(sum1)

// ES5
var ages = [18, 30, 12, 21]
var sum5 = addFourAges.apply(null, ages); 
console.log(sum5)

// ES6 
const sum6 = addFourAges(...ages);
console.log(sum6)

const familySmith = ['John', 'Jane','Mark']; 
const familyMiller = ['Marry', 'Bob', 'Ann']; 
const bigFamily = [...familySmith, 'Lily', ...familyMiller]; 
console.log(bigFamily)

// Same thing for nodeList
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box'); 
const all = [h, ...boxes]; 

Array.from(all).forEach(curr => curr.style.color = 'pink');

// Rest parameters 
// ES5 
function isFullAge5(limit){ // limit will be a part of the array so we have to slice it off from the second on to get the age array
	// arguments is not an array of things 
	var argsArr = Array.prototype.slice.call(arguments, 1); 
	argsArr.forEach(function(curr){
		console.log((2020 - curr) >= limit)
	}); 
}

isFullAge5(21, 1990, 1999, 2010)

// ES6 
function isFullAge6(limit,...years){
	years.forEach(curr => {
		console.log((2020 - curr) >= limit)
	})
}

isFullAge6(21, 1990, 1999, 2010)

// Default parameters
// ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality){
	
	if(lastName === undefined){
		lastName = 'Smith'
	}
	if(nationality === undefined){
		nationality = 'American'
	}

	this.firstName = firstName; 
	this.yearOfBirth = yearOfBirth; 
	this.lastName = lastName; 
	this. nationality = nationality; 
}

var john = new SmithPerson('John', 1990); 
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish')

// ES6
function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'American'){
	this.firstName = firstName; 
	this.yearOfBirth = yearOfBirth; 
	this.lastName = lastName; 
	this. nationality = nationality; 
}

var john = new SmithPerson('John', 1990); 
var emily = new SmithPerson('Emily', 1983, 'Diaz', 'Spanish')

// maps

const question = new Map(); 
question.set('question', 'What is the official name of the latest JavaScript version?'); 
question.set(1, 'ES5'); 
question.set(2, 'ES6'); 
question.set(3, 'ES 2015'); 
question.set(4, 'ES7'); 
question.set('correct', 3);
question.set(true, 'Correct Answer'); 
question.set(false, 'Wrong, Please try again');

console.log(question.get('question')); 

if(question.has(4)){
	question.delete(4);
}
// to delete everything
// question.clear();

// question.forEach((value, key) => {
// 	console.log(`This is ${key}, and it's set to ${value}`);
// })

for (let [key, value] of question.entries()){
	if(typeof(key) === 'number'){
		console.log(`Answer ${key}: ${value}`);
	}
}

const ans = parseInt(prompt('Write the correct answer')); 
console.log(question.get(ans === question.get('correct')));

// classes and subclasses
// ES5
var Person5 = function(name, yearOfBirth, job){
	this.name = name; 
	this.yearOfBirth = yearOfBirth; 
	this.job = job; 
}

Person5.prototype.calculateAge = function(){
	var age = new Date().getFullYear() - this.yearOfBirth; 
	console.log(age)	
}; 

var Athletes5 = function(name, yearOfBirth, job, olympicGames, medals){
	Person5.call(this, name, yearOfBirth, job); 
	this.olympicGames = olympicGames; 
	this.medals = medals;
}

// has to connect the two prototypes together first then we can add the function later 
Athletes5.prototype = Object.create(Person5.prototype); 

Athletes5.prototype.wonMedal = function(){
	this.medals++; 
	console.log(this.medals)
}

var johnAthlete5 = new Athletes5('John', 1990, 'swimmer', 3, 10)
johnAthlete5.wonMedal()

// ES6
class Person6 {
	constructor (name, yearOfBirth, job){
		this.name = name; 
		this.yearOfBirth = yearOfBirth; 
		this.job = job; 
	}
	calculateAge(){
		var age = new Date().getFullYear() - this.yearOfBirth; 
		console.log(age);	
	}

	// Because it is a static method we cannot access it by its object outside 
	// static greeting(){
	// 	console.log("Hey There")
	// }
}

class Athletes6 extends Person6 {
	constructor (name, yearOfBirth, job, olympicGames, medals){
		super(name, yearOfBirth, job); 
		this.olympicGames = olympicGames; 
		this.medals = medals;
	}
	wonMedal(){
		this.medals++; 
		console.log(this.medals)
	}
}

const johnAthlete6 = new Athletes6('John', 1990, 'swimmer', 3, 10)
johnAthlete6.wonMedal(); 
johnAthlete6.calculateAge()
// const john6 = new Person6('John', 1990, 'teacher')
// Person6.greeting()


