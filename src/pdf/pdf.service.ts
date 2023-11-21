import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';

@Injectable()
export class PdfService {
  async generatePdf(format: string, htmlContent: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      pdf
        .create(htmlContent, {
          format: format,
          orientation: 'portrait',
          border: '12mm',
        })
        .toBuffer(async (error, buffer) => {
          if (error) {
            reject(error);
          } else {
            resolve(buffer);
          }
        });
    });
  }
}
