import React from "react";
import { use } from "react";
import { useEffect, useState } from "react";
const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading
        ? "Loading..."
        : data.map((item) => <p key={item.id}>{item.title}</p>)}
    </div>
  );
};

export default DataFetcher;
