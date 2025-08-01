// import Header from "../components/header";
// import Pagination from "../components/pagination";
// import { fetchSearchResults, fallbackSearch } from "../utils/search";

// export const metadata = {
//     title: "Search Results",
//     icons: {
//         icon: "/favicon.ico",
//     },
// };

// export default async function Search({ searchParams }) {
//     const searchTerm = searchParams.term;
//     const page = parseInt(searchParams.page || "1");
//     const startIndex = (page - 1) * 10 + 1;

//     let results;
//     let isUsingFallback = false;
//     let error = null;

//     if (!searchTerm) {
//         return (
//             <div>
//                 <Header />
//                 <div className="text-center pt-10">
//                     <p>Please enter a search term</p>
//                 </div>
//             </div>
//         );
//     }

//     try {
//         results = await fetchSearchResults(searchTerm, startIndex);
//     } catch (e) {
//         error = e;
//         if (e.message === "Daily search quota exceeded") {
//             const fallbackResults = await fallbackSearch(searchTerm, page);
//             if (fallbackResults) {
//                 results = fallbackResults;
//                 isUsingFallback = true;
//             }
//         }
//     }

//     return (
//         <div>
//             <Header />

//             {isUsingFallback && (
//                 <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
//                     <p className="text-yellow-700">
//                         Using alternative search results due to high traffic.
//                         Results provided by Wikipedia.
//                     </p>
//                 </div>
//             )}

//             {error && !isUsingFallback && (
//                 <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
//                     <p className="text-red-700">
//                         Sorry, there was an error processing your search. Please
//                         try again later.
//                     </p>
//                 </div>
//             )}

//             {/* Search Information */}
//             {results?.searchInformation && (
//                 <div className="text-gray-600 text-sm mb-5 ml-[5%] md:ml-[14%] lg:ml-52">
//                     About {results.searchInformation.totalResults} results (
//                     {results.searchInformation.searchTime} seconds)
//                 </div>
//             )}

//             <div className="mx-auto w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52">
//                 {results?.items?.map((result, index) => (
//                     <div key={index} className="max-w-xl mb-8">
//                         <div className="group">
//                             <a href={result.link} className="text-sm truncate">
//                                 {result.formattedUrl}
//                             </a>
//                             <a href={result.link}>
//                                 <h2 className="truncate text-xl text-blue-800 font-medium group-hover:underline">
//                                     {result.title}
//                                 </h2>
//                             </a>
//                         </div>
//                         <p
//                             className="line-clamp-2"
//                             dangerouslySetInnerHTML={{ __html: result.snippet }}
//                         ></p>
//                     </div>
//                 ))}

//                 {/* Pagination */}
//                 {results?.searchInformation?.totalResults && (
//                     <Pagination
//                         totalResults={results.searchInformation.totalResults}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }

////////////////////////////////////////////////////////////////

// import Header from "../components/header";
// import Pagination from "../components/pagination";
// import {
//     fetchSearchResults,
//     fallbackSearch,
//     processResultsWithGemini,
// } from "../utils/search";

// export const metadata = {
//     title: "Search Results",
//     icons: {
//         icon: "/favicon.ico",
//     },
// };

// export default async function Search({ searchParams }) {
//     const searchTerm = searchParams.term;
//     const page = parseInt(searchParams.page || "1");
//     const startIndex = (page - 1) * 10 + 1;

//     let results;
//     let isUsingFallback = false;
//     let error = null;
//     let geminiSummary = null;

//     if (!searchTerm) {
//         return (
//             <div>
//                 <Header />
//                 <div className="text-center pt-10">
//                     <p>Please enter a search term</p>
//                 </div>
//             </div>
//         );
//     }

//     try {
//         // Fetching Google search results
//         results = await fetchSearchResults(searchTerm, startIndex);
//         // Processing results with Gemini for additional insights
//         geminiSummary = await processResultsWithGemini(
//             searchTerm,
//             results.items
//         );
//     } catch (e) {
//         error = e;
//         if (e.message === "Daily search quota exceeded") {
//             // Fallback to Wikipedia search if Google quota exceeded
//             const fallbackResults = await fallbackSearch(searchTerm, page);
//             if (fallbackResults) {
//                 results = fallbackResults;
//                 isUsingFallback = true;
//                 // Process Wikipedia fallback results with Gemini
//                 geminiSummary = await processResultsWithGemini(
//                     searchTerm,
//                     results.items
//                 );
//             }
//         }
//     }

