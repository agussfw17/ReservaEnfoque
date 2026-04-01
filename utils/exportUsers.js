import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersPath = path.join(__dirname, "users.json");
const rawData = fs.readFileSync(usersPath, "utf-8");

export const users = JSON.parse(rawData);

export const YO = users.YO;
export const PABLO_BOLLA = users.PABLO_BOLLA;
export const FARTO = users.FARTO;
export const LODEIRO = users.LODEIRO;
export const DELFI = users.DELFI;
export const ANA = users.ANA;
export const JP = users.JP;
export const FIO = users.FIO;
