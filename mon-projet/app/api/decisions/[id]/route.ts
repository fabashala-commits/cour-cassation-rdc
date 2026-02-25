import { PrismaClient } from '@prisma/client'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

// Helper to normalize params which may be a Promise in some Next versions
async function resolveParams(p: any) {
  if (!p) return {}
  if (typeof p.then === 'function') return await p
  return p
}

// GET /api/decisions/[id]
export async function GET(
  req: NextRequest,
  context: any
) {
  const { params } = await resolveParams(context?.params)
  try {
    const decision = await prisma.decision.findUnique({
      where: { id: params.id },
      include: {
        keywords: { include: { keyword: true } },
        magistrates: { include: { magistrat: true } },
        files: true,
      },
    })

    if (!decision) {
      return new Response(JSON.stringify({ error: 'Decision not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ data: decision }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Failed to fetch decision' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    await prisma.$disconnect()
  }
}

// PUT /api/decisions/[id] (update decision)
export async function PUT(
  req: NextRequest,
  context: any
) {
  const { params } = await resolveParams(context?.params)
  try {
    const body = await req.json()
    const {
      title,
      summary,
      fullText,
      date,
      chamber,
      reference,
      status,
      keywords,
      magistrateIds,
    } = body

    // Prepare update data
    const updateData: any = {}
    if (title) updateData.title = title
    if (summary !== undefined) updateData.summary = summary
    if (fullText) updateData.fullText = fullText
    if (date) {
      updateData.date = new Date(date)
      updateData.year = new Date(date).getFullYear()
    }
    if (chamber) updateData.chamber = chamber
    if (reference) updateData.reference = reference
    if (status) updateData.status = status

    // Update keywords if provided
    if (keywords) {
      // Remove old keywords
      await prisma.decisionKeyword.deleteMany({
        where: { decisionId: params.id },
      })
      // Add new keywords
      updateData.keywords = {
        create: keywords.map((kw: string) => ({
          keyword: {
            connectOrCreate: {
              where: { name: kw },
              create: { name: kw },
            },
          },
        })),
      }
    }

    // Update magistrates if provided
    if (magistrateIds) {
      await prisma.decisionMagistrat.deleteMany({
        where: { decisionId: params.id },
      })
      updateData.magistrates = {
        create: magistrateIds.map((id: string) => ({
          magistratId: id,
        })),
      }
    }

    const decision = await prisma.decision.update({
      where: { id: params.id },
      data: updateData,
      include: {
        keywords: { include: { keyword: true } },
        magistrates: { include: { magistrat: true } },
        files: true,
      },
    })

    return new Response(JSON.stringify({ data: decision }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Failed to update decision' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    await prisma.$disconnect()
  }
}

// DELETE /api/decisions/[id]
export async function DELETE(
  req: NextRequest,
  context: any
) {
  const { params } = await resolveParams(context?.params)
  try {
    // Delete related records first
    await prisma.decisionKeyword.deleteMany({
      where: { decisionId: params.id },
    })
    await prisma.decisionMagistrat.deleteMany({
      where: { decisionId: params.id },
    })
    await prisma.decisionFile.deleteMany({
      where: { decisionId: params.id },
    })

    // Delete decision
    const decision = await prisma.decision.delete({
      where: { id: params.id },
    })

    return new Response(JSON.stringify({ data: decision }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error(err)
    return new Response(JSON.stringify({ error: 'Failed to delete decision' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  } finally {
    await prisma.$disconnect()
  }
}
