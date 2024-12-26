import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function reqHandler(req, res) {
  if (req.method === "GET") {
    try {
      const apiData = await prisma.apiTable.findMany();
      //res.status(200).json(apiData); // Use res.json() to send JSON
      return res.send(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Failed to fetch data" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Invalid Method" });
  }
} 
