import { indexTheDocument } from "./prepare.js";

const filePath = process.env.FILE_PATH;

await indexTheDocument(filePath);
