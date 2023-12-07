const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://quyet1911:htHx2yRmV6g7d9ZL@cluster0.e1wg4.mongodb.net/?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log('conneted');
        callback(client);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports = mongoConnect;