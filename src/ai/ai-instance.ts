import { GoogleGenerativeAI } from '@google/generative-ai';

// Create a new Google Generative AI client
export const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');
