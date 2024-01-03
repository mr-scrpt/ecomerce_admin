"use client";
import { useStoreData } from "@/fsd/entity/Store";
import { SizeCreate } from "@/fsd/feature/SizeCreate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

interface SizeCreateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const SizeCreateWidget: FC<SizeCreateWidgetProps> = (props) => {
  const { slug } = props;

  const router = useRouter();
  const path = `/${slug}${RoutePathEnum.SIZES}`;

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const onSucces = useCallback(() => {
    router.replace(path);
    router.refresh();
  }, []);

  return <SizeCreate onSuccess={onSucces} storeId={storeId} />;
};
