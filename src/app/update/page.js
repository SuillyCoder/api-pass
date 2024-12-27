"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Link from 'next/link';
export default function Update() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [key, setKey] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const id = router.query?.id; // Use optional chaining
  
    if (id) {
      fetch(`/api/data/${id}`) // Modify URL to fetch specific data using ID
        .then(res => res.json())
        .then(fetchedData => {
            console.log("Fetched data:", fetchedData); // Log fetched data
            setData(fetchedData);
          })
        .catch(error => console.error("Error fetching data:", error));
    }
  }, [router.query]); // Re-run effect when query changes

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
      {data && ( 
      <form onSubmit={handleSubmit}> {/* Use a form element */}
        <div>
          <div>
            <h2 className="text-center">NAME</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Enter API Name..."
              defaultValue={data.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-center">LINK</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Insert API Link..."
              defaultValue={data.link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <h2 className="text-center">KEY</h2>
            <input
              className="text-center text-black"
              type="text"
              placeholder="Insert API Key..."
              defaultValue={data.key}
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
