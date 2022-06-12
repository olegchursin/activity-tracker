// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const { id, name, value, timestamp } = req.body;
  try {
    const updateMeal = await prisma.vital.update({
      where: {
        id
      },
      data: { id, name, value, timestamp }
    });
    res.status(200).json(updateMeal);
  } catch (error) {
    res
      .status(403)
      .json({ err: 'Error occurred while updating a vital item.' });
  }
};
