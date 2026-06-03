import Upload from "./components/Upload";
import Summary from "./components/Summary";
import Table from "./components/Table";
import AIChat from "./components/AIChat";
import { useState } from "react";

function App() {

    const [refresh, setRefresh] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        GST AI Agent Dashboard
      </h1>

      <div 
      // className="grid md:grid-cols-2 gap-6"
      >
        <Upload setRefresh={setRefresh} />
        {/* <AIChat /> */}
      </div>
      <div className="mt-6">
        <Table refresh={refresh} />
      </div>

      <div className="mt-6">
        <Summary  refresh={refresh} />
      </div>

    </div>
  );
}

export default App;




// import { useState } from 'react'
// import './App.css'

// import Upload from "./components/Upload";
// import Summary from "./components/Summary";
// import Table from "./components/Table";
// import AIChat from "./components/AIChat";

// function App() {
//   return (
//     <div>
//       <h1>GST AI Agent Dashboard</h1>
//       <Upload />
//       <Summary />
//       <Table />
//       <AIChat />
//     </div>
//   );
// }

// export default App;
