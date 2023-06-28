export interface Solicitud {
    _id: string;
    nombre_cliente: string;
    estado: number;
    servicio: string;
    cantidad: number;
    descripcion: string;
    subtotal: number;
    fecha_vencimiento: Date;
    mano_obra: number;
    categoria_servicio: string;
    total_servicio: number;
    nombre_material: string;
    precio_unitario: number;
}