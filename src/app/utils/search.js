// import {
//     GOOGLE_SEARCH_API_KEY,
//     GOOGLE_SEARCH_CONTEXT_KEY,
//     GOOGLE_GEMINI_API_KEY,
// } from "../../../keys";

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize Gemini API
// const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
// const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Rate limiting configuration
// const RATE_LIMIT_REQUESTS = 100;
// const RESULTS_PER_PAGE = 10;

// let dailyRequests = {
//     count: 0,
//     date: new Date().toISOString().split("T")[0],
// };

// function checkRateLimit() {
//     const today = new Date().toISOString().split("T")[0];

//     if (today !== dailyRequests.date) {
//         dailyRequests = { count: 0, date: today };
//     }

//     dailyRequests.count++;
//     return dailyRequests.count <= RATE_LIMIT_REQUESTS;
// }

// // Fetch Google search results
// async function fetchSearchResults(searchTerm, startIndex = 1) {
//     if (!searchTerm) return null;

//     try {
//         const withinLimit = checkRateLimit();
//         if (!withinLimit) {
//             throw new Error("Daily search quota exceeded");
//         }

//         // Add startIndex to the API call
//         const response = await fetch(
//             `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_CONTEXT_KEY}&q=${searchTerm}&start=${startIndex}`,
//             {
//                 next: {
//                     revalidate: 3600,
//                     tags: [`search:${searchTerm}:${startIndex}`],
//                 },
//             }
//         );

//         if (!response.ok) {
//             throw new Error("Failed to fetch search results");
//         }

//         return response.json();
//     } catch (error) {
//         console.error("Search API Error:", error);
//         throw error;
//     }
// }

// // Fallback search with pagination
// async function fallbackSearch(searchTerm, startIndex = 1) {
//     try {
//         const offset = (startIndex - 1) * RESULTS_PER_PAGE;
//         const response = await fetch(
//             `https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=${RESULTS_PER_PAGE}&sroffset=${offset}&format=json&origin=*&srsearch=${searchTerm}`,
//             {
//                 next: { revalidate: 3600 },
//             }
//         );

//         const data = await response.json();
//         return {
//             items: data.query.search.map((result) => ({
//                 link: `https://en.wikipedia.org/wiki/${encodeURIComponent(
//                     result.title
//                 )}`,
//                 title: result.title,
//                 snippet: result.snippet,
//                 formattedUrl: `wikipedia.org/wiki/${encodeURIComponent(
//                     result.title
//                 )}`,
//             })),
//             searchInformation: {
//                 totalResults: data.query.searchinfo.totalhits.toString(),
//             },
//         };
//     } catch (error) {
//         return null;
//     }
// }

// export { fetchSearchResults, fallbackSearch };

////////////////////////////////////////////////////////////////////////

import {
    GOOGLE_SEARCH_API_KEY,
    GOOGLE_SEARCH_CONTEXT_KEY,
    GOOGLE_GEMINI_API_KEY,
} from "../../../keys";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

const RESULTS_PER_PAGE = 10;
const RATE_LIMIT_REQUESTS = 100;

let dailyRequests = {
    count: 0,
    date: new Date().toISOString().split("T")[0],
};

// Rate limiting logic
function checkRateLimit() {
    const today = new Date().toISOString().split("T")[0];

    if (today !== dailyRequests.date) {
        dailyRequests = { count: 0, date: today };
    }

    dailyRequests.count++;
    return dailyRequests.count <= RATE_LIMIT_REQUESTS;
}

// Primary search: Google API
async function fetchSearchResults(searchTerm) {
    const allResults = [];
    const resultsPerPage = 10;
    let startIndex = 1;

    try {
        while (startIndex <= 100) {
            const response = await fetch(
                `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_CONTEXT_KEY}&q=${searchTerm}&start=${startIndex}`
            );

            console.log(response);

            if (!response.ok) break;

            const data = await response.json();
            if (data.items && data.items.length > 0) {
                allResults.push(...data.items);
            }

            startIndex += resultsPerPage;
        }
        console.log(allResults);
        return allResults;
    } catch (error) {
        console.error("Error fetching all search results:", error);
        throw error;
    }
}

