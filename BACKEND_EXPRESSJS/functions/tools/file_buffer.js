// Maintainer : Eki

// READ ME  : 
// function ini digunakan untuk download file ke memory (tanpa harus simpan file ke storage) 
// NOTE : BUFFER HANTA UNTUK EXCEL, PDF TIDAK BISA


let error_detail = require('./try_catch_error_detail');

//================ STREAM URL
const stream = require('stream');
const fetch = require("node-fetch");
//================ STREAM URL

exports.DownloadFileToMemory = async (URL) => {

  // https://accounts.forstok.com/api/v1/documents.pdf?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmRlcl9pZHMiOjEyMjIwNTg3NSwidHlwZSI6InNoaXBwaW5nX2xhYmVscyIsImVtYWlsIjoiZ3JvemVyc3RvcmVAZ21haWwuY29tIiwicHJvZmlsZV9pZCI6MTEzMH0.xWer-8aY-FMamrbhGapXkc3eRVUAv4egGmNTuo0-0do

  // https://accounts.forstok.com/api/v1/documents.pdf?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcmRlcl9pZHMiOjEyMjIwNzY4MCwidHlwZSI6InNoaXBwaW5nX2xhYmVscyIsImVtYWlsIjoiZ3JvemVyc3RvcmVAZ21haWwuY29tIiwicHJvZmlsZV9pZCI6MTEzMH0.6bfpgfsX7aJue9Ict24T_3UhsAaFPIU4C3cG7UrYO4c


  // "stream": "0.0.2",
  // "node-fetch": "^2.6.1",

  let res_json = {};
  try {


    const resp = await fetch(URL);
    const buff = await resp.arrayBuffer();
    const buffer = Buffer.from(buff);
    const readStream = new stream.PassThrough();
    readStream.end(buffer);

    // res_json.statusCode = 1;
    // res_json.message = "Success";
    // console.log(`file_memory :`);
    // console.log(readStream)

    return readStream

  } catch (error) {
    error_detail.try_catch_error_detail(error);
    console.log('function file_buffer.DownloadFileToMemory, error : ' + error.message);
    res_json.statusCode = 0;
    res_json.message = error.message;
    return res_json;
  }


};