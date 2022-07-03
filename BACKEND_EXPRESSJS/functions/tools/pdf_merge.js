// Maintainer : Eki

// READ ME  : 
// function ini digunakan untuk download file ke memory (tanpa harus simpan file ke storage)


let error_detail = require('./try_catch_error_detail');
let aws_s3 = require('./aws_s3');

let fs = require('fs');
const PDFDocument = require('pdf-lib').PDFDocument;
const axios = require('axios').default;


// RND LIST : 
// const PDFMerger = require('pdf-merger-js');  // ERR
// const merge = require('easy-pdf-merge'); // ERR
// const { merge } = require('merge-pdf-buffers'); // ERR
// const pdftk = require('node-pdftk'); // ERR
//================ STREAM URL
// const stream = require('stream');  // ERR
// const fetch = require("node-fetch"); // ERR
//================ STREAM URL




exports.PDFMerge = async (req_body) => { // SAVE TO STORAGE  __basedir + "/PDF_FILES/"


  // EXAMPLE PARAMS :
  // {
  //   "URL_ARR": [
  //     "https://accounts.forstok.com/api/v1/documents.pdf?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmRlcl9pZHMiOjEyMjIwNTg3NSwidHlwZSI6InNoaXBwaW5nX2xhYmVscyIsImVtYWlsIjoiZ3JvemVyc3RvcmVAZ21haWwuY29tIiwicHJvZmlsZV9pZCI6MTEzMH0.xWer-8aY-FMamrbhGapXkc3eRVUAv4egGmNTuo0-0do",
  //     "https://accounts.forstok.com/api/v1/documents.pdf?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmRlcl9pZHMiOjEyMjIwNzY4MCwidHlwZSI6InNoaXBwaW5nX2xhYmVscyIsImVtYWlsIjoiZ3JvemVyc3RvcmVAZ21haWwuY29tIiwicHJvZmlsZV9pZCI6MTEzMH0.6bfpgfsX7aJue9Ict24T_3UhsAaFPIU4C3cG7UrYO4c"
  //   ]
  // }

  // REFERENCE : 
  // https://stackoverflow.com/questions/36766234/nodejs-merge-two-pdf-files-into-one-using-the-buffer-obtained-by-reading-them 
  // https://www.npmjs.com/package/pdf-lib


  let res_json = {};

  if (req_body.URL_ARR && req_body.URL_ARR.constructor == Array) {

  } else {
    res_json.statusCode = 0;
    res_json.message = "URL_ARR is not array";
    return res_json;
  }

  try {

    // console.log("DIRECTORY : " + __basedir);

    let BUFFER_FILE = null;

    let MULTI_BUFFER = [];

    for (let i_a = 0; i_a < req_body.URL_ARR.length; i_a++) {


      let SINGLE_BUFFER = null;
      try {

        SINGLE_BUFFER = await axios.get(req_body.URL_ARR[i_a],
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/pdf'
            }
          });

      } catch (error) {

        // retry

        SINGLE_BUFFER = await axios.get(req_body.URL_ARR[i_a],
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/pdf'
            }
          });
      }

      MULTI_BUFFER.push(SINGLE_BUFFER.data);

    }




    var pdfsToMerge = MULTI_BUFFER;

    const mergedPdf = await PDFDocument.create();
    for (const pdfBytes of pdfsToMerge) {
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => {
        mergedPdf.addPage(page);
      });
    }

    BUFFER_FILE = await mergedPdf.save();

    let auto_generate = ("0" + new Date().getDate()).slice(-2) + "-"
      + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-"
      + new Date().getFullYear() + "-"
      + ("0" + new Date().getHours()).slice(-2)
      + ("0" + new Date().getMinutes()).slice(-2)
      + ("0" + new Date().getMilliseconds());

    let file_type = ".pdf";


    if (!fs.existsSync(__basedir + "/PDF_FILES/")) {
      fs.mkdirSync(__basedir + "/PDF_FILES/");
    }


    directoryPath = __basedir + "/PDF_FILES/";


    fs.writeFileSync(directoryPath + auto_generate + file_type, BUFFER_FILE, function (err, result) {
      if (err) console.log(console_log);
    });



    res_json.statusCode = 1;
    res_json.message = "OK";
    res_json.FILE_NAME = auto_generate + file_type;
    return res_json;



  } catch (error) {
    error_detail.try_catch_error_detail(error);
    console.log('function odf_merge.PDFMerge, error : ' + error.message);
    res_json.statusCode = 0;
    res_json.message = error.message;
    return res_json;
  }


};



