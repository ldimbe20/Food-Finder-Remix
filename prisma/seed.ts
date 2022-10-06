import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  const kody = await db.user.create({
    data: {
      name: "Adam Sandler",
      username: "kody",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });
  await Promise.all(
    getProfiles().map((profile) => {
      const data = { userId: kody.id, ...profile };
      return db.profile.create({ data });
    })
  );
}

seed();

function getProfiles() {

  return [
    {
      name: "Susan",
      personalAllergy: "Milk",
      notes: "He doesn't like eggs"
    },
     ];
}