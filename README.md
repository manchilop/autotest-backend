# AutoTest Backend

Backend del proyecto **AutoTest**, una aplicación para que alumnos creen y respondan preguntas tipo test y los profesores puedan revisar el banco de preguntas y métricas.

Este repositorio contiene el **proyecto Spring Boot inicial** generado con Spring Initializr.

---

## Tecnologías y herramientas utilizadas

- **Spring Boot 3.5.8**: framework principal para el desarrollo del backend.
- **Java 21 (Temurin)**: versión LTS de Java utilizada para la compilación y ejecución.
- **PostgreSQL 16**: base de datos relacional para almacenar usuarios, preguntas y respuestas.
- **Lombok**: para reducir código repetitivo en las entidades (getters, setters, constructores).
- **Spring Data JPA**: para manejo de persistencia y repositorios.
- **Spring Validation**: para validaciones básicas de los modelos y entradas de usuarios.
---

## Estructura del proyecto

```
src/
 └─ main/
     ├─ java/com/example/autotestbackend/
     │   ├─ AutotestBackendApplication.java
     │   ├─ model/
     │   ├─ repository/
     │   ├─ service/
     │   └─ controller/
     └─ resources/
         ├─ application.yml
         └─ db/migration (futuro)
```

---

## Requisitos de desarrollo

Para ejecutar el backend de AutoTest localmente necesitas:

- **Java JDK 21 (Temurin)** – para compilar y ejecutar Spring Boot  
  [Descargar aquí](https://adoptium.net/)
- **PostgreSQL 16** – base de datos relacional para almacenar usuarios y preguntas  
  [Descargar aquí](https://www.postgresql.org/download/)
- **Maven 3.8+** – para gestionar dependencias y compilar el proyecto  
  [Instalación de Maven](https://maven.apache.org/install.html)
- **Git** – para control de versiones y trabajar con el repositorio  
  [Instalar Git](https://git-scm.com/downloads)

---

## Configuración local

1. Clona el repositorio:
```bash
git clone <URL_DEL_REPO>
cd autotest-backend
```

2. Configura PostgreSQL y crea la base de datos `autotest`.

3. Ajusta `application.yml` con tus credenciales de PostgreSQL.

4. Ejecuta la aplicación:
```bash
./mvnw spring-boot:run
```

---

## Convenciones de commits

Se sigue el estándar **Conventional Commits**:

- `chore`: cambios de infraestructura, setup inicial, configuraciones
- `feat`: nuevas funcionalidades
- `fix`: correcciones de bugs
- `refactor`: refactor sin cambio de comportamiento
- `docs`: documentación

Ejemplo primer commit:
```text
chore: bootstrap backend with Spring Initializr
```