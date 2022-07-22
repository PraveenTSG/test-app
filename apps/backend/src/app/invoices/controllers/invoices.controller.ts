import { InvoicesService } from '../services/invoices.service';
import { CreateInvoiceDto } from './../dto/invoice.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoiceService: InvoicesService) {}
  //Create invoice
  @Post('createInvoice')
  async createUserInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    console.log('createInvoiceDto Controller', createInvoiceDto);
    return this.invoiceService.createInvoice(createInvoiceDto);
  }
}
