import { useState } from "react";

const ReadMore = ({ text, maxLength = 100, link }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  return (
    <p>
      {isExpanded ? text : text.slice(0, maxLength) + "... "}
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600">
          อ่านเพิ่มเติม
        </a>
      ) : (
        <button onClick={() => setIsExpanded(!isExpanded)} className="font-semibold text-blue-600">
          {isExpanded ? "อ่านน้อยลง" : "อ่านเพิ่มเติม"}
        </button>
      )}
    </p>
  );
};

export default ReadMore;
