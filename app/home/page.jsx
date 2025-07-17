

"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

const HomePage = () => {
  const [isCopied, setIsCopied] = useState(false);
  const textToCopyRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopyRef.current.textContent);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          App Template
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A Next.js boilerplate for building modern, feature-rich web applications with ease.
        </p>
      </header>

      <section id="features">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Authentication & Session Management</CardTitle>
              <CardDescription>Secure and robust user handling.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Ready-to-use Login Page</li>
                <li>Complete Session Management</li>
                <li>Fingerprint-based Authorization</li>
                <li>Middleware for Access Control</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Pre-built Pages</CardTitle>
              <CardDescription>Essential pages to get you started.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Home Page</li>
                <li>Settings Page</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Tech Stack & Libraries</CardTitle>
              <CardDescription>Modern and powerful tools.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Badge>Next.js</Badge>
                <Badge variant="secondary">Shadcn/ui</Badge>
                <Badge>React Hook Form</Badge>
                <Badge variant="secondary">Zod</Badge>
                <Badge>Tailwind CSS</Badge>
                <Badge variant="secondary">Docker</Badge>
                <Badge>SQL Server</Badge>
                <Badge variant="secondary">MinIO</Badge>
            </CardContent>
          </Card>

           <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Custom Components & Hooks</CardTitle>
              <CardDescription>Reusable and efficient code.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Shadcn-based Form Components</li>
                <li>`use-debounce` hook</li>
                <li>`use-mobile` hook</li>
                <li>Translation Provider</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Backend & Database</CardTitle>
              <CardDescription>Integrated backend services.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Pre-configured Database Instance</li>
                <li>MinIO Client for Object Storage</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="setup">
        <h2 className="text-3xl font-bold text-center mb-8">Setup</h2>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Environment Variables</CardTitle>
              <CardDescription>
                Create a <code>.env</code> file in the root of the project and
                add the following variables.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className={"relative"}>
             <Button onClick={handleCopy} variant="outline" size="icon" className={"cursor-pointer absolute top-2 right-8 z-10"}>
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code className="text-sm" ref={textToCopyRef}>
                {`NEXT_PUBLIC_URL='http://localhost:3000/route'
ENTRY_ROUTE='/route'

AUTH_SERVICE=
SESSION_SERVICE=

DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DATABASE=
DB_PORT=

MINIO_ROOT_USER=
MINIO_ROOT_PASSWORD=
MINIO_CLIENT_URL=

HTTP_COOKIE='http' // Set to 'https' in production

DEV_ENV=true // Set to false in production`}
              </code>
            </pre>
          </CardContent>
        </Card>
      </section>

      <section id="deployment">
        <h2 className="text-3xl font-bold text-center mb-8">Deployment</h2>
        <Card>
          <CardHeader>
            <CardTitle>Deploy with Docker</CardTitle>
            <CardDescription>
              Build and run your application using Docker.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code className="text-sm">
                {`docker-compose up --build`}
              </code>
            </pre>
            <p className="mt-4 text-sm text-muted-foreground">
              This command will build the Docker images and start the services defined in your <code>docker-compose.yml</code> file.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
