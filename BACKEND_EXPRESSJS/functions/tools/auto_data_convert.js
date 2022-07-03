// Maintainer : Eki

// READ ME  : 
// function ini digunakan untuk custom_detail , attribute_list , etc
// agar otomatis convert,

// NOT JANGAN RUBAH FUNCTION INI, BERHUBUNGAN DENGAN FORSTOK MARKETPLACE


const error_detail = require('./try_catch_error_detail');


let ConvertArrayKVToObject_example_request = [ // Boolean berbentuk string , Array / Object berbentuk string
  { k: 'id', v: 5253493 },
  { k: 'variant_id', v: 16933324 },
  { k: 'name', v: 'Baju ekitesting update 20220106' },
  { k: 'description', v: 'description ekitesting update 20220106' },
  { k: 'price', v: 250000 },
  { k: 'sale_price', v: null },
  { k: 'sale_start_at', v: null },
  { k: 'sale_end_at', v: null },
  { k: 'package_weight', v: 900 },
  { k: 'package_height', v: 70 },
  { k: 'package_length', v: 70 },
  { k: 'package_width', v: 70 },
  { k: 'created_at', v: '2022-01-06T10:07:05.000+07:00' },
  { k: 'updated_at', v: '2022-01-06T11:49:47.000+07:00' },
  { k: 'removed_at', v: null },
  { k: 'removed', v: '0' },
  { k: 'sku', v: 'sku-baju-ekitesting' },
  { k: 'barcode', v: 'barcode-baju-ekitesting-update-20220106' },
  { k: 'variant_option_type', v: 'size' },
  { k: 'variant_option_value', v: 'size-baju-ekitestin' },
  { k: 'quantity', v: 999 },
  { k: 'cost_price', v: 150000 },
  { k: 'product_type', v: 'default' },
  { k: 'bundle', v: 'false' },
  { k: 'bundle_info', v: '[]' }
];


let ConvertArrayKVToObject_example_reponse = { // IsBoolean to Boolean, IsArray / IsObject auto Parse.JSON
  statusCode: 1,
  message: "Successful Convert Array [{k:'',v:''}] to Object",
  data: {
    id: 5253493,
    variant_id: 16933324,
    name: 'Baju ekitesting update 20220106',
    description: 'description ekitesting update 20220106',
    price: 250000,
    sale_price: null,
    sale_start_at: null,
    sale_end_at: null,
    package_weight: 900,
    package_height: 70,
    package_length: 70,
    package_width: 70,
    created_at: '2022-01-06T10:07:05.000+07:00',
    updated_at: '2022-01-06T11:49:47.000+07:00',
    removed_at: null,
    removed: 0,
    sku: 'sku-baju-ekitesting',
    barcode: 'barcode-baju-ekitesting-update-20220106',
    variant_option_type: 'size',
    variant_option_value: 'size-baju-ekitestin',
    quantity: 999,
    cost_price: 150000,
    product_type: 'default',
    bundle: true,
    bundle_info: []
  }
};

//==================================================== BEDA STRING " != ' VERSI 1 (")

let ConvertArrayKVToObject_data_request = [ // fix string JSON parse from controller
  {
    "k": "address",
    "v": "{'address_1':'Jl. Kosambi selatan raya blok C6/40, cengkareng, jakarta barat., KOTA JAKARTA BARAT, CENGKARENG, DKI JAKARTA, ID, 11750','address_2':'','city':'KOTA JAKARTA BARAT','country':'Indonesia','name':'Reggi','phone':'6289636346697','postal_code':'11750','province':'DKI JAKARTA','province_code':'DKI JAKARTA','sub_district':'','district':'CENGKARENG','coordinate':null}"
  },
  {
    "k": "customer_info",
    "v": "{'id':44908919,'name':'Reggi','email':'','customer_since':'2022-01-07 17:13:26'}"
  }
]

