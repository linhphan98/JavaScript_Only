
const firstName = 'John'; 
console.log(firstName)


pop up
const firstName = 'John'; 
alert("Hi It Is " + firstName)


pop up to get user enter values
const lastName = prompt("What is his last name"); 
console.log(lastName)



const firstName = 'John'
const age = 11; 

age >= 18 ? console.log(firstName + " drinks beers") 
: console.log(firstName+" drinks juice")



function calculateAge(birthYear){
	return 2018 - birthYear; 
}
const john = calculateAge(1998); 
const mike = calculateAge(1948); 
console.log(john, mike)



const calculateAge = function(birthYear, name){
	return name + " is " + (2018 - birthYear); 
}
console.log(calculateAge(1998, "John"));
console.log(calculateAge(1948, "Mike")); 
 


const name = ['John', 'Mark', 'Jane']; 
name[name.length] = "Mary";
console.log(name.length);
const john = ['John', "Smith", 1990, "teacher", false];
john.push('Blue'); // add to the last element
john.unshift("Mr.")	// add to the first element
john.pop() // delete the last element
john.shift() // delete the first element 
console.log(john.indexOf("teacher"))
console.log(john)



const john = {
	firstName: "John", 
	lastName: "Smith", 
	birthYear: 1998, 
	family: ["Jane", "Mark", "Bob", "Emily"],
	job: 'Teacher', 
	isMarried: false, 
	calculateAge: function(){
		this.age =  2018 - this.birthYear; 
	}
}

console.log(john.lastName)
const x = 'family'; 
john.family.push("Gary")
console.log(john[x])
john.calculateAge()
console.log(john.age)
 





