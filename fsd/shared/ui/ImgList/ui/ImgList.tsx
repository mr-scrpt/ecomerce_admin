import { FC, HTMLAttributes } from "react";
import Image from "next/image";
import { Button } from "../../button";
import { X } from "lucide-react";
import { cn } from "@/fsd/shared/lib/utils";

interface ImgListProps extends HTMLAttributes<HTMLDivElement> {
  loadedImgList: string[];
  onClick?: () => void;
  onDelete: (item: string) => void;
  maxShow?: number;
  className?: string;
}

const MAX_ITEM_SHOW_DEFAULT = 5;

export const ImgList: FC<ImgListProps> = (props) => {
  const {
    loadedImgList,
    maxShow = MAX_ITEM_SHOW_DEFAULT,
    className,
    onDelete,
  } = props;
  return (
    <div className={cn("text-sm flex flex-col p-2", className)}>
      {loadedImgList.length > 0 && (
        <ul className="flex gap-2 flex-wrap w-full items-center justify-center">
          {loadedImgList.slice(0, maxShow).map((item) => (
            <li className="p-2 relative max-w-[280px] truncate ..." key={item}>
              <Image src={item} alt="temp img" width={150} height={150} />
              <Button
                variant="destructive"
                className="absolute top-0 right-0"
                type="button"
                size="xs"
                onClick={onDelete.bind(null, item)}
              >
                <X className="w-3 h-3" />
              </Button>
            </li>
          ))}
          <div className="w-full text-center">
            {loadedImgList.length > maxShow && <div>...more item hidde</div>}
          </div>
          <div className="w-full text-right">
            Total loaded: {loadedImgList.length}
          </div>
        </ul>
      )}
    </div>
  );
};
