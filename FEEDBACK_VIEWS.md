# Feedback System Views

Esta aplicación incluye un sistema completo de feedback y gestión de equipos con tres vistas principales:

## 🏠 Vistas Disponibles

### 1. **Admin Dashboard** (`/admin/feedback`)
Vista principal del administrador que incluye:
- Panel de información del manager (Alex Ruiz)
- Estadísticas de objetivos del equipo (gráfico donut)
- Solicitudes de feedback pendientes
- Actividades recientes del equipo
- Lista de tareas (To Do) con estados

### 2. **My Team** (`/admin/team`)
Vista de gestión del equipo que muestra:
- Grilla de tarjetas de empleados con fotos
- Información de cada miembro (nombre, rol, estado)
- Funcionalidad de búsqueda
- Filtros por vista (grilla/lista)
- Ordenamiento por nombre, rol o estado
- Estadísticas del equipo

### 3. **Profile** (`/admin/profile/[id]`)
Vista detallada de perfil individual con:
- Información personal completa
- Historial de feedback
- Habilidades y expertise
- Proyectos actuales
- Objetivos (actuales y completados)
- Logros y reconocimientos
- Relaciones de equipo (manager/reportes)
- Enlaces sociales

## 🎨 Datos Mock Implementados

Se creó un archivo de datos mock (`data/employees.ts`) que incluye:

### **Empleados con Información Completa:**
- **8 empleados** del equipo "God of War"
- **Imágenes reales** de Unsplash para avatares
- **Información detallada**: roles, skills, proyectos, objetivos
- **Relaciones jerárquicas**: manager/reportes
- **Historial de feedback** y actividades

### **Estructura de Datos:**
```typescript
interface Employee {
  id: string;
  name: string;
  role: string;
  team: string;
  status: 'PR In Progress' | 'Available' | 'On Leave' | 'Busy';
  avatar: string; // URLs de Unsplash
  email: string;
  phone?: string;
  location: string;
  joinDate: string;
  skills: string[];
  projects: string[];
  bio: string;
  manager?: string;
  reports?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  achievements: string[];
  goals: {
    current: string[];
    completed: string[];
  };
  feedbackHistory: {
    given: number;
    received: number;
    pending: number;
  };
}
```

## 🔗 Navegación

### **URLs de Acceso:**
- **Dashboard:** `http://localhost:[puerto]/admin/feedback`
- **Mi Equipo:** `http://localhost:[puerto]/admin/team`
- **Perfil:** `http://localhost:[puerto]/admin/profile/[employee-id]`

### **IDs de Empleados Disponibles:**
- `rachel-green`
- `julia-harvey`
- `jonah-smith`
- `jim-andrada`
- `alex-ruiz` (Manager)
- `tom-hardy`
- `amanda-wilson`
- `jessica-wright`

### **Navegación Entre Vistas:**
- **Header común** con enlaces entre todas las vistas
- **Links directos** desde tarjetas de empleados a perfiles
- **Botón de regreso** en vista de perfil
- **Breadcrumbs** y navegación contextual

## 🎯 Características Implementadas

### **Responsive Design:**
- ✅ **Mobile-first** approach
- ✅ **Breakpoints** optimizados para móvil, tablet y desktop
- ✅ **Navegación adaptiva** según tamaño de pantalla
- ✅ **Grillas flexibles** que se adaptan al contenido

### **Interactividad:**
- ✅ **Búsqueda en tiempo real** en vista de equipo
- ✅ **Filtros** por vista (grilla/lista)
- ✅ **Ordenamiento** por múltiples criterios
- ✅ **Hover effects** y transiciones suaves
- ✅ **Estados de loading** para avatares

### **Componentes Reutilizados:**
- ✅ **Avatar** con fallbacks automáticos
- ✅ **Cards** con variantes consistentes
- ✅ **Typography** siguiendo design system
- ✅ **Badges** para estados y categorías
- ✅ **Buttons** con iconos y variantes

### **Datos Dinámicos:**
- ✅ **Imágenes reales** desde Unsplash
- ✅ **Información realista** y coherente
- ✅ **Relaciones** entre empleados
- ✅ **Estados** y métricas actualizadas

## 🎨 Design System

Todas las vistas utilizan el design system existente:
- **Colores** personalizados para feedback system
- **Espaciado** consistente
- **Tipografía** y jerarquía visual
- **Componentes** reutilizables
- **Patrones** de interacción estándar

## 🚀 Próximos Pasos

Para expandir la funcionalidad, se podrían agregar:
- Vista de Game Changers
- Formularios de feedback interactivos
- Notificaciones en tiempo real
- Integración con calendario
- Exportación de reportes
- Configuración de equipos
- Analytics y métricas avanzadas