exports.ConvertArrayKVToObject_data = async (data_array_kv) => {
  let res_json = {};
  let Object_From_Array_Kv = {};

  let data_object = {};


  try {
    for (let i_b = 0; i_b < data_array_kv.length; i_b++) {

      let add_new_object = null;
      if (String(Object.values(data_array_kv[i_b])[1]).includes('[') == true ||
        String(Object.values(data_array_kv[i_b])[1]).includes(']') == true ||
        String(Object.values(data_array_kv[i_b])[1]).includes('{') == true ||
        String(Object.values(data_array_kv[i_b])[1]).includes('}') == true) {

        try {
          add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: JSON.parse(JSON.stringify(Object.values(data_array_kv[i_b])[1])) };
        } catch (error) {
          if (Object.values(data_array_kv[i_b])[1] == 'null' || Object.values(data_array_kv[i_b])[1] == null) {
            add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: null };
          } else if (Object.values(data_array_kv[i_b])[1] == 'true' || Object.values(data_array_kv[i_b])[1] == 'false') {
            add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: Boolean(Object.values(data_array_kv[i_b])[1]) };
          } else if (typeof Number(Object.keys(data_array_kv[i_b])[1]) == 'boolean') {
            add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: Boolean(Object.values(data_array_kv[i_b])[1]) };
          } else if (typeof Number(Object.keys(data_array_kv[i_b])[1]) == 'number' &&
            String(Object.values(data_array_kv[i_b])[1]).includes('z') == false &&
            String(Object.values(data_array_kv[i_b])[1]).includes('@') == false &&
            String(Object.values(data_array_kv[i_b])[1]).includes('+') == false &&
            String(Object.values(data_array_kv[i_b])[1]).includes(':') == false &&
            String(Object.values(data_array_kv[i_b])[1]).includes('-') == false &&
            String(Object.values(data_array_kv[i_b])[1]).includes(' ') == false &&
            String(Object.values(data_array_kv[i_b])[1]).includes('.') == false &&
            String(Object.values(data_array_kv[i_b])[1]).includes(',') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('(') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes(')') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('=') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('~') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('#') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('$') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('%') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('^') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('*') == false &&
            // String(Object.values(data_array_kv[i_b])[1]).includes('`') == false &&
            isNaN(Object.values(data_array_kv[i_b])[1]) == false &&
            typeof (Object.keys(data_array_kv[i_b])[1]) != 'boolean'
          ) {
            add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: Number(Object.values(data_array_kv[i_b])[1]) };


          } else {
            add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: `${Object.values(data_array_kv[i_b])[1]}` };
          }
        }

      } else {
        if (Object.values(data_array_kv[i_b])[1] == 'null' || Object.values(data_array_kv[i_b])[1] == null) {
          add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: null };
        } else if (Object.values(data_array_kv[i_b])[1] == 'true' || Object.values(data_array_kv[i_b])[1] == 'false') {
          add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: Boolean(Object.values(data_array_kv[i_b])[1]) };
        } else if (typeof Number(Object.keys(data_array_kv[i_b])[1]) == 'boolean') {
          add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: Boolean(Object.values(data_array_kv[i_b])[1]) };
        } else if (typeof Number(Object.keys(data_array_kv[i_b])[1]) == 'number' &&
          String(Object.values(data_array_kv[i_b])[1]).includes('z') == false &&
          String(Object.values(data_array_kv[i_b])[1]).includes('@') == false &&
          String(Object.values(data_array_kv[i_b])[1]).includes('+') == false &&
          String(Object.values(data_array_kv[i_b])[1]).includes(':') == false &&
          String(Object.values(data_array_kv[i_b])[1]).includes('-') == false &&
          String(Object.values(data_array_kv[i_b])[1]).includes(' ') == false &&
          String(Object.values(data_array_kv[i_b])[1]).includes('.') == false &&
          String(Object.values(data_array_kv[i_b])[1]).includes(',') == false &&
          isNaN(Object.values(data_array_kv[i_b])[1]) == false &&
          // isNaN(123)         // false
          // isNaN('123')       // false
          // isNaN('1e10000')   // false (This translates to Infinity, which is a number)
          // isNaN('foo')       // true
          // isNaN('10px')      // true
          // isNaN('')          // false
          // isNaN(' ')         // false
          // isNaN(false)       // false
          typeof (Object.keys(data_array_kv[i_b])[1]) != 'boolean'
        ) {
          add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: Number(Object.values(data_array_kv[i_b])[1]) };
        } else {
          add_new_object = { [`${Object.values(data_array_kv[i_b])[0]}`]: `${Object.values(data_array_kv[i_b])[1]}` };
        }
      }

      data_object = Object.assign(JSON.parse(JSON.stringify(data_object)), add_new_object);
    }



    res_json.statusCode = 1;
    res_json.message = "Successful Convert Array [{k:'',v:''}] to Object";
    res_json.data = data_object;

    return res_json;



  } catch (error) {
    console.log('function auto_data_convert.ConvertArrayKVToObject, error : ' + error.message);

    res_json.statusCode = 0;
    res_json.message = error.message;

    return res_json;
  }

};
//==================================================== BEDA STRING " != ' VERSI 1 (")

