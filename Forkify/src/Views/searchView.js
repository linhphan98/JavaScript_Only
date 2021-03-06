import {elements} from './base'

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
	elements.searchInput.value = "";
}

export const clearResults = () => {
	elements.searchResultList.innerHTML = "";
	elements.searchResPages.innerHTML = "";
}

/*
	Pasta with tomato and spinach 
acc: 0 -- acc + cur.length = 5 -- newTitle = ['Pasta']
acc: 5 -- acc + cur.length = 9 -- newTitle = ['Pasta', 'with']
acc: 9 -- acc + cur.length = 15 -- newTitle = ['Pasta', 'with', 'tomato']
acc: 15 -- acc + cur.length = 18 -- newTitle = ['Pasta','with', 'tomato']
acc: 18 -- acc + cur.length = 24 -- newTitle = ['Pasta','with', 'tomato']
*/ 
export const limitRecipeTitle = (title, limit = 17) => {
	const newTitle = []; 

	if(title.length > limit){
		title.split(' ').reduce((acc, cur) => {
			if(acc + cur.length <= limit){
				newTitle.push(cur)
			}
			return acc + cur.length;
		}, 0)
		return `${newTitle.join(' ')} ...`;
	}
	return title;
}

const renderRecipe = recipe => {
	const markup = `
						<li>
                            <a class="results__link" href="#${recipe.recipe_id}">
                                <figure class="results__fig">
                                    <img src="${recipe.image_url}" alt="${recipe.title}">
                                </figure>
                                <div class="results__data">
                                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                                    <p class="results__author">${recipe.publisher}</p>
                                </div>
                            </a>
                        </li>
	`
	elements.searchResultList.insertAdjacentHTML('beforeend', markup)
}

// type 'prev' or 'next'
const createButton = (page, type) => `
				<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? `left` : `right`}"></use>
                    </svg>
                    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                </button>
`

const renderButton = (page, numOfResult, resPerPage) => {
	const pages = Math.ceil(numOfResult/resPerPage); // round up the number 4.4 = 5 instead of 4

	let button; 
	if(page === 1 && pages > 1){
		// only button to go to the next page
		button = createButton(page, 'next')
	}else if(page < pages){
		button = `${button = createButton(page, 'prev')}
				  ${button = createButton(page, 'next')}`
	}else if (page === pages && pages > 1) {
		// only button to go back one page 
		button = createButton(page, 'prev')
	}

	elements.searchResPages.insertAdjacentHTML('afterbegin', button)

}

export const renderResult = (recipes, page = 1, resPerPage = 10) => {
	// render results of current page
	const start = (page - 1) * resPerPage; 
	const end = start + resPerPage;

	recipes.slice(start, end).forEach(renderRecipe)

	// render the pagination button 
	renderButton(page, recipes.length, resPerPage)
} 






