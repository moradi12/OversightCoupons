import React, { useEffect, useState } from "react";
import { Coupon } from "../../Models/Coupon";
import { Report } from "./Report";
import "./ReportsPage.css";

const ReportsPage: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [report, setReport] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    const storedCoupons = localStorage.getItem("coupons");
    if (storedCoupons) {
      const parsedCoupons: Coupon[] = JSON.parse(storedCoupons);
      setCoupons(parsedCoupons);
    }
  }, []);
  // Generate a summary report of all coupons
  const generateSummary = () => {
    if (coupons.length > 0) {
      const reportInstance = new Report(coupons);
      setReport(reportInstance.generateSummary());
    }
  };
  // Filter coupons within a specific date range
  const handleDateRangeFilter = () => {
    if (coupons.length > 0 && startDate && endDate) {
      const reportInstance = new Report(coupons);
      const filteredCoupons = reportInstance.getCouponsByDateRange(
        new Date(startDate),
        new Date(endDate)
      );
      setReport(`Coupons in Date Range:\n${JSON.stringify(filteredCoupons, null, 2)}`);
    }
  };
  // Get and display expired coupons
  const handleExpiredCoupons = () => {
    if (coupons.length > 0) {
      const reportInstance = new Report(coupons);
      const expiredCoupons = reportInstance.getExpiredCoupons();
      setReport(`Expired Coupons:\n${JSON.stringify(expiredCoupons, null, 2)}`);
    }
  };

  return (
    <div className="reports-container">
      <h2>Coupon Reports</h2>

      <button onClick={generateSummary}>Generate Summary</button>

      <div>
        <h4>Filter by Date Range</h4>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleDateRangeFilter}>Filter</button>
      </div>

      <div>
        <h4>Expired Coupons</h4>
        <button onClick={handleExpiredCoupons}>Show Expired Coupons</button>
      </div>

      <pre>{report}</pre>
    </div>
  );
};

export default ReportsPage;
