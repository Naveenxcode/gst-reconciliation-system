import { useEffect, useState } from "react";
import { API } from "../api";

export default function Summary() {
  const [data, setData] = useState({});

  useEffect(() => {
    API.get("/summary").then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h2>Summary</h2>
      <p>Total: {data.total}</p>
      <p>Matched: {data.matched}</p>
      <p>Missing in 2B: {data.missing_in_2b}</p>
      <p>Missing in Books: {data.missing_in_books}</p>
    </div>
  );
}