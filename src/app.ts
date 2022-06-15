import express from 'express';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 5000;

const prisma = new PrismaClient();

const main = async () => {
  const app = express();

  app.get('/message/add', async (_req, res) => {
    const message = await prisma.message.create({
      data: {
        text: `Hello ${Date.now()}`,
      },
    });
    res.json({ message });
  });

  app.get('/message', async (_req, res) => {
    res.json({ messages: await prisma.message.findMany() });
  });

  app.get('/test', (_req, res) => {
    res.json({ message: 'Hello World' });
  });

  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
