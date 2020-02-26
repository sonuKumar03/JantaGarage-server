const {admin,db} = require('./admin');

module.exports =(req,res,next)=>{
    let idToken ;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        idToken = req.headers.authorization.split(' ')[1];
        console.log(idToken);
    }else{
        console.log(" no token found");
        res.status(403).json({error:"unauthorized"});
        }
    admin.auth().
        verifyIdToken(idToken)
        .then(decodedToken=>{
            req.user = decodedToken;
            return db.collection('users')
                    .where('userId','==',req.user.uid)
                    .limit(1)
                    .get()
                    
        }).then(data=>{
            req.user.hadle = data.docs[0].data().handle;
            console.log(req.user);
            next();
        }).catch((err)=>{
            console.log('Error while verifying token ' , err);
            return res.status(403).json(err);
        })
}