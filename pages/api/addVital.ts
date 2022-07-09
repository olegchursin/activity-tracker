// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.vital.create({
      data: {
        ...data
      }
    });
    res.status(200).json(result);
  } catch (error) {
    res
      .status(403)
      .json({ message: 'Error occured while adding a new vital.', error });
  }
};
