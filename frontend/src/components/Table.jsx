import { useEffect, useState } from "react";
import { API } from "../api";

export default function Table() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    API.get("/reconciliation").then((res) => setRows(res.data));
  }, []);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>GSTIN</th>
          <th>Invoice</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td>{r.gstin}</td>
            <td>{r.invoice_no}</td>
            <td>{r.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}