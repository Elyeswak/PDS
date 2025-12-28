import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    
    const where: any = {};
    
    if (query.status && query.status !== 'all') {
      where.status = query.status;
    }
    
    if (query.search) {
      where.OR = [
        { attendeeName: { contains: query.search as string, mode: 'insensitive' } },
        { attendeeEmail: { contains: query.search as string, mode: 'insensitive' } }
      ];
    }
    
    if (query.dateFrom || query.dateTo) {
      where.startTime = {};
      if (query.dateFrom) {
        where.startTime.gte = new Date(query.dateFrom as string);
      }
      if (query.dateTo) {
        const dateTo = new Date(query.dateTo as string);
        dateTo.setHours(23, 59, 59, 999);
        where.startTime.lte = dateTo;
      }
    }
    
    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: {
        startTime: 'desc'
      }
    });
    
    return appointments;
    
  } catch (error: any) {
    console.error('Error fetching appointments:', error);
    
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch appointments'
    });
  }
});
