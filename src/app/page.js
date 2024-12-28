"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    alert("API Key successfully copied!");
  }

  async function deleteData(id) {
    try {
      const res = await fetch(`/api/data/${id}`, { // Use template literals for URL
        method: 'DELETE',
      });
  
      if (!res.ok) {
          const errorData = await res.json();
          throw new Error(`HTTP error ${res.status}: ${errorData?.message || res.statusText}`);
      }
  
      // Update the UI after successful deletion (important!)
      setData(data.filter(item => item.id !== id));
      alert("Entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting data:", error);
      // Handle the error, e.g., show an error message to the user
      alert("Error deleting data. Please try again."); // Simple example
    }
  }

  function EditData({ id }) {
    return (
      <Link href={`/update?id=${id}`}> {/* Pass ID as query parameter */}
        <button className = "bg-blue-800 p-2 rounded-md font-redHat font-semibold">Edit</button>
      </Link>
    );
  }
  function AddData() {
    return (
      <div>
        <Link href="/entry"> {/* Navigate to /about */}
          <button className = "bg-blue-800 p-3 rounded-md font-redHat font-semibold">Add New API Key</button>
        </Link>
      </div>
    );
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-6xl font-teko font-semibold">API KEY MANAGER</h1>
      <AddData />
      {/* Render Data Here */}
      {data.map((item) => (
        <div
          className="flex items-center justify-center w-5/6 bg-blue-400 space-x-10 rounded-md p-3"
          key={item.id}
        >
          <div className=" w-6/12 p-4 bg-blue-600 rounded-lg font-redHat font-normal">
            <p>Name: {item.name}</p>
            <p>Link: {item.link}</p>
          </div>
          <div className=" w-4/12 flex space-x-7">
            <button className = "bg-blue-800 p-1 rounded-md text-white font-redHat font-semibold" onClick={() => copyToClipboard(item.key)}>Copy Key</button>
           <EditData id={item.id}/>
            <button className = "bg-blue-800 p-1 rounded-md text-white font-redHat font-semibold" onClick={() => deleteData(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
