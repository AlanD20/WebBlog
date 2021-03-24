const info = document.querySelector('.userInfo'), content = document.querySelector('.content');;
var prof = null, logout = null, deletePost = null;

import cu from "./authorizedUser.js";

//getting all the articles with latest order from firestore's database.
const current = new cu();
if(location.pathname.includes('index') || location.pathname.length === 1)
current.getLatestPost(content);

//check if the user logged in or not.
myAuth.onAuthStateChanged(user=>{
if(!user){ //show login and registration button.
	info.innerHTML = '<li class="overflow-hidden"><a class="md:p-8 hover:text-pink-600 text-2xl" href="login.html">Login</a></li><li class="overflow-hidden"><a class="md:p-8 hover:text-pink-600 text-2xl" href="register.html">Register</a></li>';
}else{//show logged in buttons.
	info.innerHTML = '<li class="overflow-hidden"><a class="newArticle md:p-8 hover:text-pink-600 text-2xl" href="newpost.html">New Article</a></li><li class="overflow-hidden"><a class="prof md:p-8 hover:text-pink-600 text-2xl" href="#">Profile</a></li><li class="overflow-hidden"><a class="logout md:p-8 hover:text-pink-600 text-2xl" href="#">Logout</a></li>';
	prof = document.querySelector('.prof');
	logout = document.querySelector('.logout');
	if(location.href.includes('newpost'))
	 document.querySelector('.newArticle').classList.add('font-semibold');
	logout.addEventListener('click', _=>{
		myAuth.signOut().then(_=>setTimeout(_=>location.reload(), 100))
	});
	content?.addEventListener('click', e=>{
		if(e.target.classList.contains('deletePost'))
			current.deletePost(e.target.parentElement.parentElement.parentElement.dataset.id);
	});
	prof.addEventListener('click',_=>accountDetails());
}
});


function accountDetails(){ //showing account details.

		document.querySelector('.accDetails').innerHTML = `<div class="accDetail absolute flex flex-col justify-center items-center bottom-0 top-0 left-0 right-0 bg-gray-900 opacity-90 z-20"><h1 class="text-4xl text-white">Profile Details</h1><p class="text-gray-300 text-lg py-4 capitalize">Username: ${myAuth.currentUser.displayName}</p><p class="text-gray-300 text-lg py-4">Email: ${myAuth.currentUser.email}</p><button class="deleteAcc bg-red-600 rounded-lg shadow-lg focus:outline-none text-white py-3 px-10 font-semibold hover:bg-red-900" >Delete Account</button></div>`;
		document.body.style.overflowY = 'hidden';
		document.querySelector('.deleteAcc').addEventListener('click',_=>{
			myAuth.currentUser.delete();
			setTimeout(_=>location.href = "index.html", 300);
		});
		document.querySelector('.accDetail').addEventListener('click',e=>{
			console.log(e.target)
			document.querySelector('.accDetails').innerHTML = "";
			document.body.style.overflowY = 'scroll';
		});
}