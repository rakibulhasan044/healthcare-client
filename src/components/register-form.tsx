"use client";

import { registerPatient } from "@/services/auth/registerPatient";
import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { motion } from "framer-motion";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerPatient, null);

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
      <FieldGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <motion.div variants={itemVariants}>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" name="name" type="text" placeholder="John Doe" />
              <InputFieldError field="name" state={state} />
            </Field>
          </motion.div>
          {/* Address */}
          <motion.div variants={itemVariants}>
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St"
              />
              <InputFieldError field="address" state={state} />
            </Field>
          </motion.div>
          {/* Email */}
          <motion.div variants={itemVariants}>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
              <InputFieldError field="email" state={state} />
            </Field>
          </motion.div>
          {/* Contact Number */}
          <motion.div variants={itemVariants}>
            <Field>
              <FieldLabel htmlFor="contactNumber">Contact Number</FieldLabel>
              <Input
                id="contactNumber"
                name="contactNumber"
                type="text"
                placeholder="0123456789"
              />
              <InputFieldError field="contactNumber" state={state} />
            </Field>
          </motion.div>
          {/* Password */}
          <motion.div variants={itemVariants}>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" />
              <InputFieldError field="password" state={state} />
            </Field>
          </motion.div>
          {/* Confirm Password */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              <InputFieldError field="confirmPassword" state={state} />
            </Field>
          </motion.div>
        </div>
        <FieldGroup className="mt-4">
          <motion.div variants={itemVariants}>
            <Field>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating Account..." : "Create Account"}
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </motion.div>
        </FieldGroup>
      </FieldGroup>
    </motion.form>
  );
};

export default RegisterForm;
