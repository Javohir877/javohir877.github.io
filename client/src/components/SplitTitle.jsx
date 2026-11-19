// Sarlavha so'zma-so'z pastdan ko'tariladi: ota element ".rv.in" bo'lganda (useReveal) ishga tushadi.
import { Fragment } from "react";

export default function SplitTitle({ as: Tag = "h2", text, className = "" }) {
  const words = String(text).split(" ");
  return (
    <Tag className={"sec-title split " + className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="w" style={{ "--i": i }}><span>{w}</span></span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}
