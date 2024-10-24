function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
    .setTitle('Quiz II - SA_สมทบ Aj.Kwan')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setFaviconUrl('https://cdn-icons-png.flaticon.com/512/2972/2972160.png');
}

function processForm(formObject) {  
  Logger.log(formObject);
  var result = "";
  if (formObject && formObject.searchtext) {
    result = search(formObject.searchtext);
  }
  return result;
}

function search(searchtext) {
  var spreadsheetId = '1ZBNXlrx4_ghQpv0N1i2q1-h_Gg3zP7QCxILsE_DaHkA';
  var dataRange = 'Data!A2:D';
  var data = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRange).values;
  var ar = [];

  data.forEach(function(row) {
    // Search in column D (index 3), but return columns A, B, C (indexes 0, 1, 2)
    if (row[3] && row[3].includes(searchtext)) {  // Check if column D contains the searchtext
      ar.push([row[0], row[1], row[2]]);  // Push only columns A, B, C
    }
  });
  return ar;
}
