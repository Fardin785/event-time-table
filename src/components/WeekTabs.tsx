import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { formatLabel } from "../utility";

interface WeekTabsProps {
  selectedIndex: number;
  onChange: (index: number) => void;
  days: Date[];
}

export const WeekTabs: React.FC<WeekTabsProps> = ({ selectedIndex, onChange, days }) => {
  const basisPercent = `${100 / Math.max(days.length, 1)}%`;

  const minTabWidth = { xs: 120, sm: 140, md: 160 };

  return (
    <div className="border-b bg-white sticky top-0 z-30">
      <Tabs
        value={selectedIndex}
        onChange={(_, v) => onChange(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="Week Tabs"
        sx={{
          width: "100%",
          ".MuiTabs-scroller": {
            width: "100%",
          },
          ".MuiTabs-flexContainer": {
            minWidth: "100%",
          },
        }}
      >
        {days.map((d, idx) => {
          const { weekday, isoDate } = formatLabel(d);
          return (
            <Tab
              key={idx}
              disableRipple
              label={
                <Box sx={{ textAlign: "center", lineHeight: 1.25 }}>
                  <div className="text-sm font-semibold">{weekday}</div>
                  <div className="text-xs text-gray-600">Date: {isoDate}</div>
                </Box>
              }
              sx={{
                flex: `1 0 ${basisPercent}`,
                maxWidth: "unset",
                minWidth: minTabWidth,
                flexShrink: 0,
                px: { xs: 1.5, sm: 2 },
                py: 1,
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                },
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                },
              }}
            />
          );
        })}
      </Tabs>
    </div>
  );
};
