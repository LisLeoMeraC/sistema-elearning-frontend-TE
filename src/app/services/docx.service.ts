import { Injectable } from '@angular/core';
import { Document, Paragraph, Packer, HeadingLevel, SectionType } from 'docx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DocxService {
  generateDocx(preguntas: any[]): void {
    if (!preguntas || !Array.isArray(preguntas) || preguntas.length === 0) {
      console.error('No se proporcionaron preguntas válidas para generar el DOCX:', preguntas);
      return;
    }
    const children: Paragraph[] = [];

    preguntas.forEach((pregunta, index) => {
      const preguntaParagraph = new Paragraph({
        text: `Pregunta ${index + 1}: ${pregunta.nombre}`,
        heading: HeadingLevel.HEADING_2,
      });
      children.push(preguntaParagraph);

      pregunta.opciones.forEach((opcion: any) => {
        const optionParagraph = new Paragraph({
          text: opcion.nombre,
          bullet: {
            level: 0,
          },
        });
        children.push(optionParagraph);
      });

      // Añadir un espacio entre preguntas
      children.push(new Paragraph(''));
    });

    const doc = new Document({
      sections: [{
        properties: { type: SectionType.CONTINUOUS },
        children: children,
      }],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, 'Examen.docx');
    });
  }
}
