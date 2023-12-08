import { Heading } from "@/fsd/shared/ui/Heading";
import { Button } from "@/fsd/shared/ui/button";
import { Trash } from "lucide-react";
import { FC, HTMLAttributes } from "react";

interface SettingsPageProps extends HTMLAttributes<HTMLDivElement> {}

const SettingsPage: FC<SettingsPageProps> = (props) => {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between border-b pb-3">
        <Heading title="Settings" description="Manage store preference" />
        <Button variant="destructive" size="icon">
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </main>
  );
};

export default SettingsPage;
