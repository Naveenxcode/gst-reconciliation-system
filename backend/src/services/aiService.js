const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.askAI = async (question, data) => {
  const prompt = `
You are a GST assistant helping a CA firm.

Here is the reconciliation data:
${JSON.stringify(data)}

User question:
${question}

Answer clearly with reasoning.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
};