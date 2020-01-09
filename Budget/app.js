// we create an IFFE when we need to build a MODULE
var budgetController = (function(){

	var Expense = function(id, description, value){
		this.id = id; 
		this.description = description; 
		this.value = value; 
		this.percentage = -1;
	}

	// this method allows every expense to have a calculated percentage with the current income 
	// we do this on the prototype instead of in another method 
	Expense.prototype.calculatedPercentage = function(totalIncome){
		if(totalIncome > 0){
			this.percentage = Math.round((this.value/totalIncome)*100); 
		}else {
			this.percentage = -1;
		}
	}
	
	Expense.prototype.getPercentage = function(){
		return this.percentage; 
	}

	var Income = function(id, description, value){
		this.id = id; 
		this.description = description; 
		this.value = value; 
	}

	// create a big data variable instead of having a lot of data floating around
	var data = {
		allItems: {
			// set the name exactly as the type we gonna have in return 
			// to call them if we pass them by string like type = 'inc' we use [type]
			// to call them directly, we use .inc or .exp instead of 
			exp: [], 
			inc: []
		}, 
		totals: {
			exp: 0, 
			inc: 0
		}, 
		budget: 0, 
		percentage: -1 
	} 

	var calculateTotal = function(type){
		var sum = 0; 
		data.allItems[type].forEach(function(e){
			sum += e.value; 
		})
		data.totals[type] = sum; 
	}

	return {
		addItem: function(type, description, value){
			var newItem,ID;
			
			// [1,2,3,4,5], next ID = 6
			// [1,2,4,6,8], next ID = 9 
			// ID = last's ID - 1
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			}else{
				ID = 0;
			}

			if(type === 'exp'){
				newItem = new Expense(ID,description,value)
			}else if (type === 'inc'){
				newItem = new Income(ID, description,value)
			}

			data.allItems[type].push(newItem)
			return newItem;
		}, 

		deleteItem: function(type, id){
			var ids, index; 

			// loop over every element and adds their ids into an array
			// map is different from forEach because it will return array when forEach does not return anything
			ids = data.allItems[type].map(function(current){
				return current.id; 
			})

			index = ids.indexOf(id); // can be -1 
			// id = 6
			// ids = [1, 2, 4, 6, 8]
			// index = 3

			if(index !== -1){
				// delete n item at that index 
				data.allItems[type].splice(index, 1); 
			}

		},

		calculateBudget: function(){

			// calculate total income and expense 
			calculateTotal('exp'); 
			calculateTotal('inc');

			// calculate the budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp; 

			// calculate the percentage of income that we spent
			if(data.totals.inc > 0){
				data.percentage = Math.round((data.totals.exp/data.totals.inc)*100); 				
			}else {
				data.percentage = -1;
			}

		}, 

		calculatePercentage: function(){
			/*
			a=20, b=10, c=40
			income = 100
			a=20%, b=10%, c=40%
			*/

			data.allItems.exp.forEach(function(curr){
				curr.calculatedPercentage(data.totals.inc);
			})
		},

		getPercentage: function(){
			var allPercentages = data.allItems.exp.map(function(curr){
				return curr.getPercentage();
			})
			return allPercentages; 
		},
		
		getBudget: function(){
			return {
				budget: data.budget, 
				totalIncome: data.totals.inc, 
				totalExpense: data.totals.exp,
				percentage: data.percentage
			}
		}, 

		testing: function(){
			console.log(data)
		}
	}

})(); 

