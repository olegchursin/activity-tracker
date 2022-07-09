// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const { id } = req.body;
  try {
    const deleteActivity = await prisma.activity.delete({
      where: {
        id
      }
    });
    res.status(200).json(deleteActivity);
  } catch (error) {
    res
      .status(403)
      .json({ message: 'Error occured while deleting activity item.', error });
  }
};
