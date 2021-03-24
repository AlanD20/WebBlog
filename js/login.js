if(myAuth.currentUser) location.href = "index.html";
const frm = document.querySelector('.frm_login');
const err = document.querySelector('.frm__err');
const suc = document.querySelector('.frm__suc');

frm.addEventListener('input', _=>err.innerText = "");

frm.addEventListener('submit', e=>{
    e.preventDefault();
    if(frm.email.value === "" || frm.pass.value === "") return err.innerText = "Please fill the fields.";
    else{
        verifyUser(frm.email.value.trim().toLowerCase(), frm.pass.value).then(user=>{
				if(typeof user === 'string')  return err.innerText = user;
        if(myAuth.currentUser)
            window.location.href = "index.html";
        }).catch(e=> err.innerText = e.message);
    }
});

async function verifyUser(email, pass){
	//creates a connection to firebase authentication API to verify email and password.
    try {
        const verify = await myAuth.signInWithEmailAndPassword(email, pass);
        suc.innerText = "Login successful.";
        return verify.user;
    }catch(e){
        return err.innerText = e.message;
    }
};