//==================================================== BEDA STRING " != ' VERSI 2 (')

let ConvertArrayKVToObject_database_request = [ // fix string JSON parse from database 
  {
    'k': 'address',
    'v': '{"address_1":"Jl. Kosambi selatan raya blok C6/40, cengkareng, jakarta barat., KOTA JAKARTA BARAT, CENGKARENG, DKI JAKARTA, ID, 11750","address_2":"","city":"KOTA JAKARTA BARAT","country":"Indonesia","name":"Reggi","phone":"6289636346697","postal_code":"11750","province":"DKI JAKARTA","province_code":"DKI JAKARTA","sub_district":"","district":"CENGKARENG","coordinate":null}'
  },
  {
    'k': 'customer_info',
    'v': '{"id":44908919,"name":"Reggi","email":"","customer_since":"2022-01-07 17:13:26"}'
  }
]
exports.ConvertArrayKVToObject = async (data_array_kv) => { // fix string JSON parse from database
  let res_json = {};
  let Object_From_Array_Kv = {};

  let data_object = {};


  try {
    for (let i_b = 0; i_b < data_array_kv.length; i_b++) {

      // console.log(data_array_kv[i_b].k);
      // console.log(String(data_array_kv[i_b].v).includes('{'));
      // console.log({ [`${data_array_kv[i_b].k}`]: JSON.parse(JSON.stringify(data_array_kv[i_b].v)) });

      let add_new_object = null;
      if (String(data_array_kv[i_b].v).includes('[') == true ||
        String(data_array_kv[i_b].v).includes(']') == true ||
        String(data_array_kv[i_b].v).includes('{') == true ||
        String(data_array_kv[i_b].v).includes('}') == true) {

        try {
          add_new_object = { [`${data_array_kv[i_b].k}`]: JSON.parse(JSON.stringify(data_array_kv[i_b].v)) };
        } catch (error) {
          if (data_array_kv[i_b].v == 'null' || data_array_kv[i_b].v == null) {
            add_new_object = { [`${data_array_kv[i_b].k}`]: null };
          } else if (data_array_kv[i_b].v == 'true' || data_array_kv[i_b].v == 'false') {
            add_new_object = { [`${data_array_kv[i_b].k}`]: Boolean(data_array_kv[i_b].v) };
          } else if (typeof Number(Object.keys(data_array_kv[i_b])[1]) == 'boolean') {
            add_new_object = { [`${data_array_kv[i_b].k}`]: Boolean(data_array_kv[i_b].v) };
          } else if (typeof Number(Object.keys(data_array_kv[i_b])[1]) == 'number' &&
            String(data_array_kv[i_b].v).includes('z') == false &&
            String(data_array_kv[i_b].v).includes('@') == false &&
            String(data_array_kv[i_b].v).includes('+') == false &&
            String(data_array_kv[i_b].v).includes(':') == false &&
            String(data_array_kv[i_b].v).includes('-') == false &&
            String(data_array_kv[i_b].v).includes(' ') == false &&
            String(data_array_kv[i_b].v).includes('.') == false &&
            String(data_array_kv[i_b].v).includes(',') == false &&
            // String(data_array_kv[i_b].v).includes('(') == false &&
            // String(data_array_kv[i_b].v).includes(')') == false &&
            // String(data_array_kv[i_b].v).includes('=') == false &&
            // String(data_array_kv[i_b].v).includes('~') == false &&
            // String(data_array_kv[i_b].v).includes('#') == false &&
            // String(data_array_kv[i_b].v).includes('$') == false &&
            // String(data_array_kv[i_b].v).includes('%') == false &&
            // String(data_array_kv[i_b].v).includes('^') == false &&
            // String(data_array_kv[i_b].v).includes('*') == false &&
            // String(data_array_kv[i_b].v).includes('`') == false &&
            isNaN(data_array_kv[i_b].v) == false &&
            typeof (Object.keys(data_array_kv[i_b])[1]) != 'boolean'
          ) {
            add_new_object = { [`${data_array_kv[i_b].k}`]: Number(data_array_kv[i_b].v) };


          } else {
            add_new_object = { [`${data_array_kv[i_b].k}`]: `${data_array_kv[i_b].v}` };
          }
        }

      } else {
        if (data_array_kv[i_b].v == 'null' || data_array_kv[i_b].v == null) {
          add_new_object = { [`${data_array_kv[i_b].k}`]: null };
        } else if (data_array_kv[i_b].v == 'true' || data_array_kv[i_b].v == 'false') {
          add_new_object = { [`${data_array_kv[i_b].k}`]: Boolean(data_array_kv[i_b].v) };
        } else if (typeof Number(Object.keys(data_array_kv[i_b])[1]) == 'boolean') {
          add_new_object = { [`${data_array_kv[i_b].k}`]: Boolean(data_array_kv[i_b].v) };
        } else if (typeof Number(Object.keys(data_array_kv[i_b])[1]) == 'number' &&
          String(data_array_kv[i_b].v).includes('z') == false &&
          String(data_array_kv[i_b].v).includes('@') == false &&
          String(data_array_kv[i_b].v).includes('+') == false &&
          String(data_array_kv[i_b].v).includes(':') == false &&
          String(data_array_kv[i_b].v).includes('-') == false &&
          String(data_array_kv[i_b].v).includes(' ') == false &&
          String(data_array_kv[i_b].v).includes('.') == false &&
          String(data_array_kv[i_b].v).includes(',') == false &&
          isNaN(data_array_kv[i_b].v) == false &&
          // isNaN(123)         // false
          // isNaN('123')       // false
          // isNaN('1e10000')   // false (This translates to Infinity, which is a number)
          // isNaN('foo')       // true
          // isNaN('10px')      // true
          // isNaN('')          // false
          // isNaN(' ')         // false
          // isNaN(false)       // false
          typeof (Object.keys(data_array_kv[i_b])[1]) != 'boolean'
        ) {
          add_new_object = { [`${data_array_kv[i_b].k}`]: Number(data_array_kv[i_b].v) };
        } else {
          add_new_object = { [`${data_array_kv[i_b].k}`]: `${data_array_kv[i_b].v}` };
        }
      }

      data_object = Object.assign(JSON.parse(JSON.stringify(data_object)), add_new_object);
    }



    res_json.statusCode = 1;
    res_json.message = "Successful Convert Array [{k:'',v:''}] to Object";
    res_json.data = data_object;

    return res_json;



  } catch (error) {
    console.log('function auto_data_convert.ConvertArrayKVToObject, error : ' + error.message);

    res_json.statusCode = 0;
    res_json.message = error.message;

    return res_json;
  }

};

