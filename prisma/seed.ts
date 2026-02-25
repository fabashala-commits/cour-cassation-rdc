import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test magistrates
  const magistrat1 = await prisma.magistrat.create({
    data: {
      name: 'Président Jean Dupont',
      role: 'Président de chambre',
      bio: 'Expert en droit civil',
    },
  })

  const magistrat2 = await prisma.magistrat.create({
    data: {
      name: 'Conseiller Marie Martin',
      role: 'Conseiller rapporteur',
      bio: 'Spécialiste en droit commercial',
    },
  })

  // Create keywords
  const keyword1 = await prisma.keyword.create({
    data: { name: 'responsabilité civile' },
  })

  const keyword2 = await prisma.keyword.create({
    data: { name: 'contrat' },
  })

  // Create a test decision
  const decision = await prisma.decision.create({
    data: {
      title: 'Décision n°2024-001 : Cas de responsabilité civile',
      summary: 'Jugement concernant un litige de responsabilité civile entre deux parties.',
      fullText:
        'Attendu que... [texte complet de la décision]. Par ces motifs, la Cour cassation...',
      date: new Date('2024-01-15'),
      year: 2024,
      chamber: 'CIVIL',
      status: 'PUBLISHED',
      reference: '2024-001-CIVIL',
      keywords: {
        create: [{ keywordId: keyword1.id }, { keywordId: keyword2.id }],
      },
      magistrates: {
        create: [{ magistratId: magistrat1.id }, { magistratId: magistrat2.id }],
      },
    },
  })

  console.log('✅ Seed completed!')
  console.log(`✓ Created ${1} decision, ${2} magistrates, ${2} keywords`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
