"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Update() {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [key, setKey] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!name || !link || !key) {
      alert("All fields (Name, Link, Key) are required.");
      return; // Stop execution if any field is empty
    }

    try {
      const res = await fetch('/api/data/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, link, key }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`HTTP error ${res.status}: ${errorData?.message || res.statusText}`);
      }

      // Handle successful data addition (e.g., redirect, show a success message)
      alert("Data added successfully!");
      //Clear the input fields
      setName("");
      setLink("");
      setKey("");
    } catch (error) {
      console.error("Error adding data:", error);
      alert("Error adding data. Please try again.");
    }
  };
  function Cancel() {
    return (
        <Link href="../"> {/* Navigate to /about */}
          <button>CANCEL</button>
        </Link>
    );
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl">API KEY MANAGER 2</h1>
      <form onSubmit={handleSubmit}> {/* Use a form element */}
        <div>
          <div>
            <h2 className="text-center">NAME</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Enter API Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-center">LINK</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Insert API Link..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-center">KEY</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Insert API Key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">CONFIRM</button> {/* Submit button */}
            <Cancel />
          </div>
        </div>
      </form>
    </div>
  );
}