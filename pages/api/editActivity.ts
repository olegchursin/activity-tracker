// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismaClient from '../../utils/prismaClient';

const prisma = prismaClient;

export default async (req, res) => {
  const { id, type, name, duration, reps, distance, timestamp } = req.body;
  try {
    const updateActivity = await prisma.activity.update({
      where: {
        id
      },
      data: { id, type, name, duration, reps, distance, timestamp }
    });
    res.status(200).json(updateActivity);
  } catch (error) {
    res.status(403).json({
      message: 'Error occurred while updating a activity item.',
      error
    });
  }
};
