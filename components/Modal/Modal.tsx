"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import RegisterForm from "../form/RegisterForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal = () => {

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">
            Update Profile Information
          </DialogTitle>
          <DialogDescription>
            <RegisterForm type="update" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
