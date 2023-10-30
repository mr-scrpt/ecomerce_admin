import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

const MainPage = () => {
  return (
    <div className="p-4">
      <ThemeSwitcher />
      <Button>Click Me</Button>
    </div>
  );
};

export default MainPage;
