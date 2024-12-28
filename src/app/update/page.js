"use client";
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';
export default function Update() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [name, setName] = useState(''); // Initialize with an empty string
  const [link, setLink] = useState(''); // Initialize with an empty string
  const [key, setKey] = useState(''); 
  const [data] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("No ID provided in the query parameter.");
      setLoading(false);
      return;
    }

    // Fetch specific data by ID
    fetch(`/api/data/${id}`)
      .then((res) => res.json())
      .then((fetchedData) => {
        setName(fetchedData.name);
        console.log("Name: ", fetchedData.name);
        setLink(fetchedData.link);
        console.log("Link: ", fetchedData.link);
        setKey(fetchedData.key);
        console.log("Key: ", fetchedData.key);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    if (!name || !link || !key) {
      alert("All fields (Name, Link, Key) are required.");
      return; // Stop execution if any field is empty
    }
  
    try {
      // Make sure to include the `id` in the API endpoint
      const res = await fetch(`/api/data/${id}`, { // Use the specific endpoint with the id
        method: 'PUT', // Change method to PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, link, key }), // Include the updated data
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`HTTP error ${res.status}: ${errorData?.message || res.statusText}`);
      }
  
      // Handle successful update
      alert("Data updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data. Please try again.");
    }
  };
  
  function Cancel() {
    return (
        <Link href="../"> {/* Navigate to /about */}
          <button className = "bg-blue-800 p-1 rounded-md text-white font-redHat font-semibold" >CANCEL</button>
        </Link>
    );
  }


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-6xl font-teko font-semibold">API KEY MANAGER</h1>
      {data && ( 
      <form onSubmit={handleSubmit}> {/* Use a form element */}
        <div>
          <div>
            <h2 className="text-center text-lg font-redHat font-semibold">NAME</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Enter API Name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className = "mt-3">
            <h2 className="text-center text-lg font-redHat font-semibold">LINK</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Insert API Link..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className = "mt-3">
            <h2 className="text-center text-lg font-redHat font-semibold">KEY</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Insert API Key..."
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-7 space-x-2">
            <button className = "bg-blue-800 p-1 rounded-md text-white font-redHat font-semibold" type="submit">UPDATE</button> {/* Submit button */}
            <Cancel />
          </div>
        </div>
      </form>
    )}
    </div>
  );
}
