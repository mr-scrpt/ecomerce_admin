"use client";
import { useStoreData } from "@/fsd/entity/Store";
import { StoreSettings } from "@/fsd/feature/StoreSettings";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

interface StoreSettingsWidgetProps extends HTMLAttributes<HTMLDivElement> {}

export const StoreSettingsWidget: FC<StoreSettingsWidgetProps> = () => {
  const { storeCurrent, isLoading } = useStoreData(
    useShallow((state) => ({
      storeCurrent: state.storeCurrent,
      isLoading: state.loading,
    })),
  );

  const router = useRouter();
  const onSuccess = useCallback(
    (slug: string) => {
      router.replace(`/${slug}${RoutePathEnum.SETTINGS}`);
    },
    [router],
  );
  return (
    <StoreSettings
      storeName={storeCurrent?.name}
      loading={isLoading}
      onSuccess={onSuccess}
    />
  );
};
