# App Template

This is a Next.js based template for building modern web applications. It comes with a set of pre-configured features to accelerate development.

## Features

### Authentication and Session Management
- **Login Page**: A ready-to-use login page.
- **Session Management**: Manages user sessions.
- **Fingerprint Authorization**: Includes fingerprint-based authorization for enhanced security.
- **Middleware for Access Control**: A middleware is in place to manage access to different parts of the application.

### Pages
- **Home Page**: A landing page for authenticated users.
- **Settings Page**: A page where users can configure their preferences.

### Tech Stack and Libraries
- **Next.js**: The application is built on top of the Next.js framework.
- **Shadcn/ui**: Comes with pre-configured Shadcn UI components.
- **Form Components**: A set of form components based on Shadcn are included.
- **Custom Hooks**: Includes useful hooks like `use-debounce` and `use-mobile`.
- **Internationalization (i18n)**: A translation provider is included and ready to use with its own providers for English and Spanish.

### Backend and Database
- **Database**: A ready-to-use database instance is preconfigured.
- **MinIO Client**: A MinIO client is included for object storage.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/adrian-luque/shadcn-next-app.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
    ```bash
    npm run dev
    ```

## Deployment with Docker

This application is ready to be deployed using Docker and Docker Compose.

1.  **Build the Docker image:**
    ```bash
    docker-compose build
    ```
2.  **Run the application:**
    ```bash
    docker-compose up -d
    ```
The application will be available at `http://localhost:3000`.
