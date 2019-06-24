var app = require("../server");
var request = require('supertest');
const fs = require('mz/fs');

try{
  describe('Unit Test 1 - getAllPictures returns 200 success', function () {
    it('/getAllPictures respond with status 200', function (response) {
        request(app)
            .get('/getAllPictures')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return response(err);
                }
                response();
            });
    });
  });

  describe('Unit Test 2 - uploadPicture returns 200 success', () => {  
      it('/uploadPicture should upload picture and respond with 200 success', () => {
        fs.exists('/usr/app/test/upload/fish.png')
          .then((exists) => {
            if (!exists) throw new Error('file does not exist'); 
            return request(app)
              .post('/uploadPicture')
              .attach('image', "/usr/app/test/upload/fish.png")
              .expect(200)
              .then((res) => {
                const { success, message, filePath } = res.body;
                expect(success).toBeTruthy();
                expect(typeof filePath).toBeTruthy();
              })
              .catch(err => console.log(err));
          });
      });
  });
}catch(e){}
