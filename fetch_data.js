// const fetch = require("node-fetch");
// const fs = require("fs").promises;
// const { log } = require("console");
// const path = require("path");
import fetch from "node-fetch";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_KEY = "56d32f864bead3d13423fd3cc3e14437";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchData() {
  try {
    const totalPage = 5;
    const outputDir = path.join(__dirname, "./data");
    // const __dirname = dirname(__filename);
    await fs.mkdir(outputDir, { recursive: true });

    for (let page = 1; page <= totalPage; page++) {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      );

      if (!response.ok) {
        throw new Error(
          `HTTP is invalid: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(data);

      const outputFile = path.join(outputDir, `file${page}.json`);
      await fs.writeFile(outputFile, JSON.stringify(data, null, 2));

      console.log(`Fayl is saved: ${outputFile}`);
    }

    console.log("All files is successfully finished");
  } catch (error) {
    console.error("Error:", error.messsage);
  }
}

fetchData();
