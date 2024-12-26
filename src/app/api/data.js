import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* export default async function reqHandler(req, res) {
  if (req.method === "GET") {
    try {
      const apiData = await prisma.apiTable.findMany();
      res.status(200).json(apiData); // Use res.json() to send JSON
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Failed to fetch data" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Invalid Method" });
  }
} */

// pages/api/data.js
export default function handler(req, res) {
    res.status(200).send('API route is working!');
  }