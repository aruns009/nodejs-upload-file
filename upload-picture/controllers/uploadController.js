var Joi = require('joi');
const path = require('path');
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
var model = require('../models/uploadModel');
var fileSupported = ['image/png','image/jpeg', 'image/jpg'];

var upload = {
    getAllPictures(req, res) {
        model.getAllPictures(req.body, function(err, result){
            if(err){
                res.status(400);
                res.json(err);
            }
            else{
                var response = {
                    "status": "200",
                    "data": (result.length) ? result: "No images uploaded yet!"
                };
                res.status(200);
                res.json(response);
            }
        });
    },
    async uploadPicture(req, res) {
        try{
            const reqSchema = Joi.object().keys({
            picture_name: Joi.string().required()
            }).required();
            const schemaValidationResult = Joi.validate(req.body, reqSchema);
            if(schemaValidationResult.error){
                const errResponse = {code: "403", message: schemaValidationResult.error.details.map(d => d.message)};
                res.status(403);
                res.json(errResponse);
            }
            else{
                const imagePath = path.join(__dirname, '../images');
                if (!req.file && !fileSupported.includes(req.file.mimetype)) {
                    res.status(401).json({error: 'Please upload a valid image file'});
                }
                const filename = `${req.body.picture_name}-${uuidv4()}.png`;
                const filepath = path.resolve(`${imagePath}/${filename}`);
                const hostPath = req.protocol + '://' + req.get('host') + "/images/" + filename;

                var response_upload = await sharp(req.file.buffer)
                                            .resize(300, 300, {
                                                fit: sharp.fit.inside,
                                                withoutEnlargement: true
                                            })
                                            .toFile(filepath);
                if(response_upload){
                    var pictureInfo = {
                        "picture_name": req.body.picture_name,
                        "picture_url": hostPath
                    };
                    model.uploadPicture(pictureInfo, function(err, result){
                        if(err){
                            res.json(err);
                        }
                        else{
                            var response = {
                                "status": "200",
                                "data": pictureInfo
                            };
                            res.status(200);
                            res.json(response);
                        }
                    });
                }

            }
        }catch (e) {
            res.status(401).json({"status": "401", error: 'Please upload a valid image file'});
        }
    }
};
module.exports = upload;