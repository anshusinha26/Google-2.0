import dotenv from "dotenv";

dotenv.config();

if (!process.env.GOOGLE_SEARCH_API_KEY) {
    throw new Error("GOOGLE_API_KEY environment variable is not defined");
}

export const GOOGLE_SEARCH_API_KEY = process.env.GOOGLE_SEARCH_API_KEY;
export const GOOGLE_SEARCH_CONTEXT_KEY =
    process.env.GOOGLE_SEARCH_CONTEXT_KEY || "";
export const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

// google search api key - https://developers.google.com/custom-search/v1/introduction#identify_your_application_to_google_with_api_key
// google search context key - https://programmablesearchengine.google.com/controlpanel/create
