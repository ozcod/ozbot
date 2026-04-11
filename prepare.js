import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
export async function indexDocument(pdfpath) {
  const loader = new PDFLoader(pdfpath, { splitPages: false });
  const doc = await loader.load();
  console.log(doc[0].pageContent);
}
