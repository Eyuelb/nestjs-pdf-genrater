// Import necessary modules
import { Controller, Post, Res, Body, Query, Get } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf/pdf.service';
import { GeneratePdfDto } from './generate-pdf.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private pdfService: PdfService) {}

  // Your existing generatePdf endpoint
  @Get('generate-pdf')
  @ApiBody({ type: GeneratePdfDto })
  async generatePdf(
    @Query('htmlContent') htmlContent: string,
    @Query('format') format: string,
    @Res() res: Response,
  ) {
    const pdfFilePath = await this.pdfService.generatePdf(format,htmlContent);
    try {
      res.header('Content-Type', 'application/pdf');
      res.header('Content-Disposition', 'inline; filename=example.pdf');
      return res.send(pdfFilePath);
    } catch (error) {
      return res.status(500).send('Error fetching PDF');
    }
  }
}
