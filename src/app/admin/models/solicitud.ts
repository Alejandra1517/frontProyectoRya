// export interface Solicitud {
//   _id: string;
//   nombre_cliente: string;
//   categoria_servicio: number;
//   servicio: string; //Otro
//   cantidad: number;
//   descripción: string;
//   estado_solicitud: number;
//   fecha_envio: number;
//   servicios: {
//     categoria: number;
//     nombre_servicio: string;
//   }[];
// }

export interface Solicitud {
    solicitud: string; //id
    nombre_cliente: string;
    categoria_servicio: number;
    servicios: string[]; // Cambiado a un array de strings
    cantidad: number;
    descripción: string;
    estado_solicitud: number;
    fecha_envio: string; // Cambiado a string para utilizar el formato ISO
  }
  