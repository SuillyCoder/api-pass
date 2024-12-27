"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data/all'); // Fetch from your API route
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const apiData = await res.json();
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  function deleteData(id) {
    // Implement delete logic here
  }

  function editData(id) {
    // Implement edit logic here
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">API KEY MANAGER</h1>
      <button>Add New API Key</button>
      {/* Render Data Here */}
      {data.map((item) => (
        <div
          className="flex items-center justify-center border-yellow-500 w-5/6 border-solid border-2"
          key={item.id}
        >
          <div className="border-red-500 border-solid border-2 w-6/12">
            <p>Name: {item.name}</p>
            <p>Link: {item.link}</p>
          </div>
          <div className="border-blue-500 border-solid border-2 w-4/12 flex space-x-7">
            <button onClick={() => copyToClipboard(item.key)}>Copy Key</button>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
