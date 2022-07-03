
const Excel = require('exceljs');
exports.readFileXlsxFromDir = async (DIR) => {

  let res_json = {};
  let object_push_dynamic = { data: [] };

  try {
    let workbook = new Excel.Workbook();

    wb = await workbook.xlsx.readFile(DIR);

    sheet = ((wb.getWorksheet(1)) ? wb.getWorksheet(1) : wb.getWorksheet('Sheet1')) ||
      ((wb.getWorksheet(2)) ? wb.getWorksheet(2) : wb.getWorksheet('Sheet2')) ||
      wb.getWorksheet('DATA');


    let columns = [];
    let index_arr = 0;

    await sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      const data_object = {};
      // if (index_arr === 0 || index_arr === 1) { // 0 judul column parent  , 1 judul column child
      if (index_arr === 0) { // 0 judul column parent  
        columns = row.values;
      } else {
        for (let index_arr2 = 1; index_arr2 < columns.length; index_arr2++) {

          data_object[columns[index_arr2]] = row.values[index_arr2];

        }
        object_push_dynamic.data.push(data_object);
      }
      index_arr++;
      //    console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
    });



    res_json.statusCode = 1;
    res_json.data = object_push_dynamic.data;


    return res_json;


  } catch (error) {
    res_json.statusCode = 0;
    res_json.message = "func readFileXlsx error : " + error.message;
    console.log(res_json.message);
    return res_json;

  }

};