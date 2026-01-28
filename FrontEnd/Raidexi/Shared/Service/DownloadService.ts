import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Parser } from 'json2csv';


export async function ExportPng(element: string, filename: string) {
    const input = document.getElementById(element);
    if (!input) throw new Error('Element not found');
    
    const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#1a1510',
        logging: false, 
        onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.getElementById(element);
            if (clonedElement) {
                const allElements = clonedElement.querySelectorAll('*');
                allElements.forEach((el) => {
                    const htmlEl = el as HTMLElement;
                    const computed = window.getComputedStyle(el);
                    if (computed.color) htmlEl.style.color = computed.color;
                    if (computed.backgroundColor) htmlEl.style.backgroundColor = computed.backgroundColor;
                    if (computed.borderColor) htmlEl.style.borderColor = computed.borderColor;
                    if (computed.fill) htmlEl.style.fill = computed.fill;
                    if (computed.stroke) htmlEl.style.stroke = computed.stroke;
                });
            }
        }
    });
    
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    link.click();
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
    pdf.save(filename);
}


export function ExportCsv(data: any[], filename: string = 'export.csv') {
    const parser = new Parser();
    const csv = parser.parse(data);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}