import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function reqHandler(req, res) {
  //READ OPERATION
  if (req.method === "GET") {
    try {
      const apiData = await prisma.apiTable.findMany();
      res.status(200).json(apiData); 
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Failed to fetch data" });
    } finally {
      await prisma.$disconnect();
    }
  } 
  //CREATE OPERATION
  else if (req.method === 'POST') {
    try {
      const { name, link, key } = req.body;
      const apiData = await prisma.apiTable.create({
        data: {
          name,
          link,
          key,
        },
      });
      res.status(200).json(apiData);
    } catch (error) {
      console.error("Error creating data:", error);
      res.status(500).json({ message: "Failed to create data" });
    }
  }
  //UPDATE OPERATION
  else if (req.method === 'PUT'){
    try {
      const { id, name, link, key } = req.body;
      const apiData = await prisma.apiTable.update({
        where: { id },
        data: {
          name,
          link,
          key,
        },
      });
      res.status(200).json(apiData);
    } catch (error) {
      console.error("Error creating data:", error);
      res.status(500).json({ message: "Failed to create data" });
    }
  }
  //DELETE OPERATION
  else if (req.method === 'DELETE'){
    try {
      const { id } = req.body;
      const apiData = await prisma.apiTable.delete({
        where: { id },
      });
      res.status(200).json(apiData);
    } catch (error) {
      console.error("Error creating data:", error);
      res.status(500).json({ message: "Failed to create data" });
    }
  }
  //ANYTHING ELSE
  else {
    res.status(405).json({ message: "Invalid Method" });
  }
} 
