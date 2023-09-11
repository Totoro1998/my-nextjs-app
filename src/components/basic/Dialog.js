import styles from "./Dialog.module.scss";
import { Transition } from "@headlessui/react";
import { useEffect, useState, Fragment } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export default function MyDialog({
  open,
  onOpenChange,
  footer,
  title,
  children,
}) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function handleCloseDialog() {
    setIsOpen(false);
    onOpenChange(false);
  }
  return createPortal(
    <Transition show={isOpen} as={Fragment}>
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen hidden-scrollbar">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0">
              <div
                className={cn("absolute inset-0", styles["modal-overlay"])}
                onClick={handleCloseDialog}
              ></div>
            </div>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className={styles["modal"]}>
              {title}
              {children}
              {footer}
            </div>
          </Transition.Child>
        </div>
      </div>
    </Transition>,
    document.body
  );
}
