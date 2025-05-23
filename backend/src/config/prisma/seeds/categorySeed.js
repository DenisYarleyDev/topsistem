// prisma/seed.js
import prisma from "../../prisma/index.js";

async function main() {
  const categories = [
    "GUARDA-CORPO",
    "CORREDOR LATERAL",
    "BOX",
    "PORTAO",
    "PORTA",
    "JANELA"
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Categorias inseridas com sucesso!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
})

