"use client";
import type { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
import React from "react";

import type { GetLpAnalyticsResponse } from "@/types/fundio/analytics.types";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const YieldAccrualChart: React.FC<{ data: GetLpAnalyticsResponse | undefined }> = ({ data }) => {
    const MONTH_NAMES = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const series: ApexAxisChartSeries = [
        {
            name: "Yield Accrual",
            data: data?.monthly_analytics?.map(item => Number(item.total_yield)) || [],
            color: "#FF6B35",
        },
    ];

    const options: ApexOptions = {
        chart: {
            type: "line",
            height: 300,
            background: "transparent",
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        stroke: {
            curve: "smooth",
            width: 3,
            colors: ["url(#gradient)"],
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#2E865F"], // Green color
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.8,
                colorStops: [
                    {
                        offset: 0,
                        color: "#FF6B35", // Tangerine color
                        opacity: 0.8,
                    },
                    {
                        offset: 100,
                        color: "#2E865F", // Green color
                        opacity: 0.8,
                    },
                ],
            },
        },
        grid: {
            show: true,
            borderColor: "#E5E7EB",
            strokeDashArray: 0,
            position: "back",
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        xaxis: {
            categories: data?.monthly_analytics?.map(item => MONTH_NAMES[item.month - 1]),
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#5A6C7D",
                    fontSize: "12px",
                    fontFamily: "inherit",
                },
            },
        },
        yaxis: {
            min: 0,
            tickAmount: 5,
            labels: {
                style: {
                    colors: "#5A6C7D",
                    fontSize: "12px",
                    fontFamily: "inherit",
                },
                formatter: (value: number) => `${value}%`,
            },
        },
        tooltip: {
            enabled: true,
            theme: "light",
            style: {
                fontSize: "12px",
                fontFamily: "inherit",
            },
            y: {
                formatter: (value: number) => `${value}%`,
            },
        },
        legend: {
            show: false,
        },
        markers: {
            size: 0,
            hover: {
                size: 6,
                sizeOffset: 3,
            },
        },
    };

    return (
        <div>
            <Chart
                options={options}
                series={series}
                type="line"
                height={270}
            />
        </div>
    );
};

export default YieldAccrualChart;
