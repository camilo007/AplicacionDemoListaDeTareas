# Gestión de Tareas - App Móvil

Aplicación de lista de tareas desarrollada con Ionic + Angular. Compatible con Android e iOS usando Cordova.

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

## Ejecutar en Android
Opción 1: Con Android Studio
- npx cap open android
    Se abrirá Android Studio. Desde ahí:

    Espera a que Gradle sincronice el proyecto

    Conecta un dispositivo o inicia un emulador

    Haz clic en Run ▶ para compilar y ejecutar

Opción 2: Solo con la terminal (sin Android Studio)
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
