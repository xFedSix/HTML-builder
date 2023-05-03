const readline = require("readline");
const fs = require("fs");

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = "./02-write-file/notes.txt";

fs.writeFile(filePath, "", (err) => {
  if (err) throw err;
  console.log("File created!");
  promptInput();
});

function promptInput() {
  readLine.question("Enter your text: ", (input) => {
    if (input === "exit") {
      console.log("Goodbye!");
      readLine.close();
      return;
    }

    fs.appendFile(filePath, input + "\n", (err) => {
      if (err) throw err;
      console.log("Your text successfully added!");
      promptInput();
    });
  });
}
