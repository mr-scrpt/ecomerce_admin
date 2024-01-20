import { FileUploader } from "@/fsd/entity/FileManager";
import { PathUploadEnum } from "@/fsd/shared/data/pathUpload.enum";
import { Modal } from "@/fsd/shared/ui/modal";
import { FC, HTMLAttributes, useCallback } from "react";

interface BillboardCreateModalProps extends HTMLAttributes<HTMLDivElement> {
  setImgListLoaded: (list: string[]) => void;
  isModalOpen: boolean;
  setCloseModal: () => void;

  fileName: string;
}

export const BillboardLoadImgModal: FC<BillboardCreateModalProps> = (props) => {
  const { setImgListLoaded, setCloseModal, isModalOpen, fileName } = props;
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={setCloseModal}
      title="Add billboar image"
      description=""
    >
      <FileUploader
        nameToFile={fileName}
        setFileLoaded={setImgListLoaded}
        onClickSendButton={setCloseModal}
        entity={PathUploadEnum.BILLBOARD}
      />
    </Modal>
  );
};
