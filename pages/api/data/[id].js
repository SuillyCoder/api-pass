import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function reqHandler(req, res) {
  const { id } = req.query;
  //READ OPERATION
  if (req.method === "GET") {
      try {
        const { id } = req.query;
        const apiData = await prisma.apiTable.findUnique({
          where: { id: parseInt(id) },
        });

        if (!apiData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Failed to fetch data" });
      } finally {
        await prisma.$disconnect();
      }
  } 
  //DELETE OPERATION
  else if (req.method === 'DELETE'){
    try {
      const apiData = await prisma.apiTable.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json(apiData);
    } catch (error) {
      console.error("Error creating data:", error);
      res.status(500).json({ message: "Failed to create data" });
    }finally {
      await prisma.$disconnect();
    }
  }
  else if (req.method === 'PUT') {
    try {
      const { name, link, key } = req.body;
      const apiData = await prisma.apiTable.update({
        where: { id: parseInt(id) },
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
  //ANYTHING ELSE
  else {
    res.status(405).json({ message: "Invalid Method" });
  }
} 
