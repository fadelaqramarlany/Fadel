import { GoogleGenAI, Type } from "@google/genai";
import { Question, EducationLevel } from "../types";

// Helper to get API Key safely
const getApiKey = (): string | undefined => {
  return process.env.API_KEY;
};

export const generateQuizQuestions = async (
  level: EducationLevel,
  subject: string,
  count: number = 5
): Promise<Question[]> => {
  const apiKey = getApiKey();
  
  // Mock data fallback if API key is missing (for demo purposes)
  if (!apiKey) {
    console.warn("API_KEY not found. Using mock data.");
    return [
      {
        id: 1,
        text: `(MOCK) Apa ibu kota Indonesia? (Level: ${level}, Mapel: ${subject})`,
        options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
        correctAnswer: 0,
        explanation: "Jakarta adalah ibu kota negara Indonesia saat ini."
      },
      {
        id: 2,
        text: `(MOCK) Berapakah hasil 10 + 10? (Level: ${level}, Mapel: ${subject})`,
        options: ["10", "20", "30", "40"],
        correctAnswer: 1,
        explanation: "10 ditambah 10 sama dengan 20."
      },
      {
        id: 3,
        text: `(MOCK) Salah satu sila Pancasila? (Level: ${level}, Mapel: ${subject})`,
        options: ["Makan siang gratis", "Ketuhanan Yang Maha Esa", "Tidur siang", "Main game"],
        correctAnswer: 1,
        explanation: "Sila pertama adalah Ketuhanan Yang Maha Esa."
      }
    ];
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    Buatkan ${count} soal pilihan ganda untuk mata pelajaran ${subject} tingkat ${level} sekolah di Indonesia.
    Format JSON harus valid. Setiap soal harus memiliki 'text' (pertanyaan), 'options' (array 4 jawaban string), 'correctAnswer' (index integer 0-3 yang benar), dan 'explanation' (penjelasan singkat bahasa Indonesia).
    Pastikan soal relevan dengan kurikulum nasional Indonesia.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.INTEGER },
              text: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.INTEGER },
              explanation: { type: Type.STRING }
            },
            required: ["text", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No text response from Gemini");

    const parsedData = JSON.parse(jsonText);
    
    // Ensure IDs are unique numbers
    return parsedData.map((q: any, idx: number) => ({
      ...q,
      id: idx + 1
    }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Return mock fallback on error to keep app usable
     return [
      {
        id: 1,
        text: `Maaf, gagal memuat soal AI. Coba lagi nanti. (Error: ${subject})`,
        options: ["Opsi A", "Opsi B", "Opsi C", "Opsi D"],
        correctAnswer: 0,
        explanation: "Terjadi kesalahan koneksi."
      }
    ];
  }
};
