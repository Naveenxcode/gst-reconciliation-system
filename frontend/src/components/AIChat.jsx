import { useState } from "react";
import { API } from "../lib/api";

export default function AIChat() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");

  const ask = async () => {
    const res = await API.post("/ai/ask", { question: q });
    setA(res.data.answer);
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Ask AI</h2>

      <input
        className="border p-2 w-full mb-3 rounded"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Ask something..."
      />

      <button
        onClick={ask}
        className="bg-black text-white px-4 py-2 rounded-xl"
      >
        Ask
      </button>

      <p className="mt-4 text-gray-700">{a}</p>
    </div>
  );
}



















// import { useState } from "react";
// // import { API } from "../api.js";
// import { API } from "../lib/api";

// export default function AIChat() {
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const ask = async () => {
//     const res = await API.post("/ai/ask", { question });
//     setAnswer(res.data.answer);
//   };

//   return (
//     <div>
//       <h2>Ask AI</h2>
//       <input
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />
//       <button onClick={ask}>Ask</button>
//       <p>{answer}</p>
//     </div>
//   );
// }