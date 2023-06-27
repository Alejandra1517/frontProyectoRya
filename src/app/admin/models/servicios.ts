
export interface Servicio {
    _id: string;
    descripcion: string;
    categoria: number;
    valor_unitario: number;
    estado: number;
    nombre_servicio: string;
    imagen: string; // Tipo string para almacenar la ruta de la imagen
}

