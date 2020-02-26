const isEmpty= (string)=>{
    if(string.trim()===''){
        return true;
    }
    return false;
}

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
  }

exports.validateSignUp = (user)=>{
    let errors = {};
    if(isEmpty(user.email)){
        errors.email="must not be empty";
    }
    if(!isEmail(user.email)){
        errors.email="enter a valid email";
    }
    if(user.password !== user.confirmpassword){
        errors.password="password didn't match";
    }
        return {
            errors,
            valid :Object.keys(errors).length ===0 ? true:false
        }
  }
exports.validateSignIn=(user)=>{
    let errors = {};
    if(isEmpty(user.email)){
        errors.email="must not be empty";
    }
    if(!isEmail(user.email)){
        errors.email="not valid";
    }
    if(isEmpty(user.password)){
        errors.password="must no be empty"
    }
   return {
       valid : Object.keys(errors).length ===0?true:false,
       errors
   }
  }