//     return (
//         <div>
//             <Header />

//             {/* Fallback message */}
//             {isUsingFallback && (
//                 <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
//                     <p className="text-yellow-700">
//                         Using alternative search results due to high traffic.
//                         Results provided by Wikipedia.
//                     </p>
//                 </div>
//             )}

//             {/* Error message */}
//             {error && !isUsingFallback && (
//                 <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
//                     <p className="text-red-700">
//                         Sorry, there was an error processing your search. Please
//                         try again later.
//                     </p>
//                 </div>
//             )}

//             {/* Search Information */}
//             {results?.searchInformation && (
//                 <div className="text-gray-600 text-sm mb-5 ml-[5%] md:ml-[14%] lg:ml-52">
//                     About {results.searchInformation.totalResults} results (
//                     {results.searchInformation.searchTime} seconds)
//                 </div>
//             )}

//             {/* Display Results */}
//             <div className="mx-auto w-full px-3 sm:pl-[5%] md:pl-[14%] lg:pl-52">
//                 {results?.items?.map((result, index) => (
//                     <div key={index} className="max-w-xl mb-8">
//                         <div className="group">
//                             <a href={result.link} className="text-sm truncate">
//                                 {result.formattedUrl}
//                             </a>
//                             <a href={result.link}>
//                                 <h2 className="truncate text-xl text-blue-800 font-medium group-hover:underline">
//                                     {result.title}
//                                 </h2>
//                             </a>
//                         </div>
//                         <p
//                             className="line-clamp-2"
//                             dangerouslySetInnerHTML={{ __html: result.snippet }}
//                         ></p>
//                     </div>
//                 ))}

//                 {/* Gemini Insights */}
//                 {geminiSummary && (
//                     <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500">
//                         <h3 className="text-blue-800 text-lg font-semibold">
//                             Gemini Insights:
//                         </h3>
//                         <p>{geminiSummary}</p>
//                     </div>
//                 )}

//                 {/* Pagination */}
//                 {results?.searchInformation?.totalResults && (
//                     <Pagination
//                         totalResults={results.searchInformation.totalResults}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }

////////////////////////////////////////////////////////////////

import Image from "next/image";
import Header from "../components/header";
import Pagination from "../components/pagination";
import {
    fetchSearchResults,
    fallbackSearch,
    processResultsWithGemini,
} from "../utils/search";

export const metadata = {
    title: "Search Results",
    icons: {
        icon: "/favicon.ico",
    },
};

export default async function Search({ searchParams }) {
    const searchTerm = searchParams.term;

    if (!searchTerm) {
        return (
            <div>
                <Header />
                <div className="text-center pt-10">
                    <p>Please enter a search term</p>
                </div>
            </div>
        );
    }

    const googleResults = await fetchSearchResults(searchTerm);
    const geminiSummary = await processResultsWithGemini(
        searchTerm,
        googleResults.items
    );

    // Helper function to parse the results and render clickable links with serial numbers
    const parseResultsToHTML = (results) => {
        if (!results) return null;

        const lines = results.split("\n");
        return lines.map((line, index) => {
            const match = line.match(/\d+\.\s+\[(.+?)\]\((.+?)\)/);
            if (match) {
                const [, title, url] = match;
                return (
                    <div key={index} className="py-2">
                        <span>{index + 1}. </span>{" "}
                        {/* Serial number starts from 1 */}
                        <a
                            href={url}
                            className="text-blue-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {title}
                        </a>
                    </div>
                );
            }
            return null;
        });
    };

    return (
        <div>
            <Header />

            {/* Display Gemini Filtered Results */}
            {geminiSummary && (
                <div className="mt-6 p-4 bg-gray-100 border-l-4 border-blue-500">
                    <div className="flex">
                        <h3 className="text-blue-800 text-lg font-semibold mr-2">
                            Results Enhanced by Gemini
                        </h3>
                        <Image
                            src="/gemini.svg"
                            className="h-7"
                            alt="gemini svg image"
                            width={30}
                            height={30}
                        />
                    </div>

                    <div>{parseResultsToHTML(geminiSummary)}</div>
                </div>
            )}
        </div>
    );
}
