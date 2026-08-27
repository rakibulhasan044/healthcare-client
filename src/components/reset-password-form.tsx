/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/services/auth/auth.service";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ResetPasswordForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(resetPassword, null);

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
      {redirect && <Input type="hidden" name="redirect" value={redirect} />}
      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* New Password */}
          <motion.div variants={itemVariants}>
            <Field>
              <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                autoComplete="new-password"
              />
              <InputFieldError field="newPassword" state={state as any} />
            </Field>
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={itemVariants}>
            <Field>
              <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
              <InputFieldError field="confirmPassword" state={state as any} />
            </Field>
          </motion.div>
        </div>

        <FieldGroup className="mt-4">
          <motion.div variants={itemVariants}>
            <Field>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Resetting..." : "Reset Password"}
              </Button>

              <FieldDescription className="px-6 text-center mt-4">
                Remember your password?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Back to Login
                </a>
              </FieldDescription>
            </Field>
          </motion.div>
        </FieldGroup>
      </FieldGroup>
    </motion.form>
  );
};

export default ResetPasswordForm;
