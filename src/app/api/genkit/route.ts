// Implemented API route to handle Genkit flow requests.
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {defineFlow, startFlowsServer} from '@genkit-ai/next';

import '@/ai/flows/generate-response';
import '@/ai/flows/summarize-chat-history';

genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const POST = startFlowsServer();
