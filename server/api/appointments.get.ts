import { prisma } from '~/server/utils/prisma';
import type { Prisma } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    
    const where: Prisma.AppointmentWhereInput = {};
    
    // Filter by status
    if (query.status && query.status !== 'all') {
      where.status = query.status as any;
    }
    
    // Search in name, email, company, phone, or vim
    if (query.search) {
      const searchTerm = query.search as string;
      where.OR = [
        { attendeeName: { contains: searchTerm, mode: 'insensitive' } },
        { attendeeEmail: { contains: searchTerm, mode: 'insensitive' } },
        { companyName: { contains: searchTerm, mode: 'insensitive' } },
        { attendeePhoneNumber: { contains: searchTerm, mode: 'insensitive' } },
        { vim: { contains: searchTerm, mode: 'insensitive' } }
      ];
    }
    
    // Filter by date range
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
    
    // Fetch appointments with ordering
    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: {
        startTime: query.sortOrder === 'asc' ? 'asc' : 'desc'
      },
      // Select all fields explicitly
      select: {
        id: true,
        calComBookingId: true,
        calComUid: true,
        attendeeName: true,
        attendeeEmail: true,
        attendeeTimezone: true,
        attendeePhoneNumber: true,
        title: true,
        description: true,
        startTime: true,
        endTime: true,
        status: true,
        companyName: true,
        serviceInterest: true,
        specialRequirements: true,
        reason: true,
        vim: true,
        meetingUrl: true,
        cancellationReason: true,
        rescheduleUid: true,
        createdAt: true,
        updatedAt: true
      },
      // Optional pagination
      ...(query.limit && {
        take: parseInt(query.limit as string)
      }),
      ...(query.offset && {
        skip: parseInt(query.offset as string)
      })
    });
    
    // Optional: Get total count for pagination
    const total = query.includeCount 
      ? await prisma.appointment.count({ where })
      : undefined;
    
    return {
      appointments,
      ...(total !== undefined && { total })
    };
    
  } catch (error: any) {
    console.error('❌ Error fetching appointments:', error);
    
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch appointments',
      cause: error
    });
  }
});
