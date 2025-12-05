# Aplicación React Native con Expo

Esta es una aplicación móvil desarrollada con React Native y Expo.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 14 o superior)
  - Descárgalo desde [nodejs.org](https://nodejs.org/)
  - Verifica la instalación ejecutando: `node --version`

- **Expo Go** en tu dispositivo móvil
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_PROYECTO>
```

### 2. Instalar Dependencias

Ejecuta el siguiente comando en la raíz del proyecto para instalar todas las dependencias necesarias:

```bash
npm install
```

## ▶️ Ejecución de la Aplicación

### Iniciar el Servidor de Desarrollo

Ejecuta el siguiente comando para iniciar el servidor de Expo:

```bash
npx expo start
```

Después de ejecutar el comando, se abrirá una interfaz en tu terminal con varias opciones:

### Opciones de Visualización

- **Presiona `w`**: Para abrir la aplicación en el navegador web
- **Escanea el código QR**: Para abrir la aplicación en tu dispositivo móvil

#### Visualizar en Dispositivo Móvil

1. Abre la aplicación **Expo Go** en tu teléfono
2. Escanea el código QR que aparece en la terminal
3. **Importante**: Tu teléfono y tu computadora deben estar conectados a la misma red WiFi

## ⚙️ Configuración con Backend

Si vas a ejecutar la aplicación en conjunto con un backend, necesitas realizar los siguientes ajustes:

### 1. Configuración de Deep Links en `App.tsx`

Abre el archivo `App.tsx` y modifica la sección de configuración de Deep Links con la IP de tu computadora:

```typescript
// --- Configuración del Deep Link ---
const linking = {
  prefixes: [
    'mirugo://', 
    'http://app.rassajala.com', 
    'http://192.168.0.106:8081'  // Reemplaza con tu IP local
  ],
  // ...
};
```

### 2. Cambiar URL de Conexión al Backend

En los archivos donde se realizan peticiones al backend, cambia `localhost:8081` por la IP local de tu computadora seguida del puerto.

**Ejemplo:**
- ❌ Antes: `http://localhost:8081/api/v1`
- ✅ Después: `http://192.168.0.106:8081/api/v1`

### Cómo Obtener tu IP Local

**Windows:**
```bash
ipconfig
```
Busca "Dirección IPv4" en la sección de tu adaptador WiFi.

**macOS/Linux:**
```bash
ifconfig
```
o
```bash
ip addr show
```

## 📁 Estructura del Proyecto

```
proyecto/
├── expo/
├── assets/
│   └── imagenes/
├── node_modules/
├── src/
│   ├── components/
│   ├── config/
│   ├── contexts/
│   ├── hooks/
│   ├── screens/
│   ├── services/
│   └── styles/
│       ├── components/
│       └── screens/
├── types/
├── utils/
├── .env
├── .env.example
├── App.tsx
├── babel.config.js
├── index.tsx
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Tecnologías Utilizadas

- React Native
- Expo
- TypeScript
- Node.js

## ⚠️ Solución de Problemas

### La aplicación no se conecta al backend
- Verifica que ambos dispositivos estén en la misma red WiFi
- Asegúrate de haber cambiado todas las referencias de `localhost` por tu IP local
- Verifica que el firewall no esté bloqueando las conexiones

### El código QR no funciona
- Asegúrate de que Expo Go esté actualizado
- Verifica la conexión a internet
- Intenta reiniciar el servidor de Expo

## 📝 Notas Adicionales

- Cada vez que cambies de red WiFi, deberás actualizar las IPs en la configuración
- Para producción, asegúrate de usar URLs absolutas y no IPs locales
- Mantén las dependencias actualizadas ejecutando `npm update`