//==================================================== /BEDA STRING " != ' VERSI 2 (')



let ConvertObjectToArrayKV_example_request = {
  "id": 5253493,
  "variant_id": 16933324,
  "name": "Baju ekitesting update 20220106",
  "description": "description ekitesting update 20220106",
  "price": 250000,
  "sale_price": null,
  "sale_start_at": null,
  "sale_end_at": null,
  "package_weight": 900,
  "package_height": 70,
  "package_length": 70,
  "package_width": 70,
  "created_at": "2022-01-06T10:07:05.000+07:00",
  "updated_at": "2022-01-06T11:49:47.000+07:00",
  "removed_at": null,
  "removed": "0",
  "sku": "sku-baju-ekitesting",
  "barcode": "barcode-baju-ekitesting-update-20220106",
  "variant_option_type": "size",
  "variant_option_value": "size-baju-ekitestin",
  "quantity": 999,
  "cost_price": 150000,
  "product_type": "default",
  "bundle": false,
  "bundle_info": []
};

let ConvertObjectToArrayKV_example_reponse = { // Boolean to string , Array / Object to string
  statusCode: 1,
  message: "Successful Convert Object to Array [{k:'',v:''}]",
  data: [
    { k: 'id', v: 5253493 },
    { k: 'variant_id', v: 16933324 },
    { k: 'name', v: 'Baju ekitesting update 20220106' },
    { k: 'description', v: 'description ekitesting update 20220106' },
    { k: 'price', v: 250000 },
    { k: 'sale_price', v: null },
    { k: 'sale_start_at', v: null },
    { k: 'sale_end_at', v: null },
    { k: 'package_weight', v: 900 },
    { k: 'package_height', v: 70 },
    { k: 'package_length', v: 70 },
    { k: 'package_width', v: 70 },
    { k: 'created_at', v: '2022-01-06T10:07:05.000+07:00' },
    { k: 'updated_at', v: '2022-01-06T11:49:47.000+07:00' },
    { k: 'removed_at', v: null },
    { k: 'removed', v: '0' },
    { k: 'sku', v: 'sku-baju-ekitesting' },
    { k: 'barcode', v: 'barcode-baju-ekitesting-update-20220106' },
    { k: 'variant_option_type', v: 'size' },
    { k: 'variant_option_value', v: 'size-baju-ekitestin' },
    { k: 'quantity', v: 999 },
    { k: 'cost_price', v: 150000 },
    { k: 'product_type', v: 'default' },
    { k: 'bundle', v: 'false' },
    { k: 'bundle_info', v: '[]' }
  ]
};


