import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon02Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved) {
            setTheme(saved);
            document.documentElement.classList.toggle("dark", saved === "dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <Button variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-black dark:text-white transition"
        >
            {theme !== "dark" ? <HugeiconsIcon icon={Sun01Icon} /> : <HugeiconsIcon icon={Moon02Icon} />}
        </Button>
    );
}