if(myAuth.currentUser) location.href = "index.html";
const frm = document.querySelector('.frm_reg');
const err = document.querySelector('.frm__err');
const suc = document.querySelector('.frm__suc');
const userpt = /^[A-Za-z0-9]{3,15}$/;
const passpt = /^.{6,}$/;
const emailpt = /^[A-Za-z0-9_\-\.]{4,65}@[A-Za-z]{3,12}\.[A-Za-z]{2,3}$/;

frm.addEventListener('input', _=>err.innerText = "");

frm.addEventListener('submit', e=>{
    e.preventDefault();
    if(frm.pass.value != frm.rpass.value) return err.innerText = "Password fields doesn't match.";
    else if(frm.name.value ==="" || frm.email.value ==="" || frm.pass.value ==="")
    return err.innerText = "Please fill the fields.";
		else{
			if(!frm.pass.value.match(passpt)) return err.innerText = "Please use a stronger password.";
			if(!frm.email.value.match(emailpt)) return err.innerText = "Please use a proper email address.";
			if(!frm.name.value.match(userpt)) return err.innerText = "Please use a proper username. Max 15 characters";
        createUser(frm.email.value.trim().toLowerCase(), frm.pass.value).then(user=>{
					if(typeof user === 'string')  return err.innerText = user;
            suc.innerText = "Account created successfully!";
            user.updateProfile({displayName: frm.name.value.trim()});
            suc.innerText += " Welcome "+ frm.name.value.trim();
            frm.reset();
            setTimeout(_=>location.href = "index.html", 300);
        }).catch(e=> err.innerText = e.message);
    }
});


async function createUser(email, pass){
    //creates a new user and sends all the data to firebase authentication server.
	//passwords are handled by firebase authentication.
    try {
        const create = await myAuth.createUserWithEmailAndPassword(email, pass);
        return create.user;
    }catch(e){
        return err.innerText = e.message;
    }
};