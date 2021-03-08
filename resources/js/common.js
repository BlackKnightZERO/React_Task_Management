import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

// const Swal = require('sweetalert2');


export function sweet_success($msg="Success"){
    Swal.fire({
       position: 'top-end',
       icon: 'success',
       title: $msg,
       showConfirmButton: false,
       timer: 1200
     })
  }

  export function sweet_error($msg="Oops !"){
      Swal.fire({
         position: 'top-end',
         icon: 'error',
         title: $msg,
         showConfirmButton: false,
         timer: 1200
       })
    }
