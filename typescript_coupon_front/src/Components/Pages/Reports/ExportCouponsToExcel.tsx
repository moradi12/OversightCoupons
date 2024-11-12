import { saveAs } from "file-saver";
import React from "react";
import * as XLSX from "xlsx";
import { Coupon } from "../../Models/Coupon";


const ExportCouponsToExcel: React.FC<{ coupons: Coupon[] }> = ({ coupons }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(coupons);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Coupons");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Coupons.xlsx");
  };

  return (
    <div>
      <button onClick={exportToExcel} className="bg-blue-500 text-white px-4 py-2 rounded">
        Export to XLSX </button>
    </div>
  );
};

export default ExportCouponsToExcel;
