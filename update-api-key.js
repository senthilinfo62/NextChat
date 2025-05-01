const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your OpenAI API key: ', (apiKey) => {
  // Read the current .env file
  const envContent = fs.readFileSync('.env', 'utf8');
  
  // Replace the OPENAI_API_KEY line with the new API key
  const updatedEnvContent = envContent.replace(
    /OPENAI_API_KEY=.*/,
    `OPENAI_API_KEY=${apiKey}`
  );
  
  // Write the updated content back to the .env file
  fs.writeFileSync('.env', updatedEnvContent);
  
  console.log('API key updated successfully!');
  rl.close();
});
