var db = require('../config/dbConnection');

var upload = {

    getAllPictures: function (data, callback) {
        try {
            return db.query('SELECT * FROM pictures', callback);
        } catch (e) {
            console.log("Error in getAllPictures : " + e);
        }
    },
    uploadPicture: function (data, callback) {console.log(data);
        try {
            return db.query(`INSERT INTO pictures(picture_name, picture_url) VALUES(?, ?)`, [data.picture_name, data.picture_url], callback);
        } catch (e) {
            console.log("Error in uploadPicture : " + e);
        }
    }
};
module.exports = upload;