import { useStoreData } from "@/fsd/entity/Store";
import { FC, HTMLAttributes, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { CategoryRemove } from "./CategoryRemove";
import { useRouter } from "next/navigation";
import { useCategoryList, useCategoryRemove } from "@/fsd/entity/Category";

interface CategoryRemoveModalProps extends HTMLAttributes<HTMLDivElement> {
  onClose: () => void;
}

export const CategoryRemoveModal: FC<CategoryRemoveModalProps> = (props) => {
  const { onClose } = props;
  const router = useRouter();

  const { categoryId, resetId } = useCategoryRemove(
    useShallow((state) => ({
      categoryId: state.categoryId,
      resetId: state.resetId,
    })),
  );

  const { getCategory } = useCategoryList(
    useShallow((state) => ({
      getCategory: state.fetchCategoryList,
    })),
  );
  const { slug } = useStoreData(
    useShallow((state) => ({ slug: state.storeCurrent?.slug })),
  );

  const onSuccess = useCallback(() => {
    resetId();
    onClose();
    router.refresh();
    getCategory(slug!);
  }, [resetId, onClose, router, getCategory, slug]);

  return (
    <CategoryRemove
      onSuccess={onSuccess}
      onCancel={onClose}
      categoryId={categoryId}
    />
  );
};
