
import { useState } from "react";
import { API } from "../lib/api";

export default function Upload({setRefresh}) {
  const [purchase, setPurchase] = useState(null);
  const [gstr2b, setGstr2b] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!purchase || !gstr2b) {
      alert("Please upload both files");
      return;
    }

    const formData = new FormData();
    formData.append("purchase", purchase);
    formData.append("gstr2b", gstr2b);

    try {
      setLoading(true);
      await API.post("/upload", formData);
      setRefresh(prev => !prev); // Trigger refresh in parent
      alert("Reconciliation completed");
    } catch (err) {
      console.error(err);
      alert("Error uploading files");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100  p-8">
      {/* Header */}
      {/* <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Upload Returns
      </h1>
      <p className="text-gray-500 mb-6">
        Run a fresh reconciliation for the selected return period.
      </p> */}

      {/* Card */}
      <div className="bg-white rounded-2xl shadow p-8">
        <h2 className="text-xl font-semibold mb-2">Upload Returns</h2>
        <p className="text-gray-500 mb-6">
          Attach your purchase register and downloaded GSTR-2B for the period.
        </p>

        {/* Upload Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Purchase Upload */}
          <label className="border-2 border-dashed rounded-xl p-2 text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              className="hidden"
              onChange={(e) => setPurchase(e.target.files[0])}
            />

            <div className="flex flex-col items-center gap-3">
              <div className="bg-gray-200 p-4 rounded-full">
                ⬆️
              </div>

              <h3 className="font-semibold text-lg">
                Purchase Register
              </h3>

              <p className="text-sm text-gray-500">
                Excel / CSV from your accounting software
              </p>

              {purchase && (
                <p className="text-green-600 text-sm mt-2">
                  {purchase.name}
                </p>
              )}
            </div>
          </label>

          {/* GSTR2B Upload */}
          <label className="border-2 border-dashed rounded-xl p-2 text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              className="hidden"
              onChange={(e) => setGstr2b(e.target.files[0])}
            />

            <div className="flex flex-col items-center gap-3">
              <div className="bg-gray-200 p-4 rounded-full">
                ⬆️
              </div>

              <h3 className="font-semibold text-lg">
                GSTR-2B
              </h3>

              <p className="text-sm text-gray-500">
                JSON or Excel downloaded from the GST portal
              </p>

              {gstr2b && (
                <p className="text-green-600 text-sm mt-2">
                  {gstr2b.name}
                </p>
              )}
            </div>
          </label>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            Supported: .xlsx, .xls, .csv, .json — files are processed securely.
          </p>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Run Reconciliation"}
          </button>
        </div>
      </div>
    </div>
  );
}











//-----------------------------------------------

// import { useState } from "react";
// import { API } from "../lib/api";

// export default function Upload() {
//   const [purchase, setPurchase] = useState(null);
//   const [gstr2b, setGstr2b] = useState(null);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("purchase", purchase);
//     formData.append("gstr2b", gstr2b);

//     await API.post("/upload", formData);
//     alert("Upload successful");
//   };

//   return (

//     <div className="bg-white p-5 rounded-2xl shadow">
//       <h2 className="text-xl font-semibold mb-4">Upload Files</h2>

//       <input
//         type="file"
//         className="mb-3 block"
//         onChange={(e) => setPurchase(e.target.files[0])}
//       />

//       <input
//         type="file"
//         className="mb-4 block"
//         onChange={(e) => setGstr2b(e.target.files[0])}
//       />

//       <button
//         onClick={handleUpload}
//         className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
//       >
//         Upload
//       </button>
//     </div>
//   );
// }



//----------------------------------------------

// import { useState } from "react";
// import { API } from "../lib/api";

// export default function Upload() {
//   const [purchase, setPurchase] = useState(null);
//   const [gstr2b, setGstr2b] = useState(null);

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("purchase", purchase);
//     formData.append("gstr2b", gstr2b);

//     const res = await API.post("/upload", formData);
//     alert("Upload done");
//     console.log(res.data);


//     // const res = await API.post("/upload", formData);
//     // alert("Upload done");
//     // console.log(res.data);
//   };



//   return (
//     <div>
//       <h2>Upload Files</h2>
//       <input type="file" onChange={(e) => setPurchase(e.target.files[0])} />
//       <input type="file" onChange={(e) => setGstr2b(e.target.files[0])} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// }