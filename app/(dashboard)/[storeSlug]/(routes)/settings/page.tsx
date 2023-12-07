import { Headding } from "@/fsd/shared/ui/Headding/ui/Headding";
import { Paragraph } from "@/fsd/shared/ui/Paragraph/ui/Paragraph";
import { Title } from "@/fsd/shared/ui/Title/ui/Title";
import { Button } from "@/fsd/shared/ui/button";
import { Trash } from "lucide-react";
import { FC, HTMLAttributes } from "react";

interface SettingsPageProps extends HTMLAttributes<HTMLDivElement> {}

const SettingsPage: FC<SettingsPageProps> = (props) => {
  return (
    <main className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <Headding title="Settings" description="Manage store preference" />
        <Button variant="destructive" size="icon">
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </main>
  );
};

export default SettingsPage;
