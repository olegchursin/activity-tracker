// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismaClient from '../../utils/prismaClient';

const prisma = prismaClient;

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
      .json({ message: 'Error occurred while updating vital.', error });
  }
};
