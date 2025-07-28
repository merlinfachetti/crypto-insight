export const loadTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  return (localStorage.getItem("theme") as "light" | "dark") || "dark";
};

export const saveTheme = (theme: "light" | "dark") => {
  if (typeof window !== "undefined") {
    localStorage.setItem("theme", theme);
  }
};
