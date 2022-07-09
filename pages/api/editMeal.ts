// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismaClient from '../../utils/prismaClient';

const prisma = prismaClient;

export default async (req, res) => {
  const { id, name, description, timestamp } = req.body;
  try {
    const updateMeal = await prisma.meal.update({
      where: {
        id
      },
      data: { id, name, description, timestamp }
    });
    res.status(200).json(updateMeal);
  } catch (error) {
    res
      .status(403)
      .json({ message: 'Error occurred while updating a meal item.', error });
  }
};
