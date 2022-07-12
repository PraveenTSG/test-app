import { users } from './user';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Start Seeding....');

  const user = await prisma.user.createMany({
    data: users,
  });
}
console.log('Finish Seeding....');

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
