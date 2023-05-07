const fs = require("fs");
const path = require("path");

const stylesDir = path.join(__dirname, "styles");
const outputDir = path.join(__dirname, "project-dist");
const outputFile = path.join(outputDir, "bundle.css");

let bundle = "";
fs.readdir(stylesDir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  let count = 0;
  files.forEach((file) => {
    const filePath = path.join(stylesDir, file);
    fs.stat(filePath, (err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      if (stats.isFile() && path.extname(file) === ".css") {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          bundle += data + "\n";
          count++;
          if (count === files.length) {
            fs.mkdir(outputDir, { recursive: true }, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              fs.writeFile(outputFile, bundle, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(`Bundle created successfully.`);
              });
            });
          }
        });
      } else {
        count++;
        if (count === files.length) {
          fs.mkdir(outputDir, { recursive: true }, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            fs.writeFile(outputFile, bundle, (err) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(`Bundle  successfully created.`);
            });
          });
        }
      }
    });
  });
});
