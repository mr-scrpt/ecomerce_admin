"use client";
import { useStoreData } from "@/fsd/entity/Store";
import { OptionCreate } from "@/fsd/feature/OptionCreate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

interface OptionCreateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const OptionCreateWidget: FC<OptionCreateWidgetProps> = (props) => {
  const { slug } = props;

  const router = useRouter();
  const path = `/${slug}${RoutePathEnum.OPTIONS}`;

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const onSucces = useCallback(() => {
    router.replace(path);
    router.refresh();
  }, []);

  return <OptionCreate onSuccess={onSucces} storeId={storeId} />;
};
