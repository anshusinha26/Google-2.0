"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({ totalResults }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const term = searchParams.get("term");
    const page = parseInt(searchParams.get("page") || "1");
    const RESULTS_PER_PAGE = 10;

    const totalPages = Math.ceil(parseInt(totalResults) / RESULTS_PER_PAGE);
    const showPages = Math.min(5, totalPages); // Show max 5 page numbers

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;

        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        router.push(`/search?${params.toString()}`);
    };

    // Calculate page numbers to show
    let pageNumbers = [];
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(startPage + showPages - 1, totalPages);

    if (endPage - startPage + 1 < showPages) {
        startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex items-center justify-center space-x-3 py-8">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className={`flex items-center px-3 py-1 rounded-lg ${
                    page <= 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-100"
                }`}
            >
                <ChevronLeftIcon className="h-5 w-5" />
                Previous
            </button>

            {startPage > 1 && (
                <>
                    <button
                        onClick={() => handlePageChange(1)}
                        className="px-3 py-1 rounded-lg hover:bg-blue-100"
                    >
                        1
                    </button>
                    {startPage > 2 && <span className="px-2">...</span>}
                </>
            )}

            {pageNumbers.map((num) => (
                <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`px-3 py-1 rounded-lg ${
                        page === num
                            ? "bg-blue-600 text-white"
                            : "hover:bg-blue-100"
                    }`}
                >
                    {num}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <span className="px-2">...</span>
                    )}
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className="px-3 py-1 rounded-lg hover:bg-blue-100"
                    >
                        {totalPages}
                    </button>
                </>
            )}

            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className={`flex items-center px-3 py-1 rounded-lg ${
                    page >= totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-600 hover:bg-blue-100"
                }`}
            >
                Next
                <ChevronRightIcon className="h-5 w-5" />
            </button>
        </div>
    );
}
