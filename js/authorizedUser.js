export default class AuthorizedUser{

	constructor(){
		this.myDB = firebase.firestore().collection('articles');
	}
	newPost(title, body){  //adding a new article to the firestore's database.
		this.myDB.add({
			author: myAuth.currentUser.displayName,
			title,
			body,
			time: new Date().getTime()
		});
		return "Article Published.";
	}
	getPost(tag){ //get all the articles from firestore's database.
		this.myDB.orderBy('time', 'asc').get().then(data=>{
			data.docs.forEach(doc=>{
				const dt = doc.data();
				tag.innerHTML += showContent(doc.id, dt.author, dt.title, dt.body,dt.time);
			});
		});
	}
	getLatestPost(tag){ //get all the articles and order them with recent articles from firestore's database.
		this.myDB.orderBy('time', 'desc').get().then(data=>{
			data.docs.forEach(doc=>{
				const dt = doc.data();
				tag.innerHTML += showContent(doc.id, dt.author, dt.title, dt.body,dt.time);
			});
			
		});
	}
	deletePost(id){ //deleting an article if the author signed in.
		this.myDB.doc(id).delete();
		setTimeout(_=>location.reload(), 100);
	}
	searchPost(tag, keyword){//searching articles
		this.myDB.orderBy('time', 'asc').get().then(data=>{
			let titles = [];
			data.docs.forEach(doc=>titles.push({title: doc.data().title, doc}));
			titles.forEach(item=>{
				if(item.title.includes(keyword)){
					const dt = item.doc.data();
					tag.innerHTML += showContent(item.doc.id, dt.author, dt.title, dt.body,dt.time);
				}
			});
		});
	}
}
function showContent(id, author, title, body,time){

	let html = `<div class="my-7" data-id="${id}"><div><div class="flex justify-between gap-6"><div><h4 class="break-words text-3xl inline capitalize font-semibold">${title}</h4><small class="ml-3 italic">by ${author}</small></div>`;
	if(myAuth.currentUser?.displayName === author)
	html += `<button class="deletePost self-center select-none text-white bg-red-600 cursor-pointer focus:outline-none hover:bg-red-800 py-1 px-3 rounded">Delete</button>`;
	html += `</div><small class="italic select-none">${new Date(time).toLocaleString()}</small><p class="text-xl break-words">${body}</p></div>`;
	return html;
}