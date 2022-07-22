import { CreateInvoiceDto } from './../dto/invoice.dto';
import { PrismaService } from './../../prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  //Create Invoice Service
  async createInvoice(invoiceData: CreateInvoiceDto) {
    try {
      console.log('invoiceData Service', invoiceData);
      const invoice = await this.prisma.invoices.create({
        data: {
          price: Number(invoiceData.price),
          userId: Number(invoiceData.userId),
        },
      });
      return {
        success: true,
        message: 'Invoice created Successfully !!',
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
