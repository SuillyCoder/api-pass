import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const apiData = await prisma.apiTable.findMany();
      res.status(200).json(apiData);
    } catch (error) {
      console.error("Error fetching all data:", error);
      res.status(500).json({ message: "Failed to fetch all data" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}