exports.PDFMergeBufferAwsS3 = async (req_body) => { // SAVE TO STORAGE  __basedir + "/PDF_FILES/"


  // EXAMPLE PARAMS :
  // {
  //   "company_id" :  "EKITESTING20220519420", // is optional
  //   "URL_ARR": [
  //     "https://accounts.forstok.com/api/v1/documents.pdf?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmRlcl9pZHMiOjEyMjIwNTg3NSwidHlwZSI6InNoaXBwaW5nX2xhYmVscyIsImVtYWlsIjoiZ3JvemVyc3RvcmVAZ21haWwuY29tIiwicHJvZmlsZV9pZCI6MTEzMH0.xWer-8aY-FMamrbhGapXkc3eRVUAv4egGmNTuo0-0do",
  //     "https://accounts.forstok.com/api/v1/documents.pdf?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmRlcl9pZHMiOjEyMjIwNzY4MCwidHlwZSI6InNoaXBwaW5nX2xhYmVscyIsImVtYWlsIjoiZ3JvemVyc3RvcmVAZ21haWwuY29tIiwicHJvZmlsZV9pZCI6MTEzMH0.6bfpgfsX7aJue9Ict24T_3UhsAaFPIU4C3cG7UrYO4c"
  //   ]
  // }

  // REFERENCE : 
  // https://stackoverflow.com/questions/36766234/nodejs-merge-two-pdf-files-into-one-using-the-buffer-obtained-by-reading-them 
  // https://www.npmjs.com/package/pdf-lib


  let res_json = {};

  if (req_body.URL_ARR && req_body.URL_ARR.constructor == Array) {

  } else {
    res_json.statusCode = 0;
    res_json.message = "URL_ARR is not array";
    return res_json;
  }

  try {

    // console.log("DIRECTORY : " + __basedir);

    let BUFFER_FILE = null;

    let MULTI_BUFFER = [];

    for (let i_a = 0; i_a < req_body.URL_ARR.length; i_a++) {


      // ============================ GENERATE BUFFER ============================
      let SINGLE_BUFFER = null;
      try {

        SINGLE_BUFFER = await axios.get(req_body.URL_ARR[i_a],
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/pdf'
            }
          });

      } catch (error) {

        // retry

        SINGLE_BUFFER = await axios.get(req_body.URL_ARR[i_a],
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/pdf'
            }
          });
      }

      MULTI_BUFFER.push(SINGLE_BUFFER.data);

    }

    // ============================ /GENERATE BUFFER ============================


    // ============================ MERGE PDF ============================

    try {
      var pdfsToMerge = MULTI_BUFFER;

      const mergedPdf = await PDFDocument.create();
      for (const pdfBytes of pdfsToMerge) {
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      BUFFER_FILE = await mergedPdf.save();
    } catch (error) {

      res_json.statusCode = 0;
      res_json.message = "func pdf_merge.PDFMergeBufferAwsS3, merge pdf, error : " + error.message;

      console.log(res_json.message);
      return res_json;

    }



    // ============================ /MERGE PDF ============================


    // ============================ UPLOAD AWS S3 ============================
    let S3Upload = null;
    let filename_with_ext = null;
    let file_url = null;

    try {
      let auto_generate = ("0" + new Date().getDate()).slice(-2) + "-"
        + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-"
        + new Date().getFullYear() + "-"
        + ("0" + new Date().getHours()).slice(-2)
        + ("0" + new Date().getMinutes()).slice(-2)
        + ("0" + new Date().getMilliseconds());


      filename_with_ext = "PDF_MERGE_" + auto_generate + ".pdf";



      if (req_body && req_body.company_id) {
        S3Upload = await aws_s3.upload(BUFFER_FILE, filename_with_ext, req_body.company_id);
      } else {
        S3Upload = await aws_s3.upload(BUFFER_FILE, filename_with_ext);
      }

      if (S3Upload && S3Upload.statusCode == 1) {
        file_url = S3Upload.url;
      } else {
        res_json.statusCode = 0;
        res_json.message = "func pdf_merge.PDFMergeBufferAwsS3 #2, upload aws s3, error : " + S3Upload.message
        console.log(res_json.message);
        return res_json;
      }

    } catch (error) {
      res_json.statusCode = 0;
      res_json.message = "func pdf_merge.PDFMergeBufferAwsS3 #1, upload AWS S3, error : " + error.message;

      console.log(res_json.message);
      return res_json;
    }



    // ============================ /UPLOAD AWS S3 ============================

    res_json.statusCode = 1;
    res_json.message = "Success";
    res_json.filename_with_ext = filename_with_ext
    res_json.file_url = file_url
    // res_json.MULTI_BUFFER = MULTI_BUFFER;
    return res_json;


  } catch (error) {
    error_detail.try_catch_error_detail(error);
    console.log('function odf_merge.PDFMerge, error : ' + error.message);
    res_json.statusCode = 0;
    res_json.message = error.message;
    return res_json;
  }


};







