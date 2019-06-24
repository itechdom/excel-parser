const fs = require("fs");
const parse = require("csv-parse");
let data = fs.readFileSync("./data-2.csv");

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
        console.log(record, "record");
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
  .on("end", function() {
    fs.writeFileSync(
      "./medications.js",
      `export const data = ${JSON.stringify(obj)} ;`
    );
  });
