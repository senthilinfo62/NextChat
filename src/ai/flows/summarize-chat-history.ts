/**
 * @fileOverview Summarizes a chat history to provide a quick recap of the session.
 *
 * - summarizeChatHistory - A function that handles the summarization process.
 * - SummarizeChatHistoryInput - The input type for the summarizeChatHistory function.
 * - SummarizeChatHistoryOutput - The return type for the summarizeChatHistory function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeChatHistoryInputSchema = z.object({
  chatHistory: z
    .string()
    .describe('The complete chat history to be summarized. Each turn should indicate who spoke.'),
});
export type SummarizeChatHistoryInput = z.infer<typeof SummarizeChatHistoryInputSchema>;

const SummarizeChatHistoryOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the key topics discussed in the chat history.'),
});
export type SummarizeChatHistoryOutput = z.infer<typeof SummarizeChatHistoryOutputSchema>;

export async function summarizeChatHistory(
  input: SummarizeChatHistoryInput
): Promise<SummarizeChatHistoryOutput> {
  return summarizeChatHistoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChatHistoryPrompt',
  input: {
    schema: z.object({
      chatHistory: z
        .string()
        .describe('The complete chat history to be summarized. Each turn should indicate who spoke.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the key topics discussed in the chat history.'),
    }),
  },
  prompt: `You are an AI assistant tasked with summarizing long chat histories.

  Please provide a concise summary of the following chat history, highlighting the key topics discussed.  Be brief, capturing the essence of the conversation without unnecessary detail.

  Chat History:
  {{chatHistory}}`,
});

const summarizeChatHistoryFlow = ai.defineFlow<
  typeof SummarizeChatHistoryInputSchema,
  typeof SummarizeChatHistoryOutputSchema
>({
  name: 'summarizeChatHistoryFlow',
  inputSchema: SummarizeChatHistoryInputSchema,
  outputSchema: SummarizeChatHistoryOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
