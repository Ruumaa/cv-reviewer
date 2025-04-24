import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());

app.post(
  '/upload',
  upload.single('file'),
  async (req: Request, res: Response): Promise<any> => {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded.' });

    const ext = path.extname(file.originalname).toLowerCase();
    let textContent = '';

    try {
      if (ext === '.pdf') {
        const dataBuffer = fs.readFileSync(file.path);
        const pdfData = await pdfParse(dataBuffer);
        textContent = pdfData.text;
      } else if (ext === '.docx') {
        const data = await mammoth.extractRawText({ path: file.path });
        textContent = data.value;
      } else {
        return res.status(400).json({ error: 'Unsupported file format.' });
      }

      fs.unlinkSync(file.path);

      const prompt = `Tolong review CV berikan nilai 1-100% untuk profil, summary, pengalaman kerja, pendidikan, keahlian, dan portofolio \n\n berikan juga alasan singkat namun jelas pada masing masing point tersebut dan berikan juga bagian mana yang dapat diperbaiki atau jika sudah terlihat baik beritahu saja kalau tidak perlu ada perubahan \n\n berikut adalah isi CV nya:\n\n${textContent}`;

      console.log(textContent, '<<<<<<<<<<<');

      async function generateReview() {
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: [{ parts: [{ text: prompt }] }],
        });
        return response.text;
      }

      const result = await generateReview();

      res.json({ review: result });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Gagal memproses file.' });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
