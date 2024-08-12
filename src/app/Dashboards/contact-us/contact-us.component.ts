import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {



 
//   form:FormGroup=this.fb.group({
//     from_name:'',
//     to_name:'Admin',
//     from_email:'',
//     subject:'',
//     message:'',
// });
// constructor(private fb:FormBuilder){
    
// }
//   async send(){
//     emailjs.init('5g1Zt6VYdFrMmaSGo')
//   let response=await emailjs.send("service_n1jjh0y","template_n94xu81",{
//     from_name: this.form.value.from_name,
//     to_name: this.form.value.to_name,
//     from_email:this.form.value.from_email,
//     subject: this.form.value.subject,
//     message: this.form.value.message,
//     });
    
//     alert("message has been sent.");
//     this.form.reset();
//   }}

form: FormGroup;

constructor(private fb: FormBuilder) {
  this.form = this.fb.group({
    from_name: ['', Validators.required],
    from_email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
    to_name: ['Admin']
  });
}

async send() {
  emailjs.init('5g1Zt6VYdFrMmaSGo');

  const templateParams = {
    from_name: this.form.value.from_name,
    to_name: this.form.value.to_name,
    from_email: this.form.value.from_email,
    subject: this.form.value.subject,
    message: this.form.value.message
  };

  try {
    let response = await emailjs.send('service_n1jjh0y', 'template_n94xu81', templateParams);
    console.log('SUCCESS!', response.status, response.text);
    Swal.fire({
      title: "EMAIL",
      text: "EMAIL SENT-Successful!",
      icon: "success"
    }).then(() => {
      this.form.reset();
  });
    // alert('Message has been sent.');
   
  } catch (error) {
    console.error('FAILED...', error);
    alert('Failed to send the message. Please try again.');
  }
}
}

