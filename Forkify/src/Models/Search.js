import axios from 'axios';

export default class Search{
	constructor(query){
		this.query = query;
	}

	async getResult(){
	// const key = 'API key'
	// const proxy = 'https://crossorigin.me/' either that proxy or 'https://cors-anywhere.herokuapp.com/'
	// const res = await axios(`${proxy}https://forkify-api.herokuapp.com/api/search?key=${key}&q=${query}`)
	// make another file to store the proxy and the api key then import from that file
	try{
		// we must use async/await when fetching data because we need to wait until that data is return from the webpage we requested for
		const res =  await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
		this.result = res.data.recipes
		return this.result
	}catch(error){
		alert(error)
	}
	
}
}

