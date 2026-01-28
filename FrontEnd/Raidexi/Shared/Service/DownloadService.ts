import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Parser } from 'json2csv';
import { SendMailRequest } from '../types';
import { SendMailService } from './MailService';


export async function ExportPng(element: string, filename: string) {
    const input = document.getElementById(element);
    if (!input) throw new Error('Element not found');
    const canvas = await html2canvas(input, { scale: 2 });
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    const base64 = link.href.split(',')[1];
    const mineType = 'image/png';
    const filenames = filename;
    link.click();
    return { base64, mineType, filenames };
}

export async function ExportPdf(element: string, filename: string) {
    const input = document.getElementById(element);
    if (!input) throw new Error('Element not found');
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
     const base64 = pdf.output('datauristring').split(',')[1];
     const mineType = 'application/pdf';
     const filenames = filename;
    pdf.save(filename);
    return {base64, mineType, filenames};

}


export function ExportCsv(data: any[], filename: string = 'export.csv') {
    const parser = new Parser();
    const csv = parser.parse(data);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    const base64 = btoa(unescape(encodeURIComponent(csv)));
    const mineType = 'text/csv';
    const filenames    = filename;
    link.click();
    return {base64, mineType, filenames};
}

export async function HandleSendDataToMail(
  data: SendMailRequest,
  typeFile: 'pdf' | 'png' | 'csv'
) {
  let attachment;

  switch (typeFile) {
    case 'pdf':
      attachment = await ExportPdf('export-data-measure', data.attachments.filenames);
      break;
    case 'png':
      attachment = await ExportPng('export-data-measure', data.attachments.filenames);
      break;
    case 'csv':
      attachment = ExportCsv(
        JSON.parse(atob(data.attachments.base64)),
        data.attachments.filenames
      );
      break;
  }

  await SendMailService({
    data: {
      ...data,
      attachments: attachment!
    }
  });
}
