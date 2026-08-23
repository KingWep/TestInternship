import React from "react";
import { Link } from "react-router-dom";

const colorStyles = {
  green: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-l-emerald-400",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-600",
    border: "border-l-blue-400",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-600",
    border: "border-l-purple-400",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-l-amber-400",
  },
};

export default function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
  warning,
  note,
  link
}) {
  const style = colorStyles[color] || colorStyles.blue;
  const cardContent = (
    <>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </p>
        {Icon && (
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${style.bg}`}
          >
            <Icon size={18} className={style.text} />
          </div>
        )}
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>

      {trend !== undefined && trend !== null ? (
        <p
          className={`text-xs font-semibold flex items-center gap-1 ${
            Number(trend) >= 0 ? "text-emerald-600" : "text-red-500"
          }`}
        >
          <span>
            {Number(trend) >= 0 ? "+" : ""}
            {trend}%
          </span>
          <span className="text-slate-400 font-normal">vs last month</span>
        </p>
      ) : note ? (
        <p
          className={`text-xs ${warning ? "text-amber-600" : "text-slate-400"}`}
        >
          {note}
        </p>
      ) : null}
    </>
  );
  return link ? (
    <Link
      to={link}
      className={`block bg-white border border-slate-200 border-l-4 ${style.border} rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow`}
    >
      {cardContent}
    </Link>
  ) : (
    <div
      className={`bg-white border border-slate-200 border-l-4 ${style.border} rounded-2xl p-5`}
    >
      {cardContent}
    </div>
  );
}
