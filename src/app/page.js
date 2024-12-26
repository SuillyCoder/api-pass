"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data'); // Fetch from your API route
        if (!res.ok) {
          throw Error(`HTTP error! status: ${res.status}`);
        }
        const apiData = await res.json();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., display an error message to the user
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">Hello World</h1>
      <h2>This is some repo-pushing test text</h2>
        {/*Render Data Here*/}
        {data.map((item) => (
            <div key={item.id}>
                <p>Name: {item.name}</p>
                <p>Link: {item.link}</p>
                <p>Key: {item.key}</p>
            </div>
        ))}
    </div>
  );
}