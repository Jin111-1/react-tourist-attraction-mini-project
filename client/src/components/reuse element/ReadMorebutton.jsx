import { useState } from "react";

const ReadMore = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // ถ้าข้อความสั้นกว่าค่าที่กำหนด ให้แสดงทั้งหมดเลย
  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  return (
    <p>
      {isExpanded ? text : text.slice(0, maxLength) + "... "}
      <button onClick={() => setIsExpanded(!isExpanded)} className="font-semibold text-blue-600 cursor-pointer" >
        {isExpanded ? "อ่านน้อยลง" : "อ่านเพิ่มเติม"}
      </button>
    </p>
  );
};
export default ReadMore 