// Fallback search: Wikipedia API with pagination
async function fallbackSearch(searchTerm, pageNumber = 1) {
    const offset = (pageNumber - 1) * RESULTS_PER_PAGE;

    try {
        const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchTerm}&srlimit=${RESULTS_PER_PAGE}&sroffset=${offset}&format=json&origin=*`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch fallback search results");
        }

        const data = await response.json();
        return {
            items: data.query.search.map((result) => ({
                title: result.title,
                snippet: result.snippet,
                link: `https://en.wikipedia.org/wiki/${encodeURIComponent(
                    result.title
                )}`,
            })),
            searchInformation: {
                totalResults: data.query.searchinfo.totalhits,
            },
        };
    } catch (error) {
        console.error("Fallback Search API Error:", error);
        return null;
    }
}

async function processResultsWithGemini(searchTerm, results) {
    const prompt = `
You are an AI assistant. A user searched for: "${searchTerm}".
Here are the results:
${results
    .map(
        (result, index) => `
${index + 1}. Title: ${result.title}
Snippet: ${result.snippet}
URL: ${result.link}
`
    )
    .join("\n")}

Please filter the most relevant results and present them in this format:
1. [Title](URL)
2. [Title](URL)
`;

    try {
        const response = await geminiModel.generateContent(prompt);
        console.log("Gemini API Response:", response);

        // Explicitly convert to string and trim
        return response.response.text().trim();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error processing results with Gemini.";
    }
}

// Combined enhanced search logic
async function enhancedSearch(searchTerm, pageNumber = 1, fallback = false) {
    try {
        if (fallback) {
            console.log("Fetching fallback results from Wikipedia...");
            const wikiData = await fallbackSearch(searchTerm, pageNumber);
            const geminiOutput = await processResultsWithGemini(
                searchTerm,
                wikiData.items
            );

            return {
                results: wikiData.items,
                geminiOutput,
                totalResults: wikiData.searchInformation.totalResults,
            };
        }

        console.log("Fetching results from Google...");
        const googleData = await fetchSearchResults(
            searchTerm,
            (pageNumber - 1) * RESULTS_PER_PAGE + 1
        );
        const geminiOutput = await processResultsWithGemini(
            searchTerm,
            googleData.items
        );

        return {
            results: googleData.items,
            geminiOutput,
            totalResults: googleData.searchInformation.totalResults,
        };
    } catch (error) {
        console.error("Enhanced Search Error:", error);
        return null;
    }
}

export {
    fetchSearchResults,
    fallbackSearch,
    processResultsWithGemini,
    enhancedSearch,
};

/////

// export default async function Search({ searchParams: rawSearchParams }) {
//     // Await `searchParams`
//     const searchParams = await rawSearchParams;
//     const searchTerm = searchParams?.term;

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

//     let geminiFilteredResults = null;
//     let error = null;
//     let isLoading = true;

//     try {
//         const googleResults = await fetchSearchResults(searchTerm);
//         geminiFilteredResults = await processResultsWithGemini(
//             searchTerm,
//             googleResults
//         );
//     } catch (e) {
//         error = e;
//     } finally {
//         isLoading = false;
//     }

//     console.log(typeof geminiFilteredResults);
//     console.log(geminiFilteredResults);

//     const parseResultsToHTML = (results) => {
//         if (!results) return null;

//         const lines = results.split("\n");
//         return lines.map((line, index) => {
//             const match = line.match(/\d+\.\s+\[(.+?)\]\((.+?)\)/);
//             if (match) {
//                 const [, title, url] = match;
//                 return (
//                     <div key={index} className="py-2">
//                         <span>{index + 1}. </span>
//                         <a
//                             href={url}
//                             className="text-blue-600 underline"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                         >
//                             {title}
//                         </a>
//                     </div>
//                 );
//             }
//             return null;
//         });
//     };

//     return (
//         <div>
//             <Header />

//             {error && (
//                 <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
//                     <p className="text-red-700">
//                         Sorry, there was an error processing your search. Please
//                         try again later.
//                     </p>
//                 </div>
//             )}

//             {isLoading && (
//                 <div className="text-center py-10">
//                     <p>Loading enhanced search results...</p>
//                 </div>
//             )}

//             {!isLoading && geminiFilteredResults && (
//                 <div className="mt-6 p-4 bg-gray-100 border-l-4 border-blue-500">
//                     <div className="flex">
//                         <h3 className="text-blue-800 text-lg font-semibold mr-2">
//                             Results Enhanced by Gemini
//                         </h3>
//                         <Image
//                             src="/gemini.svg"
//                             className="h-7"
//                             alt="gemini svg image"
//                             width={30}
//                             height={30}
//                         />
//                     </div>
//                     <div>{parseResultsToHTML(geminiFilteredResults)}</div>
//                 </div>
//             )}
//         </div>
//     );
// }
