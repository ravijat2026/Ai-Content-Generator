"use client";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { ChevronDown, History } from "lucide-react";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq, desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export interface HISTORY {
    id: number;
    formData: string;
    aiResponse: string;
    templateSlug: string;
    createdBy: string;
    createdAt: string;
}

const ChartContainer = () => {
    const { user } = useUser();
    const [data, setData] = useState<{ name: string; words: number; templates: number }[]>([]);
    const [uniqueTemplatesCount, setUniqueTemplatesCount] = useState<number>(0);
    const [selectedWordsOption, setSelectedWordsOption] = useState<"totalWords" | "templatesUsed">("totalWords");
    const [selectedTimeOption, setSelectedTimeOption] = useState<"last7Days" | "lastMonth">("last7Days");

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;

            try {
                {/* @ts-ignore */}
                const result: HISTORY[] = await db
                    .select()
                    .from(AIOutput)
                    .where(eq(AIOutput.createdBy, user.primaryEmailAddress?.emailAddress || ''))  // Ensure a default value
                    .orderBy(desc(AIOutput.id));

                console.log("Fetched data:", result); // Debugging: Check fetched data

                // Determine the date range based on the selected time option
                const startDate = selectedTimeOption === "last7Days"
                    ? moment().subtract(6, "days")
                    : moment().subtract(29, "days");
                const endDate = moment();

                // Prepare the data for the selected time range
                const daysInRange = Array.from({ length: selectedTimeOption === "last7Days" ? 7 : 30 }, (_, index) => {
                    const day = startDate.clone().add(index, "days").format("MMM D"); // Example: "Jan 15"
                    return { name: day, words: 0, templates: 0 };
                });

                // Count words and unique templates per day
                const uniqueTemplates = new Set<string>(); // Track unique templates
                result.forEach((item) => {
                    if (!item.aiResponse) return; // Skip items with empty aiResponse

                    // Parse createdAt using the correct format (DD/MM/YYYY)
                    const createdAtMoment = moment(item.createdAt, "DD/MM/YYYY");
                    if (!createdAtMoment.isValid() || !createdAtMoment.isBetween(startDate, endDate, "day", "[]")) {
                        return; // Skip items outside the selected time range
                    }

                    const day = createdAtMoment.format("MMM D"); // Format the date
                    const index = daysInRange.findIndex((d) => d.name === day);
                    if (index !== -1) {
                        // Split the aiResponse by spaces to count words
                        const wordCount = item.aiResponse.split(/\s+/).filter(Boolean).length;
                        daysInRange[index].words += wordCount;

                        // Add templateSlug to unique templates set
                        if (item.templateSlug) {
                            uniqueTemplates.add(item.templateSlug);
                            daysInRange[index].templates += 1; // Increment template count for the day
                        }
                    }
                });

                console.log("Final data for chart:", daysInRange); // Debugging: Check final data
                console.log("Unique templates used:", uniqueTemplates.size); // Debugging: Check unique templates count

                setData(daysInRange);
                setUniqueTemplatesCount(uniqueTemplates.size); // Store the count of unique templates
            } catch (error) {
                console.error("Error fetching history data:", error);
            }
        };

        fetchData();
    }, [user, selectedTimeOption]);

    return (
        <div className="p-5 flex gap-3 flex-col rounded-md">
            <ChartHeader
                totalWords={data.reduce((sum, item) => sum + item.words, 0)}
                uniqueTemplatesCount={uniqueTemplatesCount}
                selectedWordsOption={selectedWordsOption}
                setSelectedWordsOption={setSelectedWordsOption}
                selectedTimeOption={selectedTimeOption}
                setSelectedTimeOption={setSelectedTimeOption}
            />
            <TheChart
                data={data}
                selectedWordsOption={selectedWordsOption}
            />
        </div>
    );
};

function ChartHeader({
    totalWords,
    uniqueTemplatesCount,
    selectedWordsOption,
    setSelectedWordsOption,
    selectedTimeOption,
    setSelectedTimeOption,
}: {
    totalWords: number;
    uniqueTemplatesCount: number;
    selectedWordsOption: "totalWords" | "templatesUsed";
    setSelectedWordsOption: (option: "totalWords" | "templatesUsed") => void;
    selectedTimeOption: "last7Days" | "lastMonth";
    setSelectedTimeOption: (option: "last7Days" | "lastMonth") => void;
}) {
    const [showWordsDropdown, setShowWordsDropdown] = useState<boolean>(false);
    const [showTimeDropdown, setShowTimeDropdown] = useState<boolean>(false);

    return (
        <div className="flex justify-between items-center">
            {/* Total Words Generated Dropdown */}
            <div className="flex gap-2 items-center">
                <div className="bg-purple-100 rounded-md p-[8px] flex items-center justify-center">
                    <History className="text-[18px] text-purple-600" />
                </div>

                <div className="flex flex-col">
                    <div className="flex gap-1 items-center relative">
                        <span
                            className="text-[13px] text-slate-500 cursor-pointer max-sm:text-sm"
                            onClick={() => setShowWordsDropdown(!showWordsDropdown)}
                        >
                            {selectedWordsOption === "totalWords"
                                ? "Total Words Generated"
                                : "Templates Used"}
                        </span>
                        <ChevronDown
                            className="text-[17px] text-slate-500 cursor-pointer"
                            onClick={() => setShowWordsDropdown(!showWordsDropdown)}
                        />
                        {/* Dropdown Menu */}
                        {showWordsDropdown && (
                            <div className="absolute bg-white shadow-md rounded-md mt-2 top-6 left-0 z-10">
                                <div
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedWordsOption("totalWords");
                                        setShowWordsDropdown(false);
                                    }}
                                >
                                    Total Words Generated
                                </div>
                                <div
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setSelectedWordsOption("templatesUsed");
                                        setShowWordsDropdown(false);
                                    }}
                                >
                                    Templates Used
                                </div>
                            </div>
                        )}
                    </div>
                    <span className="text-[16px] font-semibold cursor-pointer max-sm:text-sm">
                        {selectedWordsOption === "totalWords"
                            ? `${totalWords} Words`
                            : `${uniqueTemplatesCount} Templates`}
                    </span>
                </div>
            </div>

            {/* Last 7 Days Dropdown */}
            <div className="flex gap-1 items-center relative">
                <span
                    className="text-[13px] text-slate-500 cursor-pointer max-sm:text-sm"
                    onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                >
                    {selectedTimeOption === "last7Days" ? "Last 7 Days" : "Last Month"}
                </span>
                <ChevronDown
                    className="text-[17px] text-slate-500 cursor-pointer"
                    onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                />
                {/* Dropdown Menu */}
                {showTimeDropdown && (
                    <div className="absolute bg-white shadow-md rounded-md mt-2 top-6 right-0 z-10">
                        <div
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setSelectedTimeOption("last7Days");
                                setShowTimeDropdown(false);
                            }}
                        >
                            Last 7 Days
                        </div>
                        <div
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setSelectedTimeOption("lastMonth");
                                setShowTimeDropdown(false);
                            }}
                        >
                            Last Month
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function TheChart({ data, selectedWordsOption }: { data: { name: string; words: number; templates: number }[]; selectedWordsOption: "totalWords" | "templatesUsed" }) {
    return (
        <div>
            <ResponsiveContainer width="100%" height={176}>
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeOpacity={0} strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey={selectedWordsOption === "totalWords" ? "words" : "templates"}
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#colorWords)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ChartContainer;