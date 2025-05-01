'use server';
/**
 * @fileOverview A function to generate AI-powered responses to user messages using a smart mock service.
 *
 * - generateResponse - A function that generates an AI response to a given message.
 * - GenerateResponseInput - The input type for the generateResponse function.
 * - GenerateResponseOutput - The return type for the generateResponse function.
 */

export interface GenerateResponseInput {
  message: string;
}

export interface GenerateResponseOutput {
  response: string;
}

// Smart responses based on keywords
const keywordResponses: Record<string, string[]> = {
  'hello': [
    'Hello! How can I help you today?',
    'Hi there! What can I assist you with?',
    'Greetings! How may I be of service?'
  ],
  'help': [
    'I\'d be happy to help! What do you need assistance with?',
    'I\'m here to help. Could you provide more details about what you need?',
    'Sure, I can help. What specific information are you looking for?'
  ],
  'weather': [
    'I don\'t have real-time weather data, but I can discuss weather topics in general.',
    'While I can\'t check the current weather, I can talk about climate patterns and weather phenomena.',
    'I don\'t have access to current weather information, but I can discuss meteorology if you\'re interested.'
  ],
  'thanks': [
    'You\'re welcome! Is there anything else I can help with?',
    'Happy to help! Let me know if you need anything else.',
    'My pleasure! Feel free to ask if you have more questions.'
  ],
  'bye': [
    'Goodbye! Have a great day!',
    'Farewell! Feel free to return if you have more questions.',
    'Take care! I\'ll be here if you need assistance in the future.'
  ]
};

// General responses for when no keywords match
const generalResponses = [
  'That\'s an interesting topic. Could you tell me more about what you\'d like to know?',
  'I understand. What specific aspects of this would you like me to address?',
  'Thanks for sharing that. How can I help you with this particular subject?',
  'I see. Could you provide more details so I can give you a more specific response?',
  'That\'s a good question. Let me think about how to best address that.',
  'I appreciate your question. What additional information would be helpful for you?',
  'I\'d be happy to discuss this further. What particular aspects interest you most?',
  'That\'s a fascinating topic. Would you like me to explore any specific angle of it?'
];

/**
 * Generates a smart mock AI response based on the user's message.
 *
 * @param input The user message to respond to
 * @returns A promise that resolves to the AI-generated response
 */
export async function generateResponse(input: GenerateResponseInput): Promise<GenerateResponseOutput> {
  try {
    const message = input.message.toLowerCase();

    // Check for keyword matches
    let possibleResponses = generalResponses;

    // Look for keywords in the message
    for (const [keyword, responses] of Object.entries(keywordResponses)) {
      if (message.includes(keyword)) {
        possibleResponses = responses;
        break;
      }
    }

    // Select a random response from the appropriate category
    const randomIndex = Math.floor(Math.random() * possibleResponses.length);
    const responseText = possibleResponses[randomIndex];

    // Simulate network delay for a more realistic experience
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      response: responseText
    };
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}