var UIController = (function(){
	var DOMstrings = {
		inputType: '.add__type', 
		inputDesc: '.add__description', 
		inputValue: '.add__value', 
		addButton: '.add__btn', 
		incomeContainer: '.income__list', 
		expenseContainer: '.expenses__list', 
		budgetLabel: '.budget__value', 
		incomeLabel: '.budget__income--value', 
		expenseLabel: '.budget__expenses--value', 
		percentageLabel: '.budget__expenses--percentage',
		container: '.container', 
		expensePercentageLabel: '.item__percentage', 
		dateLabel: '.budget__title--month'

	}
	var formatNumber = function(num, type){
		var numSplit, int, dec; 
		/*
		+ or - before num 
		exactly 2 decimals
		comma separating the thousands
		*/
			
		num = Math.abs(num); 
		// built in for number 'object'
		num = num.toFixed(2)

		numSplit = num.split('.'); 
			
		int = numSplit[0]; 
		if(int.length > 3){
			int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,3)	// input 23510, output 23,510
		}
		dec = numSplit[1]; 
			
		return (type === 'exp' ? '-' : '+') + ' ' + int +'.'+ dec; 
	};

	// loop over the list 
	// create your own for loop to loop over the Node list
	var nodeListForEach = function(nodeList, callback){
		for (var i = 0; i < nodeList.length; i++){
			callback(nodeList[i], i); 
		}
	}; 


	// object returns public methods
	return {
		getInput: function(){
			return {
				type: document.querySelector(DOMstrings.inputType).value,	// will be either 'inc' or 'exp'
				descrip: document.querySelector(DOMstrings.inputDesc).value, // text
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value) // number
			}
		}, 
		
		addListItem: function(obj, type){
			var html, newHTML, element; 

			// Create HTML string with placeholder text
			if(type === 'inc'){
				// change the value in id, value, etc in HTML string
				html = '<div class="item clearfix" id="inc-%ID%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'				
			
				element = DOMstrings.incomeContainer; 
			}else if (type === 'exp'){
				html = '<div class="item clearfix" id="exp-%ID%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			
				element = DOMstrings.expenseContainer;
			}	

			// Replace the placeholder text with some actual data
			newHTML = html.replace('%ID%', obj.id); 
			newHTML = newHTML.replace('%description%', obj.description); 
			newHTML = newHTML.replace('%value%', formatNumber(obj.value, type)); 

			// Insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML); 
		}, 

		deleteListItem: function(selectorID){
			var element = document.getElementById(selectorID); 
			element.parentNode.removeChild(element); 

		},

		clearField: function(){
			var fields, fieldsArr; 

			// this return a list not an array so we cannot use an array function on this variable
			fields = document.querySelectorAll(DOMstrings.inputDesc+ ',' + DOMstrings.inputValue)
			
			// this turns a list into an array
			fieldsArr = Array.prototype.slice.call(fields)

			// we have 3 arguments: the current value, index number from 0 to length - 1, the entire array 
			fieldsArr.forEach(function(current, index, array){
				// setting everything to empty string
				current.value = ''; 
			})

			// put the cursor back to the description box
			fieldsArr[0].focus();
		},

		displayBudget: function(obj){
			var type; 
			obj.budget >= 0 ? type = 'inc' : type = 'exp'; 
			
			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type); 
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc'); 
			document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExpense, 'exp'); 

			if(obj.percentage > 0){
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';				
			}else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		},

		displayPercentages: function(percentages){
			var fields; 

			// this returns a Node list of HTML element
			fields = document.querySelectorAll(DOMstrings.expensePercentageLabel);

			nodeListForEach(fields, function(current, index){
				if(percentages[index] > 0){
					current.textContent = percentages[index] + '%';
				}else{
					current.textContent = '---'
				}
			})

		}, 

		displayMonth: function(){
			var now, day, year, month, months; 

			now = new Date()
			// var christmas = new Date(2016, 11, 25)
			year = now.getFullYear(); 
			month = now.getMonth();
			day = now.getDate()
			months = ['January', 'February', 'March', "April", 'May', "June", "July", "August", "September", "October", 'November', 'December']
			
			document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + day + ' '+ year;

		}, 

		changedType: function(){
			var fields = document.querySelectorAll(
				DOMstrings.inputType + ',' +
				DOMstrings.inputDesc + ',' + 
				DOMstrings.inputValue); 

			nodeListForEach(fields, function(curr){
				// it connects with the eventlistener change below 
				// we have a default of blue and positve, when we change the type it executes this code and toggle it to red
				// then when we change again the code is executed and change the color back to blue 
				curr.classList.toggle('red-focus');
			}); 

			document.querySelector(DOMstrings.addButton).classList.toggle('red');
		},

		getDOMstrings: function(){
			return DOMstrings;
		}
	}
})();

// GLOBAL APP CONTROLLER
var controller = (function(budget, UI){
	
	var setupEventListeners = function(){
		var DOM = UI.getDOMstrings();
		document.querySelector(DOM.addButton).addEventListener('click', controlAddItem);

		document.addEventListener('keypress', function(event){
			if(event.key == 'Enter'){
				controlAddItem();
			}
		}); 

		document.querySelector(DOM.container).addEventListener('click', controlDeleteItem); 
		document.querySelector(DOM.inputType).addEventListener('change', UI.changedType);
	}

	var updateBudget = function(){
		var budgetTotal; 

		// Calculate the budget 
		budget.calculateBudget(); 

		// Return the budget
		budgetTotal = budget.getBudget();
		
		// Display it 
		UI.displayBudget(budgetTotal); 
	}

	var updatePercentage = function(){
		var percentageArray; 

		// Calculate the percentage
		budget.calculatePercentage()
		
		// Read percentage from the budget controller
		percentageArray = budget.getPercentage(); 

		// Update UI with new percentage
		UI.displayPercentages(percentageArray)
	}

	var controlAddItem = function(){
		var input, newItem; 

		// Get the data 
		input = UI.getInput()

		if(input.descrip !== '' && isNaN(input.value) === false && input.value > 0) {
			
			// add the item to the budget controller 
			newItem = budget.addItem(input.type, input.descrip, input.value)
			
			// add the item to the UI
			UI.addListItem(newItem, input.type)
			
			// clear the field
			UI.clearField()
			
			// calculate and update budget
			updateBudget()
			
			// Calculate and update percentage
			updatePercentage()
		}
	}

	var controlDeleteItem = function(event){
		var itemID, splitID, type, ID;

		// we can see what class is the x symbol 
		// what we want to delete is not only the x symbol's class
		// but the entire thing including descrption, value, etc class or the parent class finding it by parentNode function
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id; 

		if(itemID){

			// itemID : inc-1
			splitID = itemID.split('-'); 
			type = splitID[0];
			ID = parseInt(splitID[1]);

			// Delete the item from data structure
			budget.deleteItem(type, ID);

			// delete from UI
			UI.deleteListItem(itemID);

			// update and show the new budget
			updateBudget()

			// Calculate and update percentage
			updatePercentage()
		}
	}

	return {
		init: function(){
			UI.displayMonth();
			UI.displayBudget({
				budget: 0, 
				totalIncome: 0, 
				totalExpense: 0,
				percentage: -1
			}); 
			setupEventListeners();
		}
	}
})(budgetController, UIController);

controller.init();



