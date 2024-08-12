import { Component, Input } from '@angular/core';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pdf-generation',
  templateUrl: './pdf-generation.component.html',
  styleUrl: './pdf-generation.component.css'
})
export class PdfGenerationComponent {


  // --------------------------pdf generation-------------------
  // generatePDF(){

  //   const doc=new jsPDF();

  //   doc.text('hello world!',10,10);
  //   Swal.fire("hi");
  //   doc.save('heloworld.pdf')

  // }
// --------------user profile---------------------------------------------------------

@Input() user: any;
isVisible = false;

openProfile() {
  this.isVisible = true;
}

closeProfile() {
  this.isVisible = false;
}
}
