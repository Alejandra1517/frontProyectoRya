export interface Solicitud {
    _id: string;
    asunto_solicitud: string;
    nombre_cliente: string;
    categoria_servicio: number;
    servicio: string;
    cantidad: number;
    descripción: string;
    estado_solicitud: number;
    fecha_envio: number;
}