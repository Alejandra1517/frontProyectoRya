export interface Cotizacion {
    //ids
    _id: string;
    solicitud: string;
    materiales: string;
    servicios: string;

    nombre_cliente:string;
    servicio: string;
    cantidad: number;
    descripción: string;
    subtotal: number;
    fecha_vencimiento: Date;
    mano_obra: number;
    total_servicio: number;
    estado_cotizacion_cliente: number;    
    estado_cotizacion: number;
    estado_solicitud: number;
}

