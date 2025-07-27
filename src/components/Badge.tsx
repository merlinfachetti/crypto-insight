import React from "react";

type Props = {
  label: string;
  type: "positive" | "negative";
};

const Badge: React.FC<Props> = ({ label, type }) => {
  const color =
    type === "positive"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded ${color}`}>
      {label}
    </span>
  );
};

export default Badge;
