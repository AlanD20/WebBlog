const content = document.querySelector('.content');
const search = document.querySelector('.search');
import cu from "./authorizedUser.js";

//creating a new instance of authorizedUser and getting all the articles from Firestore noSQL database.
const current = new cu();
current.getPost(content);

search.addEventListener('keyup', _=>{

    if(search.value.length === 0) current.getPost(content); 
    content.innerHTML = "";
    current.searchPost(content ,search.value.trim().toLowerCase())
});