const fs = require("fs");
const path = require("path");

const stylesDir = path.join(__dirname, "styles");
const outputDir = path.join(__dirname, "project-dist");
const outputFile = path.join(outputDir, "bundle.css");

let bundle = "";
fs.readdirSync(stylesDir).forEach((file) => {
  const filePath = path.join(stylesDir, file);
  if (fs.statSync(filePath).isFile() && path.extname(file) === ".css") {
    bundle += fs.readFileSync(filePath, "utf8") + "\n";
  }
});

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
fs.writeFileSync(outputFile, bundle);

console.log("Bundle  successfully created.");