// function isObject(val) {
//   // typeof Object.values(data_object)[i_b] == 'object'
//   return (typeof val === 'object');
// }
exports.ConvertObjectToArrayKV = async (data_object) => {
  let res_json = {};
  let ArrayKV = [];

  try {

    for (let i_b = 0; i_b < Object.keys(data_object).length; i_b++) {


      // console.log(Object.keys(data_object)[i_b].constructor)
      if ((Array.isArray(Object.values(data_object)[i_b]) == true) ||
        typeof Object.values(data_object)[i_b] == 'object'
        // || isObject(Object.values(data_object)[i_b])
      ) {

        ArrayKV.push({
          k: Object.keys(data_object)[i_b],
          v: JSON.stringify(Object.values(data_object)[i_b])
        });

      } else {

        if (Object.values(data_object)[i_b] == null) {
          ArrayKV.push({
            k: Object.keys(data_object)[i_b],
            v: null //Object.values(data_object)[i_b]
          });
        } else if (typeof Object.values(data_object)[i_b] == 'number') {
          ArrayKV.push({
            k: Object.keys(data_object)[i_b],
            v: Number(Object.values(data_object)[i_b])
          });
        } else {
          ArrayKV.push({
            k: Object.keys(data_object)[i_b],
            v: String(Object.values(data_object)[i_b])
          });
        }

      }

    }

    res_json.statusCode = 1;
    res_json.message = "Successful Convert Object to Array [{k:'',v:''}]";
    res_json.data = ArrayKV;

    return res_json;


  } catch (error) {
    console.log('function auto_data_convert.ConvertObjectToArrayKV, error : ' + error.message);
    error_detail.try_catch_error_detail(error);

    res_json.statusCode = 0;
    res_json.message = error.message;

    return res_json;
  }

};



let ConvertArrayKVToObjectForceSchema_example_request_array_kv = [
  { k: 'id', v: 5251765 },
  { k: 'variant_id', v: 16931628 },
  { k: 'name', v: 'Kaos Oblong Warna Putih (Paris)' },
  {
    k: 'description',
    v: 'Produk Kaus Oblong Warna Putih yang trendy dan sederhana'
  },
  { k: 'price', v: 125000 },
  { k: 'sale_price', v: null }, { k: 'sale_start_at', v: null },
  { k: 'sale_end_at', v: null },
  { k: 'package_weight', v: 1000 },
  { k: 'package_height', v: 0 },
  { k: 'package_length', v: 0 },
  { k: 'package_width', v: 0 },
  { k: 'created_at', v: '2022-01-05T10:12:27.000+07:00' },
  { k: 'updated_at', v: '2022-01-05T20:06:48.000+07:00' },
  { k: 'removed_at', v: null },
  { k: 'removed', v: '0' },
  { k: 'sku', v: 'B-010101-0001' },
  { k: 'barcode', v: null },
  { k: 'variant_option_type', v: '' },
  { k: 'variant_option_value', v: '' },
  { k: 'quantity', v: 5 },
  { k: 'cost_price', v: 0 },
  { k: 'product_type', v: 'default' },
  { k: 'bundle', v: 'false' },
  { k: 'bundle_info', v: '[]' }
];


let ConvertArrayKVToObjectForceSchema_example_request_object_schema = {
  "id": "number",
  "variant_id": "number",
  "name": "string",
  "description": "string",
  "price": "number",
  "cost_price": "number",
  "product_type": "string",
  "bundle": "default_value",
  "bundle_info": "array",
};

let ConvertArrayKVToObjectForceSchema_example_request_object_schema_real = { // jika ful 
  "id": "number",
  "variant_id": "number",
  "name": "string",
  "description": "string",
  "price": "number",
  "sale_price": "default_value",
  "sale_start_at": "default_value",
  "sale_end_at": "default_value",
  "package_weight": "number",
  "package_height": "number",
  "package_length": "number",
  "package_width": "number",
  "created_at": "date",
  "updated_at": "date",
  "removed_at": "default_value",
  "removed": "string",
  "sku": "string",
  "barcode": "string",
  "variant_option_type": "string",
  "variant_option_value": "string",
  "quantity": "number",
  "cost_price": "number",
  "product_type": "string",
  "bundle": "default_value",
  "bundle_info": "array",
};

