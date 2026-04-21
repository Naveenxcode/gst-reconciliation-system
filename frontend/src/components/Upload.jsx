import { useState } from "react";
import { API } from "../api";

export default function Upload() {
  const [purchase, setPurchase] = useState(null);
  const [gstr2b, setGstr2b] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("purchase", purchase);
    formData.append("gstr2b", gstr2b);

    const res = await API.post("/upload", formData);
    alert("Upload done");
    console.log(res.data);
  };

  return (
    <div>
      <h2>Upload Files</h2>
      <input type="file" onChange={(e) => setPurchase(e.target.files[0])} />
      <input type="file" onChange={(e) => setGstr2b(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}