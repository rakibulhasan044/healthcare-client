/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const getFieldError = (fieldName: string) => {
    if (state && state.errors) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message;
    } else {
      return null;
    }
  };

  useEffect(()=>{
    if(state && !state.success && state.message){
      toast.error(state.message)
    }
  },[state])

  return (
    <form action={formAction}>
      {redirect && (
        <input className="hidden" name="redirect" defaultValue={redirect} />
      )}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            required
          />
          {getFieldError("email") && (
            <FieldDescription className="text-red-600">
              {getFieldError("email")}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" required />
          {getFieldError("password") && (
            <FieldDescription className="text-red-600">
              {getFieldError("password")}
            </FieldDescription>
          )}
        </Field>
        <FieldGroup className="mt-4">
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
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
