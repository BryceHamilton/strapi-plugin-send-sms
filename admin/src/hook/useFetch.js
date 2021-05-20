const REACT_APP_API_URL = "http://localhost:1337";
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setStatus("loading");
      try {
        const response = await fetch(`${REACT_APP_API_URL}${url}`);
        const data = await response.json();
        setData(data);
      } catch (e) {
        setError(e);
      }
      setStatus("idle");
    };

    fetchData();
  }, [url]);

  return { status, data, error };
};
