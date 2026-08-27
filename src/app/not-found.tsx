"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();
  const ease = [0.21, 0.47, 0.32, 0.98] as const;

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/20">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 text-center">
          {/* 404 icon with bounce */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-destructive/10 pulse-scale" />
              <div className="relative z-10 flex h-48 w-48 items-center justify-center">
                <h1 className="text-8xl font-bold text-primary">404</h1>
              </div>
              <motion.div
                className="absolute -top-4 -right-4 rounded-full bg-destructive p-3 text-destructive-foreground shadow-lg"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.4 }}
              >
                <AlertCircle className="h-8 w-8" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              Oops! The page you&apos;re looking for doesn&apos;t exist. It
              might have been moved or deleted.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
          >
            <Button
              size="lg"
              onClick={() => router.back()}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Link
              href="/"
              className={buttonVariants({ size: "lg", className: "gap-2" })}
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

          {/* Decorative blobs */}
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl glow-1" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl glow-2" />
        </div>
      </div>
    </>
  );
}
