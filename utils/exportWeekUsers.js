import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.join(__dirname, "weekUsers.json");
const rawData = fs.readFileSync(usersPath, "utf-8");

export const weekUsers = JSON.parse(rawData);