// exports.PDFMergeRnd = async (req_body) => {

//   // let merger = new PDFMerger();

//   let res_json = {};

//   if (req_body.URL_ARR && req_body.URL_ARR.constructor == Array) {

//   } else {
//     res_json.statusCode = 0;
//     res_json.message = "URL_ARR is not array";
//     return res_json;
//   }

//   try {







//     console.log("DIRECTORY : " + __basedir);



//     let BUFFER_FILE = null;

//     // for (let i_a = 0; i_a < req_body.URL_ARR.length; i_a++) {

//     //   // const resp = await fetch(req_body.URL_ARR[i_a]);
//     //   // const buff = await resp.arrayBuffer();
//     //   // const buffer = Buffer.from(buff);
//     //   // const readStream = new stream.PassThrough();
//     //   // readStream.end(buffer);

//     //   // if (readStream) {
//     //   //   merger.add(readStream);
//     //   //  }


//     //   let response = await file_buffer.DownloadFileToMemory(req_body.URL_ARR[i_a]);
//     //   // if (response) {
//     //   //   // reference : https://www.npmjs.com/package/pdf-merger-js
//     //   //   merger.add(response);
//     //   // }


//     // }




//     // const merge_buffer = await merge(req_body.URL_ARR);
//     // let BUFFER_FILE = merge(req_body.URL_ARR)
//     //  let  merge_buffer = await merger.saveAsBuffer('merged.pdf');

//     // let merge_buffer = merger.save('merged.pdf');
//     // await merger.save('merged.pdf');





//     // if (response) {
//     //   // reference : https://www.npmjs.com/package/pdf-merger-js
//     //   merger.add(response);
//     // }

//     // let response1 = await file_buffer.DownloadFileToMemory(req_body.URL_ARR[0]); // BUFFER RUSAK
//     // let response2 = await file_buffer.DownloadFileToMemory(req_body.URL_ARR[1]);// BUFFER RUSAK



//     // const resp = await fetch(req_body.URL_ARR[0]);
//     // const buff = await resp.arrayBuffer();
//     // const buffer = Buffer.from(buff);
//     // const readStream = new stream.PassThrough();
//     // readStream.end(buffer);

//     // console.log(readStream)

//     // let response1 = readStream
//     // let response2 = readStream




//     let response1 = await axios.get(req_body.URL_ARR[0],
//       {
//         responseType: 'arraybuffer',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/pdf'
//         }
//       });
//     // .then((response) => {
//     //   response1 = [response.data]
//     //   // const link = document.createElement('a');
//     //   // link.href = url;
//     //   // link.setAttribute('download', 'file.pdf'); //or any other extension
//     //   // document.body.appendChild(link);
//     //   // link.click();
//     // })
//     // .catch((error) => console.log(error));
//     response1 = response1.data;


