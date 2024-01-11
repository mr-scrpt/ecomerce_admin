"use client";
import { useBillboardList } from "@/fsd/entity/Billboard";
import { useOptionListStore } from "@/fsd/entity/Option";
import { useStoreData } from "@/fsd/entity/Store";
import { CategoryCreate } from "@/fsd/feature/CategoryCreate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, memo, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface CategoryCreateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  slug: string;
}

export const CategoryCreateWidget: FC<CategoryCreateWidgetProps> = memo(
  (props) => {
    const { slug } = props;

    const router = useRouter();
    const path = `/${slug}${RoutePathEnum.CATEGORIES}`;

    const { billboardList, fetchBillboardList } = useBillboardList(
      useShallow((state) => ({
        billboardList: state.billboardList,
        fetchBillboardList: state.fetchBillboardList,
      })),
    );

    const { optionList, fetchOptionList } = useOptionListStore(
      useShallow((state) => ({
        optionList: state.optionList,
        fetchOptionList: state.fetchOptionListByStoreId,
      })),
    );

    const { storeId } = useStoreData(
      useShallow((state) => ({ storeId: state.storeCurrent?.id })),
    );

    // useEffect(() => {
    //   if (slug) {
    //     fetchBillboardList(slug);
    //   }
    // }, [slug, fetchBillboardList]);
    useEffect(() => {
      if (storeId) {
        fetchBillboardList(storeId);
      }
    }, [storeId, fetchBillboardList]);

    useEffect(() => {
      if (storeId) {
        fetchOptionList(storeId);
      }
    }, [storeId, fetchOptionList]);

    const onSucces = useCallback(() => {
      router.replace(path);
      router.refresh();
    }, [router, path]);

    return (
      <CategoryCreate
        onSuccess={onSucces}
        storeId={storeId}
        billboardList={billboardList}
        optionList={optionList}
      />
    );
  },
);
