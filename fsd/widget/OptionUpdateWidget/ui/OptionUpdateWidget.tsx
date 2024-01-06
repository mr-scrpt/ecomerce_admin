"use client";
import { useStoreData } from "@/fsd/entity/Store";
import { OptionUpdate, useOptionUpdate } from "@/fsd/feature/OptionUpdate";
import { RoutePathEnum } from "@/fsd/shared/data/route.enum";
import { useRouter } from "next/navigation";
import { FC, HTMLAttributes, useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

interface OptionUpdateWidgetProps extends HTMLAttributes<HTMLDivElement> {
  storeSlug: string;
  optionSlug: string;
}

export const OptionUpdateWidget: FC<OptionUpdateWidgetProps> = (props) => {
  const { storeSlug, optionSlug } = props;

  const router = useRouter();
  const path = `/${storeSlug}${RoutePathEnum.OPTIONS}`;

  const { storeId } = useStoreData(
    useShallow((state) => ({ storeId: state.storeCurrent?.id })),
  );

  const { getOptionCurrent, resetOption, option, loading } = useOptionUpdate(
    useShallow((state) => ({
      option: state.option,
      getOptionCurrent: state.getOptionCurrent,
      loading: state.loading,
      resetOption: state.resetOption,
    })),
  );

  const onSucces = useCallback(() => {
    // revalidation option list
    // getOption(storeSlug);
    resetOption();
    router.push(path);
    router.refresh();
  }, [resetOption, path, router]);

  useEffect(() => {
    getOptionCurrent({ optionSlug, storeSlug });
  }, [getOptionCurrent, optionSlug, storeSlug]);

  return (
    <>
      {option && (
        <OptionUpdate onSuccess={onSucces} storeId={storeId} option={option} />
      )}
    </>
  );
};
