const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "secret-folder");

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  files.forEach((file) => {
    if (file.isFile()) {
      const filePath = path.join(folderPath, file.name);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(err);
          return;
        }

        const fileSizeInKB = stats.size / 1024;
        const fileExtension = path.extname(file.name).substring(1);
        const fileName = path.basename(file.name, `.${fileExtension}`);
        console.log(
          `${fileName} - ${fileExtension} - ${fileSizeInKB.toFixed(3)}kb`
        );
      });
    }
  });
});
