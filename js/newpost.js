import cu2 from "./authorizedUser.js";
const frm = document.querySelector('.frm_post');
const err = document.querySelector('.frm__err');
const suc = document.querySelector('.frm__suc');

frm.addEventListener('input', _=>err.innerText = "");


frm.addEventListener('submit', e=>{
    if(myAuth.currentUser === null) location.href = "login.html";
    e.preventDefault();
    if(frm.title.value.trim() === "" || frm.body.value.trim() === "") return err.innerText = "Please fill the fields.";
    else{
        if(frm.title.value.length > 65) return err.innerText = "Please choose a shorter title.";
        if(frm.body.value.length > 500) return err.innerText = "Please choose a shorter body content for the article.";
        //adding a new article to firestore's database.
        const current2 = new cu2();
        suc.innerText = current2.newPost(frm.title.value.trim().toLowerCase(), frm.body.value.trim());
        frm.reset();
}
});
