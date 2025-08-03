# Sistema de Gestión Veterinaria - República del Ecuador

![Lovable](https://img.shields.io/badge/Built%20with-Lovable-ff69b4.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4.svg)

## 📋 Descripción del Proyecto

Sistema integral de gestión veterinaria desarrollado para la República del Ecuador, que integra servicios clínicos veterinarios con controles gubernamentales para la protección de especies en peligro de extinción y el cumplimiento de regulaciones sanitarias.

**URL del Proyecto**: https://lovable.dev/projects/3325703c-7a7d-4994-87a9-48c124b38922

## 🚀 Características Principales

### 🏥 Gestión Clínica Veterinaria
- **Registro de Mascotas**: Sistema completo de historiales médicos
- **Gestión de Dueños**: Base de datos de propietarios con documentación
- **Control de Vacunas**: Seguimiento de esquemas de vacunación y alertas
- **Gestor de Calendario**: Coordinación de citas y alertas de vencimiento

### 🛡️ Control Policial de Especies
- **Registro de Especies en Peligro**: Catálogo oficial de fauna protegida
- **Sistema de Incautaciones**: Gestión de decomisos y rescates
- **Reportes Policiales**: Generación de informes oficiales
- **Integración Veterinaria**: Servicios médicos especializados para especies protegidas

### 🔬 Servicios Especializados
- **Laboratorio**: Gestión de análisis clínicos y resultados
- **Farmacia Veterinaria**: Control de medicamentos y dispensación
- **Servicios Médicos**: Registro de consultas y tratamientos
- **Monitoreo IoT**: Dashboard de dispositivos conectados

### 💰 Administración y Facturación
- **Control Interno**: Gestión administrativa integral
- **Facturación SRI**: Cumplimiento con regulaciones tributarias ecuatorianas
- **Reportes Financieros**: Análisis de ingresos y gastos
- **Dashboard Analítico**: Métricas y KPIs del sistema

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.3.1**: Framework principal de desarrollo
- **TypeScript**: Tipado estático para mayor robustez
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework de estilos utilitarios
- **shadcn/ui**: Biblioteca de componentes UI

### Librerías y Dependencias
- **React Router Dom**: Enrutamiento de aplicación
- **React Hook Form**: Gestión de formularios
- **Tanstack Query**: Manejo de estado del servidor
- **Radix UI**: Componentes accesibles
- **Lucide React**: Iconografía
- **Recharts**: Gráficos y visualizaciones
- **Date-fns**: Manipulación de fechas
- **Zod**: Validación de esquemas

### Backend y Base de Datos
- **Supabase**: Backend como servicio
- **PostgreSQL**: Base de datos relacional
- **Autenticación**: Sistema de usuarios integrado
- **Almacenamiento**: Gestión de archivos y documentos

## 🏗️ Arquitectura del Sistema

```
src/
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes base de UI
│   ├── modals/          # Modales del sistema
│   └── ...              # Componentes específicos
├── pages/               # Páginas principales
│   ├── Dashboard.tsx    # Panel principal
│   ├── Mascotas.tsx     # Gestión de mascotas
│   ├── ControlPolicial.tsx # Control de especies
│   └── ...              # Otras páginas
├── hooks/               # Hooks personalizados
├── layouts/             # Layouts de página
├── lib/                 # Utilidades y configuración
└── main.tsx            # Punto de entrada
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Cuenta de Supabase (opcional para desarrollo local)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

5. **Construir para producción**
```bash
npm run build
```

## 📱 Funcionalidades por Módulo

### 🐕 Mascotas
- Registro completo con fotos
- Historial médico detallado
- Esquemas de vacunación
- Alertas de tratamiento

### 👥 Dueños
- Base de datos de propietarios
- Documentación oficial (Cédula/RUC)
- Historial de mascotas
- Información de contacto

### 💉 Vacunas
- Catálogo de vacunas disponibles
- Seguimiento de aplicaciones
- Alertas de refuerzo
- Certificados digitales

### 📅 Gestor de Calendario
- Programación de citas
- Alertas automáticas
- Sincronización de eventos
- Notificaciones por email/SMS

### 🛡️ Control Policial
- Registro de especies protegidas
- Sistema de incautaciones
- Reportes oficiales
- Coordinación interinstitucional

### 🔬 Laboratorio
- Gestión de muestras
- Resultados digitales
- Análisis especializados
- Reportes técnicos

### 🏪 Farmacia
- Inventario de medicamentos
- Control de prescripciones
- Dispensación regulada
- Alertas de stock

### 📊 IoT Dashboard
- Monitoreo en tiempo real
- Sensores ambientales
- Alertas automáticas
- Análisis de datos

## 🏛️ Integración Gubernamental

### Ministerio de Salud Pública
- Cumplimiento de normativas sanitarias
- Reportes epidemiológicos
- Control de zoonosis

### AGROCALIDAD
- Registro de establecimientos
- Control sanitario animal
- Certificaciones oficiales

### Policía Nacional
- Control de tráfico de especies
- Operativos de rescate
- Investigaciones ambientales

### Servicio de Rentas Internas (SRI)
- Facturación electrónica
- Cumplimiento tributario
- Reportes fiscales

## 🔐 Seguridad y Cumplimiento

- **Autenticación multifactor**
- **Cifrado de datos sensibles**
- **Auditoría de accesos**
- **Cumplimiento GDPR/LOPD**
- **Respaldos automáticos**

## 📈 Métricas y Analíticas

- Dashboard de KPIs
- Reportes de uso
- Análisis de tendencias
- Métricas de eficiencia

## 🌐 Despliegue

### Lovable Cloud
```bash
# Usar el botón "Publish" en Lovable
# URL: https://lovable.dev/projects/3325703c-7a7d-4994-87a9-48c124b38922
```

### Dominio Personalizado
- Configuración en Project > Settings > Domains
- Requiere plan pago de Lovable
- Soporte para SSL automático

## 🤝 Contribución

### Flujo de Desarrollo
1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- TypeScript estricto
- ESLint configurado
- Prettier para formateo
- Convenciones de naming en español

## 📞 Soporte y Contacto

### Equipo de Desarrollo
- **Email**: desarrollo@veterinaria.gob.ec
- **Teléfono**: +593 2 123-4567
- **Dirección**: Ministerio de Salud Pública, Quito, Ecuador

### Instituciones Participantes
- **Ministerio de Salud Pública**
- **AGROCALIDAD**
- **Policía Nacional del Ecuador**
- **Servicio de Rentas Internas**

## 📄 Licencia

Este proyecto está bajo la Licencia del Gobierno de la República del Ecuador. Todos los derechos reservados.

## 🔗 Enlaces Útiles

- [Lovable Documentation](https://docs.lovable.dev/)
- [Lovable Community Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [Ministerio de Salud Pública](https://www.salud.gob.ec/)
- [AGROCALIDAD](https://www.agrocalidad.gob.ec/)
- [Policía Nacional](https://www.policia.gob.ec/)

---

**Desarrollado con ❤️ para la protección y bienestar animal en Ecuador**