import { useEffect, useState } from "react";
import { API } from "../lib/api";

export default function Summary({ refresh }) {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/summary").then((res) => setData(res.data));
  }, [refresh]);

  const Card = ({ title, value, color }) => (
    <div className={`p-4 rounded-xl text-white ${color}`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );


  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Card title="Total" value={data.total} color="bg-gray-600" />
      <Card title="Matched" value={data.matched} color="bg-green-500" />
      <Card title="Missing 2B" value={data.missing_in_2b} color="bg-red-500" />
      <Card title="Missing Books" value={data.missing_in_books} color="bg-yellow-500" />
      <Card title="Mismatch" value={data.mismatch_amount} color="bg-purple-500" />
    </div>
  );
}




// import { useEffect, useState } from "react";
// // import { API } from "../api.js";
// import { API } from "../lib/api";

// export default function Summary() {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     API.get("/summary").then((res) => setData(res.data));
//   }, []);

//   return (
//     <div>
//       <h2>Summary</h2>
//       <p>Total: {data.total}</p>
//       <p>Matched: {data.matched}</p>
//       <p>Missing in 2B: {data.missing_in_2b}</p>
//       <p>Missing in Books: {data.missing_in_books}</p>
//     </div>
//   );
// }