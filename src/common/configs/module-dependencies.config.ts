import { MODULES_ENUM, PERMISSIONS_ENUM } from '../constants/auth.enum';

export interface IModuleDependency {
  module: keyof typeof MODULES_ENUM;
  permission: keyof typeof PERMISSIONS_ENUM;
  dependsOn: Array<{
    module: keyof typeof MODULES_ENUM;
    permission: keyof typeof PERMISSIONS_ENUM;
  }>;
  description?: string;
}

export const MODULE_DEPENDENCIES: IModuleDependency[] = [
  {
    module: 'PUESTOS',
    permission: 'CREAR',
    dependsOn: [{ module: 'DIRECCIONES', permission: 'VER' }],
    description: 'Para ver un puesto se necesita ver direcciones',
  },
  {
    module: 'PUESTOS',
    permission: 'EDITAR',
    dependsOn: [{ module: 'DIRECCIONES', permission: 'VER' }],
    description: 'Para editar un puesto se necesita ver direcciones',
  },
  {
    module: 'EMPLEADOS',
    permission: 'CREAR',
    dependsOn: [
      { module: 'BANCOS', permission: 'VER' },
      { module: 'DIRECCIONES', permission: 'VER' },
      { module: 'PUESTOS', permission: 'VER' },
      { module: 'PROYECTOS', permission: 'VER' },
      { module: 'SEDES', permission: 'VER' },
      { module: 'TIPOS_CONTRATOS', permission: 'VER' },
      { module: 'STAFF', permission: 'VER' },
      { module: 'TIPOS_DOCUMENTOS', permission: 'VER' },
      { module: 'TIPOS_DOCUMENTOS', permission: 'CREAR' },
      { module: 'TIPOS_DOCUMENTOS', permission: 'EDITAR' },
      { module: 'DISMISSAL', permission: 'VER' },
      { module: 'DISMISSAL', permission: 'CREAR' },
      { module: 'DISMISSAL', permission: 'EDITAR' },
      { module: 'DISMISSAL', permission: 'ELIMINAR' },
    ],
    description:
      'Para crear un empleado se necesita ver sedes, puestos, bancos, tipos de contratos, tipos de documentos y staff',
  },
  {
    module: 'EMPLEADOS',
    permission: 'EDITAR',
    dependsOn: [
      { module: 'BANCOS', permission: 'VER' },
      { module: 'DIRECCIONES', permission: 'VER' },
      { module: 'PUESTOS', permission: 'VER' },
      { module: 'PROYECTOS', permission: 'VER' },
      { module: 'SEDES', permission: 'VER' },
      { module: 'TIPOS_CONTRATOS', permission: 'VER' },
      { module: 'STAFF', permission: 'VER' },
      { module: 'TIPOS_DOCUMENTOS', permission: 'VER' },
      { module: 'TIPOS_DOCUMENTOS', permission: 'CREAR' },
      { module: 'TIPOS_DOCUMENTOS', permission: 'EDITAR' },
      { module: 'DISMISSAL', permission: 'VER' },
      { module: 'DISMISSAL', permission: 'CREAR' },
      { module: 'DISMISSAL', permission: 'EDITAR' },
      { module: 'DISMISSAL', permission: 'ELIMINAR' },
    ],
    description:
      'Para editar un empleado se necesita ver sedes, puestos, bancos, tipos de contratos, tipos de documentos y staff',
  },
  {
    module: 'EMPLEADOS',
    permission: 'VER',
    dependsOn: [
      { module: 'SOLICITUD_VACACIONES', permission: 'VER' },
      { module: 'SOLICITUD_VACACIONES', permission: 'CREAR' },
      { module: 'SOLICITUD_VACACIONES', permission: 'EDITAR' },
      { module: 'SOLICITUD_VACACIONES', permission: 'ELIMINAR' },
      { module: 'SOLICITUD_PERMISOS', permission: 'VER' },
      { module: 'SOLICITUD_PERMISOS', permission: 'CREAR' },
      { module: 'SOLICITUD_PERMISOS', permission: 'EDITAR' },
      { module: 'SOLICITUD_PERMISOS', permission: 'ELIMINAR' },
      { module: 'DISMISSAL', permission: 'VER' },
      // Validar si requeiro documentos
    ],
    description:
      'Para ver un empleado se necesita ver solicitudes de vacaciones, solicitudes de permisos, documentos, proyectos, sedes, puestos, tipos de contratos y staff',
  },
  {
    module: 'CONTRATOS',
    permission: 'CREAR',
    dependsOn: [
      { module: 'EMPLEADOS', permission: 'VER' },
      { module: 'SEDES', permission: 'VER' },
      { module: 'PUESTOS', permission: 'VER' },
      { module: 'TIPOS_CONTRATOS', permission: 'VER' },
      { module: 'BANCOS', permission: 'VER' },
      { module: 'DISMISSAL', permission: 'VER' },
      { module: 'DISMISSAL', permission: 'CREAR' },
      { module: 'DISMISSAL', permission: 'EDITAR' },
      { module: 'DISMISSAL', permission: 'ELIMINAR' },
    ],
    description:
      'Para crear un contrato se necesita ver empleados, sedes, puestos, tipos de contratos y bancos',
  },
  {
    module: 'ASIGNACION_A_PROYECTOS',
    permission: 'CREAR',
    dependsOn: [
      { module: 'PROYECTOS', permission: 'VER' },
      { module: 'SEDES', permission: 'VER' },
      { module: 'PUESTOS', permission: 'VER' },
      { module: 'EMPLEADOS', permission: 'VER' },
      { module: 'STAFF', permission: 'VER' },
    ],
    description:
      'Para crear una asignación a un proyecto se necesita ver proyectos, sedes, puestos, empleados y staff',
  },
  {
    module: 'ASIGNACION_A_PROYECTOS',
    permission: 'VER',
    dependsOn: [
      { module: 'PROYECTOS', permission: 'VER' },
      { module: 'SEDES', permission: 'VER' },
      { module: 'STAFF', permission: 'VER' },
      { module: 'SOLICITUD_PERMISOS', permission: 'VER' },
      { module: 'SOLICITUD_VACACIONES', permission: 'VER' },
      { module: 'SOLICITUD_VACACIONES', permission: 'CREAR' },
      { module: 'SOLICITUD_VACACIONES', permission: 'EDITAR' },
      { module: 'SOLICITUD_VACACIONES', permission: 'ELIMINAR' },
      { module: 'SOLICITUD_PERMISOS', permission: 'CREAR' },
      { module: 'SOLICITUD_PERMISOS', permission: 'EDITAR' },
      { module: 'SOLICITUD_PERMISOS', permission: 'ELIMINAR' },
    ],
    description:
      'Para crear una asignación a un proyecto se necesita ver proyectos, sedes, puestos, empleados y staff',
  },
  {
    module: 'STAFF',
    permission: 'VER',
    dependsOn: [
      { module: 'PROYECTOS', permission: 'VER' },
      { module: 'SEDES', permission: 'VER' },
      { module: 'EMPLEADOS', permission: 'VER' },
    ],
    description:
      'Para ver un staff se necesita ver proyectos, sedes y empleados',
  },
  {
    module: 'ASISTENCIA',
    permission: 'VER',
    dependsOn: [
      { module: 'PROYECTOS', permission: 'VER' },
      { module: 'SEDES', permission: 'VER' },
      { module: 'STAFF', permission: 'VER' },
    ],
    description:
      'Para ver una asistencia se necesita ver proyectos, sedes, empleados y staff',
  },
  {
    module: 'DIAS_FESTIVOS',
    permission: 'VER',
    dependsOn: [],
    description:
      'Para ver los días festivos no hay dependencias necesarias',
  },
  {
    module: 'NOMINAS',
    permission: 'VER',
    dependsOn: [
      { module: 'PROYECTOS', permission: 'VER' },
      { module: 'SEDES', permission: 'VER' },
    ],
    description:
      'Para ver una nomina se necesita ver días festivos y bonos',
  },
  {
    module: 'BONOS',
    permission: 'VER',
    dependsOn: [
      { module: 'TIPOS_BONOS', permission: 'VER' },
      { module: 'DESCRIPCION_BONOS', permission: 'VER' },
    ],
    description:
      'Para ver un bono se necesita ver tipos de bonos y descripciones de bonos',
  },
  {
    module: 'BONOS',
    permission: 'CREAR',
    dependsOn: [
      { module: 'EMPLEADOS', permission: 'VER' },
      { module: 'TIPOS_BONOS', permission: 'VER' },
      { module: 'DESCRIPCION_BONOS', permission: 'VER' },
    ],
    description:
      'Para crear un bono se necesita ver tipos de bonos y descripciones de bonos',
  },
  {
    module: 'TIPOS_BONOS',
    permission: 'VER',
    dependsOn: [],
    description:
      'Para ver un tipo de bono no hay dependencias necesarias',
  },
  {
    module: 'DESCRIPCION_BONOS',
    permission: 'VER',
    dependsOn: [],
    description:
      'Para ver una descripción de bono no hay dependencias necesarias',
  },
  {
    module: 'FIRMAS',
    permission: 'CREAR',
    dependsOn: [],
    description:
      'Para ver una firma no hay dependencias necesarias',
  },
  {
    module: 'SOLICITUD_PERMISOS',
    permission: 'VER',
    dependsOn: [],
    description:
      'Para ver una solicitud de permiso no hay dependencias necesarias',
  },
  {
    module: 'SOLICITUD_PERMISOS',
    permission: 'CREAR',
    dependsOn: [],
    description:
      'Para crear una solicitud de permiso no hay dependencias necesarias',
  },
  {
    module: 'SOLICITUD_PERMISOS',
    permission: 'EDITAR',
    dependsOn: [],
    description: 'Para editar una solicitud de permiso no hay dependencias necesarias',
  },
  {
    module: 'SOLICITUD_PERMISOS',
    permission: 'ELIMINAR',
    dependsOn: [],
    description:
      'Para eliminar una solicitud de permiso no hay dependencias necesarias',
  },
  {
    module: 'PROYECTOS',
    permission: 'VER',
    dependsOn: [
      { module: 'SEDES', permission: 'VER' },
      { module: 'DASHBOARD_OP', permission: 'VER' },
      { module: 'DASHBOARD_HEADQUARTER', permission: 'VER' },
    ],
    description:
      'Para ver un proyecto no hay dependencias necesarias',
  },
  {
    module: 'PROYECTOS',
    permission: 'CREAR',
    dependsOn: [],
    description: 'Para crear un proyecto no hay dependencias necesarias',
  },
  {
    module: 'PROYECTOS',
    permission: 'EDITAR',
    dependsOn: [],
    description: 'Para editar un proyecto no hay dependencias necesarias',
  },
  {
    module: 'PROYECTOS',
    permission: 'ELIMINAR',
    dependsOn: [],
    description: 'Para eliminar un proyecto no hay dependencias necesarias',
  },
  {
    module: 'SEDES',
    permission: 'VER',
    dependsOn: [
      { module: 'PUESTOS', permission: 'VER' },
      { module: 'EXTENSIONES', permission: 'VER' },
      { module: 'EXTENSIONES', permission: 'CREAR' },
      { module: 'EXTENSIONES', permission: 'EDITAR' },
      { module: 'EXTENSIONES', permission: 'ELIMINAR' },
      { module: 'DASHBOARD_HEADQUARTER', permission: 'VER' },
      { module: 'DASHBOARD_OP', permission: 'VER' },
    ],
    description:
      'Para ver una sede se necesita ver puestos, extensiones, dashboard headquarter y dashboard op',
  },
  {
    module: 'SEDES',
    permission: 'CREAR',
    dependsOn: [
      { module: 'PUESTOS', permission: 'VER' },
      { module: 'DIRECCIONES', permission: 'VER' },
      
    ],
    description: 'Para crear una sede se necesita ver puestos y direcciones',
  },
  {
    module: 'SEDES',
    permission: 'EDITAR',
    dependsOn: [
      { module: 'PUESTOS', permission: 'VER' },
      { module: 'DIRECCIONES', permission: 'VER' },
    ],
    description: 'Para editar una sede se necesita ver puestos y direcciones',
  },
  {
    module: 'SEDES',
    permission: 'ELIMINAR',
    dependsOn: [],
    description: 'Para eliminar una sede no hay dependencias necesarias',
  },
  {
    module: 'EXTENSIONES',
    permission: 'VER',
    dependsOn: [],
    description: 'Para ver una extensión no hay dependencias necesarias',
  },
  {
    module: 'EXTENSIONES',
    permission: 'CREAR',
    dependsOn: [],
  },
  {
    module: 'EXTENSIONES',
    permission: 'EDITAR',
    dependsOn: [],
    description: 'Para editar una extensión no hay dependencias necesarias',
  },
  {
    module: 'EXTENSIONES',
    permission: 'ELIMINAR',
    dependsOn: [],
  },
  {
    module: 'MARKETING',
    permission: 'VER',
    dependsOn: [],
    description: 'Para ver una marketing no hay dependencias necesarias',
  },
  {
    module: 'MARKETING',
    permission: 'CREAR',
    dependsOn: [],
    description: 'Para crear una marketing no hay dependencias necesarias',
  },
  {
    module: 'MARKETING',
    permission: 'EDITAR',
    dependsOn: [],
    description: 'Para editar una marketing no hay dependencias necesarias',
  },
  {
    module: 'MARKETING',
    permission: 'ELIMINAR',
    dependsOn: [],
    description: 'Para eliminar una marketing no hay dependencias necesarias',
  },
  {
    module: 'USUARIOS',
    permission: 'VER',
    dependsOn: [],
    description: 'Para ver un usuario no hay dependencias necesarias',
  },
  {
    module: 'USUARIOS',
    permission: 'CREAR',
    dependsOn: [],
    description: 'Para crear un usuario no hay dependencias necesarias',
  },
  {
    module: 'USUARIOS',
    permission: 'EDITAR',
    dependsOn: [],
    description: 'Para editar un usuario no hay dependencias necesarias',
  },
  {
    module: 'USUARIOS',
    permission: 'ELIMINAR',
    dependsOn: [],
    description: 'Para eliminar un usuario no hay dependencias necesarias',
  },
  {
    module: 'USUARIOS',
    permission: 'RESTAURAR',
    dependsOn: [],
    description: 'Para restaurar un usuario no hay dependencias necesarias',
  },
  {
    module: 'AUTH',
    permission: 'VER',
    dependsOn: [],
    description: 'Para ver un auth no hay dependencias necesarias',
  },
  {
    module: 'PERFILES',
    permission: 'VER',
    dependsOn: [],
    description: 'Para ver un perfil no hay dependencias necesarias',
  },
  {
    module: 'PERFILES',
    permission: 'CREAR',
    dependsOn: [
      { module: 'MODULOS', permission: 'VER' },
    ],
    description: 'Para crear un perfil no hay dependencias necesarias',
  },
  {
    module: 'PERFILES',
    permission: 'EDITAR',
    dependsOn: [
      { module: 'MODULOS', permission: 'VER' },
    ],
    description: 'Para editar un perfil no hay dependencias necesarias',
  },
  {
    module: 'PERFILES',
    permission: 'ELIMINAR',
    dependsOn: [],
  },
  // Modulos de super admin
  {
    module: 'MODULOS',
    permission: 'VER',
    dependsOn: [],
    description: 'Para ver un modulo no hay dependencias necesarias',
  },
  {
    module: 'MODULOS',
    permission: 'CREAR',
    dependsOn: [],
  },
  {
    module: 'MODULOS',
    permission: 'EDITAR',
    dependsOn: [],
    description: 'Para editar un modulo no hay dependencias necesarias',
  },
  {
    module: 'MODULOS',
    permission: 'ELIMINAR',
    dependsOn: [],
  },
  {
    module: 'MODULOS',
    permission: 'RESTAURAR',
    dependsOn: [],
    description: 'Para restaurar un modulo no hay dependencias necesarias',
  },
  {
    module: 'MODULOS',
    permission: 'RESTAURAR',
    dependsOn: [],
    description: 'Para restaurar un modulo no hay dependencias necesarias',
  },
  {
    module: 'PERMISOS',
    permission: 'VER',
    dependsOn: [],
    description: 'Para ver un permiso no hay dependencias necesarias',
  },
  {
    module: 'PERMISOS',
    permission: 'CREAR',
    dependsOn: [],
    description: 'Para crear un permiso no hay dependencias necesarias',
  },
  {
    module: 'PERMISOS',
    permission: 'EDITAR',
    dependsOn: [],
    description: 'Para editar un permiso no hay dependencias necesarias',
  },
  {
    module: 'PERMISOS',
    permission: 'ELIMINAR',
    dependsOn: [],
    description: 'Para eliminar un permiso no hay dependencias necesarias',
  },
  {
    module: 'PERMISOS',
    permission: 'RESTAURAR',
    dependsOn: [],
    description: 'Para restaurar un permiso no hay dependencias necesarias',
  },
  {
    module: 'ROLES',
    permission: 'VER',
    dependsOn: [],
    description: 'Para ver un rol no hay dependencias necesarias',
  },
  {
    module: 'ROLES',
    permission: 'CREAR',
    dependsOn: [],  
    description: 'Para crear un rol no hay dependencias necesarias',
  },
  {
    module: 'ROLES',
    permission: 'EDITAR',
    dependsOn: [],
    description: 'Para editar un rol no hay dependencias necesarias',
  },
  {
    module: 'ROLES',
    permission: 'ELIMINAR',
    dependsOn: [],
    description: 'Para eliminar un rol no hay dependencias necesarias',
  },
  {
    module: 'ROLES',
    permission: 'RESTAURAR',
    dependsOn: [],
    description: 'Para restaurar un rol no hay dependencias necesarias',
  },
];
