const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyCUrXgUEHNcyHDn2howVrEPAhYsOu-K8Mk";
const genAI = new GoogleGenerativeAI(apiKey);

async function testModel(modelName) {
  try {
    console.log(`\nTesting ${modelName}...`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello");
    console.log(`✓ ${modelName} works!`);
    return true;
  } catch (error) {
    console.log(`✗ ${modelName} failed:`, error.message.split('\n')[0]);
    return false;
  }
}

async function test() {
  await testModel("gemini-1.5-flash");
  await testModel("gemini-1.5-pro");
  await testModel("gemini-pro");
  await testModel("gemini-pro-vision");
}

test();
