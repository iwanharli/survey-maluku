import axios from "axios";

// https://vps-be.emacsin.com
// https://laporisubackend.puas.in/

// GERRUS MALUKU = BE http://206.237.97.18:8080 | FE http://206.237.97.18/

axios.defaults.baseURL = 'http://206.237.97.18:8080';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

// axios.interceptors.response.use(
//     response => response,
//     error => {

//         if (error.response && error.response.status === 401) {
//             Swal.fire({
//                 title: "Orang lain sedang login menggunakan akun ini",
//                 width: 600,
//                 padding: "3em",
//                 color: "#716add",
//                 background: "#fff url(/images/trees.png)",

//                 // backdrop: `
//                 //     rgba(0,0,123,0.5)
//                 //     url("https://media4.giphy.com/media/DtM17H86F9pOyElCtd/giphy.gif?cid=ecf05e47r8oque0hv902e8lgtfo9vjun6g1y3grpcesq9mjh&ep=v1_stickers_search&rid=giphy.gif&c")
//                 //     bottom right
//                 //     repeat
//                 // `,
//                 backdrop: `
//                     rgba(0,0,123,0.9)
//                     url("https://sweetalert2.github.io/images/nyan-cat.gif")
//                     top left
//                     no-repeat
//                 `,
//                 showCancelButton: false,
//                 confirmButtonText: 'Silahkan login kembali',
//                 preConfirm: () => {
//                     localStorage.clear();
//                     router.push({ name: "auth.login" });
//                 },
//                 allowOutsideClick: false,
//                 allowEscapeKey: false,
//             })
//         } else {
//             setTimeout(() => {
//                 Swal.fire({
//                     icon: "error",
//                     title: "429",
//                     text: "Too Many Request, Reload in 5 second",
//                     showConfirmButton: false,
//                     timer: 5000
//                 })
//             }, 5000);
//         }

//         return Promise.reject(error);
//     });