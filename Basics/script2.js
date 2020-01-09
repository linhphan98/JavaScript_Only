var john = {
	name: "John", 
	yearOfBirth: 1990, 
	calculateAge: function(){
		console.log(this)
		console.log(2016 - this.yearOfBirth)

		/*
		function innerFunction(){
			console.log(this.john)	
			//because it is an inner function
			//this keyword refers back to the window object
		}
		innerFunction()
		*/
	}
}

john.calculateAge()

const mike = {
	name: "Mike", 
	yearOfBirth: 1984
}

mike.calculateAge = john.calculateAge;
mike.calculateAge()
