# Gestión de Tareas - App Móvil

Aplicación de lista de tareas desarrollada con Ionic + Angular. Compatible con Android e iOS usando Cordova.

## Cambios realizados en la aplicación
Funcionalidades implementadas
    Gestión de tareas

        Crear nuevas tareas con nombre y categoría.

        Marcar tareas como completadas o pendientes.

        Eliminar tareas existentes.

        Filtrar tareas por categoría.

    Gestión de categorías

        Crear nuevas categorías personalizadas.

        Editar nombre de categorías existentes.

        Eliminar categorías no utilizadas.

        Asignar categorías a tareas.

    Persistencia de datos

        Implementación de almacenamiento local usando Ionic Storage.

        Los datos de tareas y categorías se guardan incluso después de cerrar la aplicación.

    Integración con Firebase

        Se integró Firebase Remote Config para activar o desactivar funcionalidades de manera remota.

    Compatibilidad móvil

        Proyecto preparado para ejecutarse en dispositivos Android físicos usando Capacitor.

        Soporte para live reload durante el desarrollo (ionic cap run android -l --external).

## Configuración y optimización técnica
Configuración de environment.ts y environment.prod.ts para separar entornos.

Modularización del código para mantener la escalabilidad.

Optimización del rendimiento en:

    Carga inicial (lazy loading, uso eficiente de módulos).

    Grandes volúmenes de tareas (uso de trackBy, manejo eficiente del DOM).

    Uso de memoria (eliminación de referencias innecesarias y suscripciones activas).

## Calidad y mantenibilidad

Código desarrollado de forma limpia, reutilizable y documentado.

Separación entre lógica de UI y lógica de negocio.

Pruebas manuales continuas en diferentes escenarios.

Uso de buenas prácticas con Angular, Ionic y TypeScript.
## Requisitos previos
Node.js (versión recomendada: 18.x o superior)

Ionic CLI (npm install -g @ionic/cli)

Android Studio o solo el SDK y emulador

Java 17 (para compilar con Gradle correctamente)

Gradle 8.1 (si lo usas fuera de Android Studio)

Xcode (solo para desarrollo iOS – macOS requerido)

Un dispositivo físico o emulador configurado

## Instalación del proyecto
# 1. Clona el repositorio
git clone https://github.com/camilo007/AplicacionDemoListaDeTareas.git
cd repo

# 2. Instala dependencias del proyecto
npm install

# 3. Configura Capacitor
npx ionic build
npx cap sync

## Ejecutar en navegador (modo desarrollo)
- ionic serve

## Ejecutar en Android
Opción 1: Con Android Studio
- npx cap open android
    Se abrirá Android Studio. Desde ahí:

    Espera a que Gradle sincronice el proyecto

    Conecta un dispositivo o inicia un emulador

    Haz clic en Run ▶ para compilar y ejecutar

Opción 2: Solo con la terminal (sin Android Studio)
- en consola: Ionic build
- en consola: npx cap copy android
- en consola del proyecto:
    cd android
    ./gradlew assembleDebug

- Luego instala la APK en tu dispositivo conectado vía USB:
    adb install app/build/outputs/apk/debug/app-debug.apk

## Ejecutar en iOS (solo en macOS)
- npx cap open ios
    Se abrirá Xcode. Desde ahí:

    Selecciona un emulador o dispositivo físico

    Haz clic en Run ▶ para compilar y ejecutar

    NOTA: Asegúrarse de tener Xcode instalado y una cuenta de desarrollador Apple configurada.
    NOTA: No cuento con el entorno necesario para probar su funcionamiento en iOS, pero se desarrollo con
          todos los estandares para que se pudiera compilar y ejecutar en dicho S.O

## Notas adicionales
Los archivos de build (android/build, android/app/build) están excluidos del repositorio con .gitignore.

Recuerda usar Java 17 y Gradle 8.1 para compilar correctamente.

Para limpiar el proyecto puedes usar:
cd android
./gradlew clean

## Comandos básicos

```bash
# Instalar dependencias
npm install

# Ejecutar en navegador
ionic serve

# Compilar para Android
ionic cordova build android

# Ejecutar en dispositivo/emulador Android
ionic cordova run android

# Compilar para iOS
ionic cordova build ios

# Ejecutar en dispositivo/emulador iOS
ionic cordova run ios
