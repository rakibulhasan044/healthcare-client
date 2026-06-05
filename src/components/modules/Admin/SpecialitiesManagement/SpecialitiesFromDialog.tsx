"use client";

import InputFieldError from "@/components/shared/InputFieldError";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSpeciality } from "@/services/admin/specialitiesManagement";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

interface SpecialitiesFromDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SpecialitiesFromDialog = ({
  open,
  onClose,
  onSuccess,
}: SpecialitiesFromDialogProps) => {
  const [state, formAction, pending] = useActionState(createSpeciality, null);

  useEffect(() => {
    if (state && state?.success) {
      toast.success(state.message);
      onSuccess();
      onClose();
    } else if (state && !state.success) {
      toast.error(state.message);
    }
  }, [state, onSuccess, onClose]);
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <form action={formAction}>
        <DialogTrigger
          render={<Button variant="outline">Open Dialog</Button>}
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add new Speciality</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title </Label>
              <Input id="title" name="title" required />
              <InputFieldError field="title" state={state} />
            </Field>
            <Field>
              <Label htmlFor="file">Upload Icon (optional)</Label>
              <Input id="file" name="file" type="file" />
              <InputFieldError field="icon" state={state} />
            </Field>
          </FieldGroup>
          <div className="flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Speciality"}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SpecialitiesFromDialog;
