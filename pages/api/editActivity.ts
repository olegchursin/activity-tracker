// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req, res) => {
  const { id, name, description } = req.body;
  try {
    const updateActivity = await prisma.activity.update({
      where: {
        id: parseInt(id, 10)
      },
      data: {
        name,
        description
      }
    });
    res.status(200).json(updateActivity);
  } catch (error) {
    res
      .status(403)
      .json({ err: 'Error occurred while updating a activity item.' });
  }
};
