import axios from 'axios'

export default class Recipe {
	constructor(id){
		this.id = id;
	}

	async getRecipe(){
		try{
			const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.publisher = res.data.recipe.publisher
			this.img = res.data.recipe.image_url;
			this.source = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		}catch(error){
			alert('Something went wrong')
		}
	}

	calcTime(){
		// Assuming that we need 15 min for each 3 ingredients
		const numIng = this.ingredients.length
		const periods = Math.ceil(numIng/3);
		this.time = periods * 15
	}

	calcServing(){
		this.serving = 4;
	}

	parseIngredients(){
		const unitsLong = ['tablespoons', 'tablespoon', 'ounce', 'ounces', 'teaspoon', 'teaspoons', 'cups', 'pounds']; 
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound']
		const units = [...unitsShort, 'kg', 'g']

		const newIngredients = this.ingredients.map(el => {
			// Make all unit the same 
			let ingredient = el.toLowerCase(); 
			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShort[i])
			})

			// Remove parentheses
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ')

			// Parse ingredients into count, unit and ingredient 
			const arrIngredient = ingredient.split(' ');
			// because we dont know what unit or no unit at all so we cannot use indexOf then paste in the unit name 
			// includes() returns true or false then findIndex() will find the index of the true parameter that was pasted in by includes()
			const unitIndex = arrIngredient.findIndex(el2 => units.includes(el2));
			
			let objIngredient; 
			if(unitIndex > -1){
				// there is a unit
				const arrCount = arrIngredient.slice(0, unitIndex); // Ex: 1 1/2 cups, arrIngredient = [1, 1/2]
				let count; 

				if(arrCount.length === 1){
					// count = arrIngredient[0]
					// there is a case where : 2-1/2 cups and because of the split function 2-1/2 is count as one element in arrIngredient array
					count = eval(arrIngredient[0].replace('-', '+'));
				}else{
					// join two strings then use evaluate the string 
					count = eval(arrIngredient.slice(0, unitIndex).join('+')); // eval("1+1/2") --> 1.5
				}

				objIngredient = {
					count, 
					unit: arrIngredient[unitIndex], 
					ingredient: arrIngredient.slice(unitIndex+1).join(' ')
				}

			}else if (parseInt(arrIngredient[0], 10)){
				// There is no unit, but 1st element is a number
				objIngredient = {
					count: parseInt(arrIngredient[0], 10), 
					unit: '', 
					ingredient: arrIngredient.slice(1).join(' ')
				}
			}else if(unitIndex === -1){
				// there is no unit and no number in 1st element 
				objIngredient = {
					count: 1, 
					unit: '', 
					ingredient
				}

			}

			return objIngredient;
		})
		this.ingredients = newIngredients;
	}

	updateServing(type) {
		// Servings 
		const newServing = type === 'dec' ? this.serving - 1 : this.serving + 1;
		
		// Ingredients 
		this.ingredients.forEach(ing => {
			ing.count *= (newServing/this.serving)
		})

		this.serving = newServing;
	}
}



