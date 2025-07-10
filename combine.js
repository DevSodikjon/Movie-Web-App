import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function combineJsonFiles() {
  try {
    const inputDir = path.join(__dirname, "data");
    const outputFile = path.join(inputDir, "combined_data.json");
    const fileNames = [
      "file1.json",
      "file2.json",
      "file3.json",
      "file4.json",
      "file5.json",
    ];

    let combinedResults = [];

    for (const fileName of fileNames) {
      const filePath = path.join(inputDir, fileName);
      try {
        const data = await fs.readFile(filePath, "utf-8");
        const jsonData = JSON.parse(data);
        if (jsonData.results && Array.isArray(jsonData.results)) {
          combinedResults = combinedResults.concat(jsonData.results);
        } else {
          console.warn(`${fileName} "result" array is not exist`);
        }
      } catch (err) {
        console.warn(`${fileName} Error on reading file: ${err.message}`);
      }
    }

    const outputData = { results: combinedResults };
    await fs.writeFile(outputFile, JSON.stringify(outputData, null, 2));
    console.log(`Success: ${outputFile} (${combinedResults.length})`);

    const publicPath = path.join(__dirname, "public/data");
    await fs.mkdir(publicPath, { recursive: true });
    const destFile = path.join(publicPath, "combined_data.json");

    await fs.copyFile(outputFile, destFile);
    console.log(`Nusxa ko‘chirildi: ${destFile}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

combineJsonFiles();
