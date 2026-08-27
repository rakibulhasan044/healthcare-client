"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { motion } from "framer-motion";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  console.log(state);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.form
      action={formAction}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {redirect && (
        <input className="hidden" name="redirect" defaultValue={redirect} />
      )}
      <FieldGroup>
        <motion.div variants={itemVariants}>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              required
            />
            <InputFieldError field="email" state={state} />
          </Field>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" name="password" type="password" required />
            <InputFieldError field="password" state={state} />
          </Field>
        </motion.div>

        <FieldGroup className="mt-4">
          <motion.div variants={itemVariants}>
            <Field>
              <Button
                type="submit"
                variant="outline"
                disabled={isPending}
                className="bg-blue-600 text-white font-bold"
              >
                {isPending ? "Logging in ..." : "Login"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Do not have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Register here
                </a>
              </FieldDescription>
              <FieldDescription className="px-6 text-center">
                <a
                  href="/forgot-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot Password
                </a>
              </FieldDescription>
            </Field>
          </motion.div>
        </FieldGroup>
      </FieldGroup>
    </motion.form>
  );
};

export default LoginForm;
