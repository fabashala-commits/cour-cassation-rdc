const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create a test admin user
  const password = 'P@ssw0rd123'
  const hash = await bcrypt.hash(password, 10)

  const existing = await prisma.user.findUnique({ where: { email: 'admin@cassation.local' } })
  if (!existing) {
    await prisma.user.create({
      data: {
        email: 'admin@cassation.local',
        name: 'Admin Cassation',
        passwordHash: hash,
        role: 'ADMIN'
      }
    })
    console.log('Created admin user: admin@cassation.local /', password)
  } else {
    console.log('Admin user already exists')
  }

  // Create sample keywords
  const kwNames = ['droit civil', 'droit commercial', 'responsabilite']
  for (const name of kwNames) {
    const k = await prisma.keyword.upsert({
      where: { name },
      update: {},
      create: { name }
    })
  }

  // Create sample magistrate (use findFirst/create to avoid unique constraint issues)
  let mag = await prisma.magistrat.findFirst({ where: { name: 'Jean Dupont' } })
  if (!mag) {
    mag = await prisma.magistrat.create({ data: { name: 'Jean Dupont', role: 'Président' } })
  }

  // Create a sample decision
  const decision = await prisma.decision.create({
    data: {
      title: 'Décision exemple 2024',
      summary: 'Résumé de la décision exemple',
      fullText: 'Texte intégral de la décision exemple. Ceci est un enregistrement de test.',
      date: new Date('2024-01-15'),
      year: 2024,
      chamber: 'CIVIL',
      status: 'PUBLISHED',
      reference: 'CC-2024-0001',
      author: { connect: { email: 'admin@cassation.local' } },
    }
  })

  // Link keywords
  const kw1 = await prisma.keyword.findUnique({ where: { name: 'droit civil' } })
  if (kw1) {
    await prisma.decisionKeyword.create({ data: { decisionId: decision.id, keywordId: kw1.id } })
  }

  // Link magistrate
  await prisma.decisionMagistrat.create({ data: { decisionId: decision.id, magistratId: mag.id } })

  console.log('Seed finished')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
