// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prismaClient from '../../utils/prismaClient';

const prisma = prismaClient;

export default async (req, res) => {
  const { id } = req.body;
  try {
    const deleteVital = await prisma.vital.delete({
      where: {
        id
      }
    });
    res.status(200).json(deleteVital);
  } catch (error) {
    res
      .status(403)
      .json({ message: 'Error occured while deleting vital.', error });
  }
};
