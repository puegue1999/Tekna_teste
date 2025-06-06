import { Prisma } from '@prisma/client';

export const softDeleteExtension = Prisma.defineExtension({
  name: 'softDelete',
  model: {
    $allModels: {
      async delete(this: any, where: any) {
        return this.update({
          where,
          data: { deletedAt: new Date() },
        });
      },
      async deleteMany(this: any, where: any) {
        return this.updateMany({
          where,
          data: { deletedAt: new Date() },
        });
      },
    },
  },
});
