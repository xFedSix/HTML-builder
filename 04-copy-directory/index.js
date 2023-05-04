const fs = require("fs");
const path = require("path");

async function copyDir(srcDir, destDir) {
  let mainDir = path.join(__dirname, "/files");
  let dirForCopy = path.join(__dirname, "files-copy");
  srcDir = mainDir;
  destDir = dirForCopy;
  try {
    await fs.promises.mkdir(destDir, { recursive: true });
    const files = await fs.promises.readdir(srcDir);
    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      const stat = await fs.promises.lstat(srcPath);
      const isFile = stat.isFile();

      if (isFile) {
        await fs.promises.copyFile(srcPath, destPath);
      } else {
        await copyDir(srcPath, destPath);
      }
    }

    const watcher = fs.watch(srcDir, { recursive: true });

    watcher.on("change", async (eventType, fileName) => {
      const srcPath = path.join(srcDir, fileName);
      const destPath = path.join(destDir, fileName);

      try {
        const stat = await fs.promises.lstat(srcPath);
        const isFile = stat.isFile();

        if (isFile) {
          await fs.promises.copyFile(srcPath, destPath);
          console.log(`Copied file ${fileName} to ${destDir}`);
        }
      } catch (err) {
        console.error(`Error copying file: ${err}`);
      }
    });

    watcher.on("add", async (fileName) => {
      const srcPath = path.join(srcDir, fileName);
      const destPath = path.join(destDir, fileName);

      try {
        const stat = await fs.promises.lstat(srcPath);
        const isFile = stat.isFile();

        if (isFile) {
          await fs.promises.copyFile(srcPath, destPath);
          console.log(`Copied file ${fileName} to ${destDir}`);
        }
      } catch (err) {
        console.error(`Error copying file: ${err}`);
      }
    });

    watcher.on("unlink", async (fileName) => {
      const destPath = path.join(destDir, fileName);

      try {
        await fs.promises.unlink(destPath);
        console.log(`Deleted file ${fileName} from ${destDir}`);
      } catch (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });
  } catch (err) {
    console.error(`Error copying directory: ${err}`);
  }
}

copyDir("files", "files-copy");
