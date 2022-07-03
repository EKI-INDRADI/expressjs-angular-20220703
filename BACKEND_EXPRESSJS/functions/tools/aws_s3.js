
// Maintainer : Eki

// READ ME  : 
// function ini digunakan untuk upload file ke aws s3 


let bucketName = process.env.AWS_BUCKET_NAME || 'ekitesting-xxx';
let bucketURL = process.env.AWS_BUCKER_URL || `https://${bucketName}.s3-ap-southeast-1.amazonaws.com`;

const AWS = require('aws-sdk');
AWS.config.update({    //https://stackoverflow.com/questions/61028751/missing-credentials-in-config-if-using-aws-config-file-set-aws-sdk-load-config
  region: 'ap-southeast-1',
  apiVersion: 'latest',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'asdasdasdada',  // EKI ACCOUNT
    secretAccessKey: process.env.AWS_SECRET_KEY ||'asdadasdas/asdasdasda' // EKI ACCOUNT
  }
});
const lambda = new AWS.Lambda();
const s3 = new AWS.S3();

// const fs = require('fs');
// const fspromises = fs.promises;

let error_detail = require('./try_catch_error_detail');

require('dotenv').config();



exports.upload = async (buffer, filename_with_ext, company_id = null, location = null) => {
  // CTRL + F  "FAST VALIDATION"

  let res_json = {};

  try {


    let validation = {
      // company_id: (company_id) ? company_id : null,
      buffer: (buffer.constuctor == Array) ? true : false,
      filename: (filename_with_ext) ? true : false,
    };



    for (let i_x = 0; i_x < Object.keys(validation).length; i_x++) { // FAST VALIDATION

      if (validation[Object.values(validation)[i_x]] == false) {

        res_json.statusCode = 0;
        res_json.message = `${Object.keys(validation)[i_x]} is null`;
        res_json.validation = validation;

        return res_json;
      }

    }


    let url = null;
    let key = ``;

    url = `${bucketURL}`;
    if (company_id) {
      url = url.concat(`/${company_id}`);
      key = company_id;
    }

    if (location) {
      url = url.concat(`/${location}`);
      key = key.concat(`/${location}`);
    }

    url = url.concat(`/${filename_with_ext}`);
    key = key.concat(`/${filename_with_ext}`);



    // BUG FIX ======================
    // const keyArr = key.split("/");

    // for (let i_x = 0; i_x < keyArr.length; i_x++) {

    //   if (i_x == 0) {
    //     key = keyArr[i_x];
    //   } else {
    //     key = `${key}/${keyArr[i_x]}`
    //   }
    // }

    String(key).replace("/", ""); // (first '/' only ) 
    // BUG FIX ======================




    let params = {
      Bucket: bucketName,
      Key: key, // File name you want to save as in S3
      Body: Buffer.from(buffer, 'binary'),
      ACL: 'public-read'
    };

    console.log("KEY : " + params.Key);
    console.log("URL : " + url);
    let uploaded = await s3.upload(params).promise();

    if (!uploaded) {
      res_json.statusCode = 0;
      res_json.message = 'upload failed';
      res_json.validation = validation;
      return res_json;
    }


    res_json.statusCode = 1;
    res_json.message = 'File uploaded successfully';
    res_json.url = url;
    res_json.filename_with_ext = filename_with_ext;
    res_json.generate_params = params;

    return res_json;

  } catch (error) {

    error_detail.try_catch_error_detail(error);
    console.log('function aws_s3.upload, error : ' + error.message);
    res_json.statusCode = 0;
    res_json.message = error.message;
    return res_json;
  }
};

