"use client";
import { useStoreData } from "@/fsd/entity/Store";
import { ColorCreate } from "@/fsd/feature/ColorCreate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

interface ColorCreateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const ColorCreateWidget: FC<ColorCreateWidgetProps> = (props) => {
  const { slug } = props;

  const router = useRouter();
  const path = `/${slug}${RoutePathEnum.COLORS}`;

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const onSucces = useCallback(() => {
    router.replace(path);
    router.refresh();
  }, []);

  return <ColorCreate onSuccess={onSucces} storeId={storeId} />;
};