//     let response2 = await axios.get(req_body.URL_ARR[1],
//       {
//         responseType: 'arraybuffer',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/pdf'
//         }
//       });
//     // .then((response) => {
//     //   response2 = [response.data];
//     //   // const link = document.createElement('a');
//     //   // link.href = url;
//     //   // link.setAttribute('download', 'file.pdf'); //or any other extension
//     //   // document.body.appendChild(link);
//     //   // link.click();
//     // })
//     // .catch((error) => console.log(error));


//     response2 = response2.data;



//     // const response1 = fs.readFileSync(__basedir + "/PDF_FILES/A.pdf"); // OK HARUS DI DL
//     // const response2 = fs.readFileSync(__basedir + "/PDF_FILES/B.pdf"); // OK HARUS DI DL

//     var pdfsToMerge = [response1, response2];


//     const mergedPdf = await PDFDocument.create();   // https://stackoverflow.com/questions/36766234/nodejs-merge-two-pdf-files-into-one-using-the-buffer-obtained-by-reading-them //https://www.npmjs.com/package/pdf-lib
//     for (const pdfBytes of pdfsToMerge) {
//       const pdf = await PDFDocument.load(pdfBytes);
//       const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
//       copiedPages.forEach((page) => {
//         mergedPdf.addPage(page);
//       });
//     }

//     BUFFER_FILE = await mergedPdf.save();        // Uint8Array

//     // let path = 'merged.pdf';
//     // fs.open(path, 'w', function (err, fd) {
//     //     fs.write(fd, buf, 0, buf.length, null, function (err) {
//     //         fs.close(fd, function () {
//     //             console.log('wrote the file successfully');
//     //         });
//     //     });
//     // });















//     // BUFFER_FILE = await pdftk
//     //   .input([response1, response2])

//     //   // .input([response]) // array handle
//     //   .output()
//     //   .then(buf => {
//     //     let path = __basedir + "/PDF_FILES/" + 'merged.pdf';
//     //     fs.open(path, 'w', function (err, fd) {
//     //       fs.write(fd, buf, 0, buf.length, null, function (err) {
//     //         fs.close(fd, function () {
//     //           console.log('wrote the file successfully');
//     //         });
//     //       });
//     //     });
//     //   });











//     let auto_generate = ("0" + new Date().getDate()).slice(-2) + "-"
//       + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-"
//       + new Date().getFullYear() + "-"
//       + ("0" + new Date().getHours()).slice(-2)
//       + ("0" + new Date().getMinutes()).slice(-2)
//       + ("0" + new Date().getMilliseconds());

//     let file_type = ".pdf";

//     let new_dir = 'TESTING';

//     // if (!fs.existsSync(__basedir + "/PDF_FILES/" + new_dir)) {
//     //   fs.mkdirSync(__basedir + "/PDF_FILES/" + new_dir);
//     // }


//     // let directoryPath


//     if (!fs.existsSync(__basedir + "/PDF_FILES/")) {
//       fs.mkdirSync(__basedir + "/PDF_FILES/");
//     }


//     directoryPath = __basedir + "/PDF_FILES/";



//     // let pdf = await merger.save('merged.pdf')
//     // const buff = fs.readFileSync("pdfs/abcd.pdf");
//     fs.writeFileSync(directoryPath + auto_generate + file_type, BUFFER_FILE, function (err, result) {
//       if (err) console.log(console_log);
//     });



//     res_json.statusCode = 1;
//     res_json.message = "OK";
//     res_json.FILE_NAME = auto_generate + file_type;
//     return res_json;



//   } catch (error) {
//     error_detail.try_catch_error_detail(error);
//     console.log('function odf_merge.PDFMerge, error : ' + error.message);
//     res_json.statusCode = 0;
//     res_json.message = error.message;
//     return res_json;
//   }


// };