import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/decisions?page=1&limit=20&year=2024&chamber=CIVIL&keyword=contrat
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const limit = parseInt(url.searchParams.get('limit') || '20')
    const year = url.searchParams.get('year')
    const chamber = url.searchParams.get('chamber')
    const keyword = url.searchParams.get('keyword')
    const search = url.searchParams.get('search')

    const skip = (page - 1) * limit

    const where: any = {
      status: 'PUBLISHED',
    }

    if (year) where.year = parseInt(year)
    if (chamber) where.chamber = chamber.toUpperCase()

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { fullText: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (keyword) {
      where.keywords = {
        some: {
          keyword: {
            name: { contains: keyword, mode: 'insensitive' },
          },
        },
      }
    }

    const [decisions, total] = await Promise.all([
      prisma.decision.findMany({
        skip,
        take: limit,
        where,
        orderBy: { date: 'desc' },
        select: {
          id: true,
          title: true,
          summary: true,
          date: true,
          reference: true,
          status: true,
          year: true,
          chamber: true,
          keywords: {
            select: {
              keyword: { select: { name: true } },
            },
          },
        },
      }),
      prisma.decision.count({ where }),
    ])

    const pages = Math.ceil(total / limit)

    return new Response(
      JSON.stringify({
        data: decisions,
        pagination: { page, limit, total, pages },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Failed to fetch decisions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    await prisma.$disconnect()
  }
}

// POST /api/decisions (create new decision)
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      title,
      summary,
      fullText,
      date,
      chamber,
      reference,
      keywords,
      magistrateIds,
    } = body

    if (!title || !fullText || !date || !chamber || !reference) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const year = new Date(date).getFullYear()

    const decision = await prisma.decision.create({
      data: {
        title,
        summary: summary || null,
        fullText,
        date: new Date(date),
        year,
        chamber,
        reference,
        status: 'DRAFT',
        keywords: keywords
          ? {
              create: keywords.map((kw: string) => ({
                keyword: {
                  connectOrCreate: {
                    where: { name: kw },
                    create: { name: kw },
                  },
                },
              })),
            }
          : undefined,
        magistrates: magistrateIds
          ? {
              create: magistrateIds.map((id: string) => ({
                magistratId: id,
              })),
            }
          : undefined,
      },
      include: {
        keywords: { include: { keyword: true } },
        magistrates: { include: { magistrat: true } },
      },
    })

    return new Response(JSON.stringify({ data: decision }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Failed to create decision' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    await prisma.$disconnect()
  }
}
