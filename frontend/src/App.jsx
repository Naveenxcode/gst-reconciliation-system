import { useState } from 'react'
import './App.css'

import Upload from "./components/Upload";
import Summary from "./components/Summary";
import Table from "./components/Table";
import AIChat from "./components/AIChat";

function App() {
  return (
    <div>
      <h1>GST AI Agent Dashboard</h1>
      <Upload />
      <Summary />
      <Table />
      <AIChat />
    </div>
  );
}

export default App;
