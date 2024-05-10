import catchAsync from '../lib/catch-aync';
import prisma from '../lib/prisma';

export const getTest = catchAsync(async (req, res, next) => {
  const records = await prisma.test.findMany();
  res.status(200).json({ success: true, message: 'working', rec: records });
});
