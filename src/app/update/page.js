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
      router.push("/"); // Redirect to the homepage or wherever appropriate
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data. Please try again.");
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
      {data && ( 
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
            <button type="submit">UPDATE</button> {/* Submit button */}
            <Cancel />
          </div>
        </div>
      </form>
    )}
    </div>
  );
}
