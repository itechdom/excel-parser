const fs = require("fs");
const parse = require("csv-parse");
let data = fs.readFileSync("./data.csv");
const assert = require("assert");

const output = [];
let row = 0;
let obj = {};
parse(data, {
  trim: true,
  skip_empty_lines: true
})
  // Use the readable stream api
  .on("readable", function() {
    let record;
    while ((record = this.read())) {
      //first row
      if (row === 0) {
        record.map((r, i) => (obj[r] = []));
      }
      if (row > 0) {
        record.map((col, index) => {
          let column = Object.keys(obj)[index];
          obj[column].push(col);
        });
      }
      row++;
      output.push(record);
    }
  })
  // When we are done, test that the parsed output matched what expected
  .on("end", function() {
    fs.writeFileSync("./output", JSON.stringify(obj));
  });
