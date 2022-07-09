// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismaClient from '../../utils/prismaClient';

const prisma = prismaClient;

export default async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.meal.create({
      data: {
        ...data
      }
    });
    res.status(200).json(result);
  } catch (error) {
    res
      .status(403)
      .json({ message: 'Error occured while adding a new meal.', error });
  }
};
