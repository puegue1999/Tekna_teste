import { PrismaClient } from '@prisma/client';
import { softDeleteExtension } from './extensions/softDelete';

const prisma = new PrismaClient().$extends(softDeleteExtension);

export default prisma;
