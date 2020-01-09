export default class Likes {
	constructor(){
		this.likes = []
	}

	addLike(id, title, publisher, img){
		const like = {id, title, publisher, img}
		this.likes.push(like)
		this.persistData()
		return like
	}
	
	deleteLike(id){
		const index = this.likes.findIndex(el => el.id === id)
		this.likes.splice(index,1)
	}	

	isLiked(id){
		return this.likes.findIndex(el => el.id === id) !== -1; 
	}

	getNumOfLikes() {
		return this.likes.length;
	}

	// Persist data in the local storage so we do not lose the liked recipe when we reload the page 
	
	persistData(){
		// convert the entire array into a string 
		localStorage.setItem('likes', JSON.stringify(this.likes))
	}

	// Get data from the console from the localStorage and then store them in the likes drop down 
	readStorage(){
		// convert the string back to the data structure using by javascript and it will return null if there is no like
		const storage = JSON.parse(localStorage.getItem('likes')); 

		// Restoring likes from the local storage
		if(storage) this.likes = storage;
	}
}




