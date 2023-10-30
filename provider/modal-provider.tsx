"use client";
import { StoreModalCreate } from "@/components/modal/store-modal-create";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMoundted] = useState(false);

  useEffect(() => {
    setIsMoundted(true);
  }, []);

  if (!isMounted) return null;

  return <StoreModalCreate />;
};
