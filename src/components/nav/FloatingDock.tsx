import { FloatingDock } from "@/components/ui/floating-dock";
import type { DockItem } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBriefcase,
  IconUser,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Nav() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  const items: DockItem[] = [
    {
      title: "Home",
      icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/",
    },
    {
      title: "Projects",
      icon: <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/#projects",
    },
    {
      title: "About",
      icon: <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "/about",
    },
    {
      title: isDark ? "Switch to light mode" : "Switch to dark mode",
      icon: isDark ? (
        <IconSun className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ) : (
        <IconMoon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
      onClick: () => toggleTheme(),
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <FloatingDock items={items} />
    </div>
  );
}