// lConvertArrayKVToObjectForceSchema(ConvertArrayKVToObjectForceSchema_example_request_array_kv,ConvertArrayKVToObjectForceSchema_example_request_object_schema )


let ConvertArrayKVToObjectForceSchema_example_response = { // response berdasarkan schema used
  statusCode: 1,
  message: "Successful Convert Array [{k:'',v:''}] to Object used only & Force Schema ",
  data: {
    id: 5251765,
    variant_id: 16931628,
    name: 'Kaos Oblong Warna Putih (Paris)',
    description: 'Produk Kaus Oblong Warna Putih yang trendy dan sederhana',
    price: 125000,
    cost_price: 0,
    product_type: 'default',
    bundle: false,
    bundle_info: []
  }
};

exports.ConvertArrayKVToObjectForceSchema = async (data_array_kv, data_object_used_only_and_force_schema) => {
  let res_json = {};
  let Object_From_Array_Kv = {};

  let data_object = {};

  try {


    let processToObject = await exports.ConvertArrayKVToObject(data_array_kv);


    if (processToObject.statusCode == 0) {

      return processToObject;
    }

    // let processToObject = {}
    // processToObject.data = example_obj

    let result_object_force_schema = {};

    let add_new_object = null;


    for (let i_a = 0; i_a < Object.keys(processToObject.data).length; i_a++) {
      for (let i_b = 0; i_b < Object.keys(data_object_used_only_and_force_schema).length; i_b++) {


        if (Object.keys(data_object_used_only_and_force_schema)[i_b] == Object.keys(processToObject.data)[i_a]) {


          if (Object.values(data_object_used_only_and_force_schema)[i_b] == 'number') {
            add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: Number(Object.values(processToObject.data)[i_a]) };
          } else if (Object.values(data_object_used_only_and_force_schema)[i_b] == 'string') {
            add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: String(Object.values(processToObject.data)[i_a]) };
          } else if (Object.values(data_object_used_only_and_force_schema)[i_b] == 'default_value') {
            add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: Object.values(processToObject.data)[i_a] };
          } else if (Object.values(data_object_used_only_and_force_schema)[i_b] == 'array') {
            try {
              add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: JSON.parse(Object.values(processToObject.data)[i_a]) };
            } catch (error) {
              // console.log("auto_data_convert.ConvertArrayKVToObjectForceSchema 1, try catch auto repair, just info, JSON.parse(JSON.stringify()), error : " + error.message);
              try {
                add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: JSON.parse(JSON.stringify(Object.values(processToObject.data)[i_a])) };
              } catch (error) {
                console.log("auto_data_convert.ConvertArrayKVToObjectForceSchema 2, try catch auto repair, just info , force to [] , error : " + error.message);
                add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: [] };
              }
            }
          } else if (Object.values(data_object_used_only_and_force_schema)[i_b] == 'object') {
            try {
              add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: JSON.parse(Object.values(processToObject.data)[i_a]) };
            } catch (error) {
              // console.log("auto_data_convert.ConvertArrayKVToObjectForceSchema 3, try catch auto repair, just info, JSON.parse(JSON.stringify()), error : " + error.message);
              try {
                add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: JSON.parse(JSON.stringify(Object.values(processToObject.data)[i_a])) };
              } catch (error) {
                console.log("auto_data_convert.ConvertArrayKVToObjectForceSchema 4, try catch auto repair, just info , force to {} , error : " + error.message);
                add_new_object = { [`${Object.keys(data_object_used_only_and_force_schema)[i_b]}`]: {} };
              }
            }

          } //end if 2


          result_object_force_schema = Object.assign(data_object, add_new_object);

        } //end if 1
      } //end for 2
    }//end for 1





    res_json.statusCode = 1;
    res_json.message = "Successful Convert Array [{k:'',v:''}] to Object used only & Force Schema ";
    res_json.data = result_object_force_schema;

    return res_json;



  } catch (error) {
    console.log('function auto_data_convert.ConvertArrayKVToObjectForceSchema, error : ' + error.message);

    res_json.statusCode = 0;
    res_json.message = error.message;

    return res_json;
  }

};













