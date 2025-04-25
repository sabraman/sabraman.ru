"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "./switch";
import { Label } from "./label";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Only show theme toggle with proper state after client-side hydration
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handle theme toggle
    const handleToggle = (checked: boolean) => {
        setTheme(checked ? "dark" : "light");
    };

    if (!mounted) {
        return (
            <div className="flex items-center gap-2">
                <Label
                    htmlFor="theme-mode"
                    className="text-muted-foreground tracking-tight"
                >
                    <span className="text-muted-foreground">Theme</span>
                </Label>
                <div className="bg-foreground w-8 h-4 rounded-full" />
                <div className="h-2 w-2 rounded-full bg-input"></div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Label
                htmlFor="theme-mode"
                className="text-muted-foreground tracking-tight"
            >
                <span className={theme === "dark" ? "text-foreground" : "text-muted-foreground"}>
                    Theme: {theme}
                </span>
            </Label>
            <Switch
                id="theme-mode"
                checked={theme === "dark"}
                onCheckedChange={handleToggle}
                className="bg-foreground"
            />
            <div className={`h-2 w-2 rounded-full ${theme === "dark" ? "bg-accent" : "bg-input"}`}></div>
        </div>
    );
}