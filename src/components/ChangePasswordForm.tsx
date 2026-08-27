"use client";

import { changePassword } from "@/services/auth/auth.service";
import { useActionState, useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { Field } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const ChangePasswordForm = () => {
  const [state, formAction, isPending] = useActionState(changePassword, null);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {state?.success && (
        <Alert className="border-green-500 bg-green-50 text-green-900">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      {state?.success === false && (
        <Alert variant={"destructive"}>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <motion.div variants={itemVariants}>
        <Field>
          <Label htmlFor="oldPassword">Current Password</Label>
          <div className="relative">
            <Input
              id="oldPassword"
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your old password"
              defaultValue={state?.formData?.oldPassword || ""}
              required
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground h-auto p-1"
              tabIndex={-1}
            >
              {showOldPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Field>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Field>
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              defaultValue={state?.formData?.newPassword || ""}
              required
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground h-auto p-1"
              tabIndex={-1}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {state?.errors?.find((e) => e.field === "newPassword") && (
            <p className="text-sm text-red-500">
              {state.errors.find((e) => e.field === "newPassword")?.message}
            </p>
          )}
        </Field>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Field>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              defaultValue={state?.formData?.confirmPassword || ""}
              required
              disabled={isPending}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground h-auto p-1"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {state?.errors?.find((e) => e.field === "confirmPassword") && (
            <p className="text-sm text-red-500">
              {state.errors.find((e) => e.field === "confirmPassword")?.message}
            </p>
          )}
        </Field>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Changing Password...
            </>
          ) : (
            "Change Password"
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default ChangePasswordForm;
