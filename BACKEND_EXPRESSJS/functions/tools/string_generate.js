
// Maintainer : Eki

// READ ME  : 
// function ini digunakan untuk autogenerate (tanpa memberatkan database) & generate title case

// EXAMPLE 
// const string_generate = require('./tools/string_generate');
// let setName = `AT-${string_generate.toTitlesCaseV2Join("EKI INDRADI")}-`;
// let uniqueGenerate = string_generate.uniqueValue(setName);
exports.toTitlesCaseV2Join = (s) => {
  let string_data = String(s).split('-').join(' ');
  string_data = String(string_data).split('_').join(' ');
  string_data = this.toTitlesCaseV2(string_data);
  string_data = String(string_data).split(' ').join('');
  return string_data;
};

exports.toTitlesCaseV2 = (s) => {
  return s.replace(/\w\S*/g,
    function (t) {
      return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase();
    });
};


exports.uniqueValue = (s) => {
  let autogen = s +
    + new Date().getFullYear() //+ "-"
    + ("0" + (new Date().getMonth() + 1)).slice(-2) //+ "-"
    + ("0" + new Date().getDate()).slice(-2) + "-"
    + Date.now();

  return autogen;

};
