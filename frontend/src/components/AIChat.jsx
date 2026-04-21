import { useState } from "react";
import { API } from "../api";

export default function AIChat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const ask = async () => {
    const res = await API.post("/ai/ask", { question });
    setAnswer(res.data.answer);
  };

  return (
    <div>
      <h2>Ask AI</h2>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={ask}>Ask</button>
      <p>{answer}</p>
    </div>
  );
}