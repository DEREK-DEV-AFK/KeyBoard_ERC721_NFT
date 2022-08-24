
import './App.css';
import { ethers } from "ethers";
import abi from "./Utils/KeyboardNFT.json";

import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast.loading('Here is your toast.');
// check the toast
const App = () => {
  return (
    <div>
      <button onClick={notify}>Make me a toast</button>  
      <Toaster />
    </div>
  );
};

export default App;