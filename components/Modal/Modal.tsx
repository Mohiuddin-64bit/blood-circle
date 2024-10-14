"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React from "react";
import RegisterForm from "../form/RegisterForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal = ({ profile, open, setOpen }: any) => {
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">
            Update Profile Information
          </DialogTitle>
          <DialogDescription>
            <RegisterForm setOpen={setOpen} type="update" profile={profile} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
