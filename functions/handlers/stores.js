const {db,admin} = require('../util/admin');
exports.stores=(req, res) => {
//res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    db.collection('stores').get()
        .then(data => {
            let stores = [];
            data.forEach(doc => {
                stores.push(doc.data());
            })
            res.json(stores);
        }).catch(err => {
            console.log(err);
            res.send(500);
        })
    }

exports.createStore=(req, res) => {
    let data = req.body;
    console.log(data);
    let store = {
        location: new admin.firestore.GeoPoint(data.location.lat, data.location.lng),
        services: data.services,
        two_wheeler: data.two_wheeler,
        mobileno: data.mobileno,
        four_wheeler: data.four_wheeler,
        isProvidesPickUpService: data.isProvidesPickUpService,
        store_name: data.store_name,
        email: data.email,
        isOpen: data.isOpen,
        Owner: data.Owner
    }
    db.collection('stores').add(store).then((doc) => {
       res.send(`store creaed with ${doc.id}`);
    }).catch(e => {
        console.log(e); 
        res.send(400);
    })
}
