/*
const second = () => {
	setTimeout(() => {
		console.log("Async Hello World");
	}, 2000);
}

const first = () => {
	console.log("Hello World");
	second(); 
	console.log("The end")
}
first()

// Callback hell: callback after callback after callback
function getRecipe(){
	setTimeout(() => {
		const recipeID = [524, 234, 111, 662];
		console.log(recipeID)

		setTimeout((id) => {
			const recipe = {title: "Fresh tomato pasta", publisher: "John"}; 
			console.log(`${id}: ${recipe.title}`)

			setTimeout(publisher => {
				const recipe2 = {title: "Italian pizza", publisher: "John"}; 
				console.log(`${publisher}: ${recipe.title}`)
			}, 1500, recipe2.publisher)

		}, 1500, recipeID[2])

	}, 1500);
}

getRecipe()

// Promises - we are recreating the callback hell above
const getIDs = new Promise((resolve, reject) => {	// first setTimeout()
	setTimeout(() => {
		resolve([524, 234, 111, 662]);
	}, 1500);
})

const getRecipe = (recipeID) => {
	return new Promise((resolve, reject) => {
		setTimeout((id) => {
			const recipe = {title: "Fresh tomato pasta", publisher: "John"}; 
			resolve(recipe)
		}, 2000, recipeID)
	})
}

const getRelated = (publisherRecipe) => {
	return new Promise((resolve, reject) => {
		setTimeout(publisherName => {
				const recipe2 = {title: "Italian pizza", publisher: "John"}; 
				resolve(`${publisherName}: ${recipe2.title}`)
			}, 1500, publisherRecipe)
	})
}

getIDs.then((IDs) => {
	return getRecipe(IDs[2])	// return the promise
}).then((recipe) => {
	console.log(recipe)
	return getRelated(recipe.publisher)
}).then((publisher) => {
	console.log(publisher)
}).catch((err) => {
	console.log(err)
})

// Async/Await
async function getRecipesAW(){
	// instead of using then and catch methods we can put the resolve into a variable 
	// async/await and catch()then() has the same functionality but it is shorter way to do 
	const IDs = await getIDs;
	const recipe = await getRecipe(IDs[2]);
	const related = await getRelated(recipe.publisher); 
	console.log(related)

	return recipe; 
	// the function returns a promise so we can use then()catch() on this return value
}
getRecipesAW().then((result) => {
	console.log(`${result.publisher}: ${result.title} is the best ever`)
})
*/

// Fetching data from websites api
// have to use crossorigin.me because of problems with domain and server
fetch('https://crossorigin.me/https://www.metaweather.com/api/location/2487956/')
.then((result) => {
	console.log(result);
	return result.json();	
})
.then((data) => {
	console.log(data)
})
.catch((error) => {
	console.log(error)
})


 