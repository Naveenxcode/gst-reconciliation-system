import { useEffect, useState } from "react";
import { API } from "../lib/api";

export default function Table({refresh}) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    API.get("/reconciliation").then((res) => setRows(res.data));
  }, [refresh]);

  const getColor = (status) => {
    if (status === "MATCHED") return "text-green-600";
    if (status === "MISSING_IN_2B") return "text-red-600";
    if (status === "MISSING_IN_BOOKS") return "text-yellow-600";
    return "text-purple-600";
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow overflow-auto">
      <h2 className="text-xl font-semibold mb-4">Reconciliation Data</h2>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">GSTIN</th>
            <th className="p-2">Invoice</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{r.gstin}</td>
              <td className="p-2">{r.invoice_no}</td>
              <td className={`p-2 font-semibold ${getColor(r.status)}`}>
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




// import { useEffect, useState } from "react";
// // import { API } from "../api.js";
// import { API } from "../lib/api";

// export default function Table() {
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     API.get("/reconciliation").then((res) => setRows(res.data));
//   }, []);

//   return (
//     <table border="1">
//       <thead>
//         <tr>
//           <th>GSTIN</th>
//           <th>Invoice</th>
//           <th>Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((r) => (
//           <tr key={r.id}>
//             <td>{r.gstin}</td>
//             <td>{r.invoice_no}</td>
//             <td>{r.status}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }