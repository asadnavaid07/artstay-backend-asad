import "dotenv/config";

import prisma from "../src/libs/prisma";
import { craftCategories, slugify } from "../../categories";

const toSlug = (value: string): string => slugify(value);

const syncCrafts = async (): Promise<void> => {
  const desiredCraftSlugs: string[] = [];

  for (const craft of craftCategories) {
    const craftSlug = toSlug(craft.name);
    desiredCraftSlugs.push(craftSlug);

    const craftRecord = await prisma.craft.upsert({
      where: { craftSlug },
      update: {
        craftName: craft.name,
      },
      create: {
        craftName: craft.name,
        craftSlug,
      },
    });

    const desiredSubCraftSlugs: string[] = [];

    for (const subCraftName of craft.subCrafts) {
      const subCraftSlug = `${craftSlug}-${toSlug(subCraftName)}`;
      desiredSubCraftSlugs.push(subCraftSlug);

      const existingSubCraft = await prisma.subCraft.findFirst({
        where: { subCraftSlug },
      });

      if (existingSubCraft) {
        await prisma.subCraft.update({
          where: { subCraftId: existingSubCraft.subCraftId },
          data: {
            subCraftName,
            craftId: craftRecord.craftId,
          },
        });
      } else {
        await prisma.subCraft.create({
          data: {
            subCraftName,
            subCraftSlug,
            craftId: craftRecord.craftId,
          },
        });
      }
    }

    if (desiredSubCraftSlugs.length > 0) {
      await prisma.subCraft.deleteMany({
        where: {
          craftId: craftRecord.craftId,
          subCraftSlug: { notIn: desiredSubCraftSlugs },
        },
      });
    } else {
      await prisma.subCraft.deleteMany({
        where: { craftId: craftRecord.craftId },
      });
    }
  }

  await prisma.craft.deleteMany({
    where: {
      craftSlug: { notIn: desiredCraftSlugs },
    },
  });
};

syncCrafts()
  .then(() => {
    console.log("Craft catalog synced successfully.");
  })
  .catch((error) => {
    console.error("Failed to sync craft catalog", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

