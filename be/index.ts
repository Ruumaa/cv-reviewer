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

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: 'API is healthy',
  });
});

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

      const prompt = `
      Anda adalah reviewer CV profesional.
      
      Berikan penilaian angka (1-100) untuk setiap bagian berikut menggunakan bahasa yang santai dan sopan:
      - Profil
      - Summary
      - Pengalaman Kerja
      - Pendidikan
      - Keahlian
      - Portofolio
      
      Untuk setiap bagian, berikan:
      - Feedback singkat (tidak lebih dari 3-5 kalimat) berisi kelebihan dan kekurangan.
      - Beritahu kekurangannya (termasuk grammar atau susunan kata) dan beritahu juga yang harus diperbaiki dari kekurangan itu.
      
      **Format output harus JSON valid** seperti contoh berikut:
      {
        "profil": { "nilai": 80, "feedback": "...", "kelebihan": "...", kekurangan: "...", perbaikan : ["..."] },
        "summary": { ... },
        "pengalaman_kerja": { ... },
        "pendidikan": { ... },
        "keahlian": { ... },
        "portofolio": { ... },
        "nilai_total": 82,
        "kesimpulan": "..."
      }
      
      Berikut isi CV yang harus direview:
      """ 
      ${textContent}
      """
      `;

      async function generateReview() {
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: [{ parts: [{ text: prompt }] }],
        });
        return response;
      }

      const result = await generateReview();

      res.json({ review: result.text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Gagal memproses file.' });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
