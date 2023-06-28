export interface Rol {
    id_rol: string;
    nombre_rol: string;
    estado: number;
    configuracion: boolean,
    usuarios: boolean,
    materiales: boolean,
    servicios: boolean,
    empleados: boolean,
    clientes: boolean,
    solicitudes: boolean,
    cotizaciones: boolean,
    obras: boolean
}
