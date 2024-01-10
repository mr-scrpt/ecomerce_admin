import { useStoreData } from "@/fsd/entity/Store";
import { FC, HTMLAttributes, memo, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { OptionRemove } from "./OptionRemove";
import { useRouter } from "next/navigation";
import { useOptionList, useOptionRemove } from "@/fsd/entity/Option";

interface OptionRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const OptionRemoveModal: FC<OptionRemoveModalProps> = memo((props) => {
  const { onClose } = props;
  const router = useRouter();

  const { optionId, resetId } = useOptionRemove(
    useShallow((state) => ({
      optionId: state.optionId,
      resetId: state.resetId,
    })),
  );

  const { getOption } = useOptionList(
    useShallow((state) => ({
      getOption: state.fetchOptionList,
    })),
  );

  const { slug } = useStoreData(
    useShallow((state) => ({ slug: state.storeCurrent?.slug })),
  );

  const onSuccess = useCallback(() => {
    resetId();
    onClose();
    router.refresh();
    getOption(slug!);
  }, [resetId, onClose, router, getOption, slug]);

  return (
    <OptionRemove
      onSuccess={onSuccess}
      onCancel={onClose}
      optionId={optionId}
    />
  );
});
