"use client";
import { FC, HTMLAttributes, memo, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { billboardAction } from "@/fsd/entity/Billboard";
import {
  BillboardForm,
  BillboardFormTypeSchema,
} from "@/fsd/entity/BillboardForm";
import { billboardCreateValidate } from "../../model/validation/billboardCreate.validation";
import {
  BillboardCreateModal,
  BillboardLoadImgModal,
} from "./BillboardLoadImgModal";
import { FILE_NAME_LENGTH_MIN } from "@/fsd/shared/type/global.const";

interface BillboardCreateProps extends HTMLAttributes<HTMLDivElement> {
  onSuccess?: () => void;
  storeId?: string;
}

export const BillboardCreate: FC<BillboardCreateProps> = memo((props) => {
  const { onSuccess, storeId } = props;
  const [loading, setLoading] = useState(false);
  const [imgListLoaded, setImgListLoaded] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onSubmit = useCallback(
    async (form: BillboardFormTypeSchema) => {
      try {
        setLoading(true);

        if (!storeId) {
          return toast.error("Store Not Found");
        }

        const validation = billboardCreateValidate(form);

        if (validation?.errors) {
          return toast.error("Incorrect data from the form");
        }

        const { name, imgUrl } = form;
        const { data, error } = await billboardAction.createBillboard({
          name,
          imgUrl,
          storeId,
        });
        if (error) {
          toast.error(error);
        }
        if (data) {
          toast.success(`Billboard has been created by name ${name}`);
          onSuccess?.();
        }
      } catch (e) {
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
    [storeId, onSuccess],
  );

  const defaultValues = { name: fileName, imgUrl: imgListLoaded };

  // const handleOpenButton = useCallback((name: string) => {
  //   setFileName(name);
  //   setIsModalOpen(true);
  // }, []);
  const onChangeName = useCallback((fileName: string) => {
    setFileName(fileName);
  }, []);

  console.log("output_log:  list img =>>>", imgListLoaded);
  return (
    <>
      <BillboardForm
        onAction={onSubmit}
        disabledUploadeMoadlButton={fileName.length < FILE_NAME_LENGTH_MIN}
        actionName="Create"
        defaultValues={defaultValues}
        loading={loading}
        imgListLoaded={imgListLoaded}
        onChangeName={onChangeName}
        handleOpenButton={setIsModalOpen.bind(null, true)}
      />
      {fileName}
      <BillboardLoadImgModal
        setImgListLoaded={setImgListLoaded}
        fileName={fileName}
        isModalOpen={isModalOpen}
        setCloseModal={setIsModalOpen.bind(null, false)}
      />
    </>
  );
});
