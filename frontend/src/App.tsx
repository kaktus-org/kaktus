import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";

function App() {
  const [msg, setMsg] = useState("");

  const getMsg = async () => {
    try {
      const response = await api.get("/");

      console.log(response.data);

      setMsg(response.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMsg();
  }, []);

  return <div className="text-3xl font-bold underline">Home {msg}</div>;
}

export default App;
