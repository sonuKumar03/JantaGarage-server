const {firebase,config} = require('../config/firebase');
const {admin,db} =require('../util/admin');
const {validateSignUp , validateSignIn} = require('../util/validate');

exports.signup=(req,res)=>{
    let user = req.body;
    console.log(user);
    const {valid , errors}=validateSignUp(user);
    if (!valid) return res.status(400).json(errors);

    let  token , userId;
    db.doc(`/users/${user.handle}`).get()
         .then( data=>{
             if(data.exists){
                 return res.status(400).json({handle:'this handl is already taken'})
             }else{
                 return firebase.auth().createUserWithEmailAndPassword(user.email,user.password);
             }
         }).then(data=>{
                 userId = data.user.uid;
                 return data.user.getIdToken();
         }).then(idToken=>{
             token = idToken;
             const userCredentials = {
                 handle : user.handle,
                 email:user.email,
                 userId
             };
             return db.doc(`users/${user.handle}`).set(userCredentials);
         }).then(()=>{
             return res.status(201).json({token});
         }).catch((err)=>{
             return res.status(500).json({general: 'Something went wrong, please try again' });
         })
 };

 exports.login  =(req,res)=>{
    let user = req.body;
    const {valid , errors}=validateSignIn(user);
    if(!valid){
       return  res.status(403).json(errors);
    }
    firebase.auth().signInWithEmailAndPassword(user.email,user.password)
        .then(data=>{
              return data.user.getIdToken();
        }).then(token=>{
            return res.json({token});
        }).catch(err=>{
           return  res.status(403).json({err:err.code} );
        })
};

exports.uploadImage=(req,res)=>{
   console.log(req.rawBody);
   res.sendStatus(201);
};