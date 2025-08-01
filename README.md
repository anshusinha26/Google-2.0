# Google 2.0 - AI-Enhanced Search Engine

This is a Google clone project built with Next.js, Tailwind CSS, and the Gemini AI. It's a modern search engine that provides AI-powered search results.

![AI Enhanced Search Engine with Gemini AI](/screenshots/ai_enhanced_search_engine_with_gemini_ai.png)

## Features

-   **Google Search:** Fetches and displays search results from Google's Custom Search API.
-   **AI-Powered Summaries:** Uses the Gemini AI to generate summaries of search results.
-   **Modern UI:** A clean and modern user interface built with Tailwind CSS.
-   **Responsive Design:** The application is fully responsive and works on all devices.
-   **Pagination:** Users can navigate through search results using pagination.

## Tech Stack

-   [Next.js](https://nextjs.org/) - React framework for building server-side rendered applications.
-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
-   [Gemini AI](https://ai.google.dev/) - Google's AI model for generating text summaries.
-   [Upstash Redis](https://upstash.com/) - Serverless Redis database for caching search results.
-   [Heroicons](https://heroicons.com/) - A set of free, high-quality SVG icons.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm (or yarn) installed on your machine.
-   A Google API key and a Custom Search Engine ID. You can get these from the [Google Cloud Console](https://console.cloud.google.com/).
-   An Upstash Redis database URL and token. You can get these from the [Upstash Console](https://console.upstash.com/).

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/google-2.0.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Create a `keys.js` file in the root of the project and add your API keys and database credentials.

    ```js
    module.exports = {
        API_KEY: "YOUR_GOOGLE_API_KEY",
        CX: "YOUR_CUSTOM_SEARCH_ENGINE_ID",
        UPSTASH_REDIS_REST_URL: "YOUR_UPSTASH_REDIS_REST_URL",
        UPSTASH_REDIS_REST_TOKEN: "YOUR_UPSTASH_REDIS_REST_TOKEN",
    };
    ```

4.  Run the development server
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `src/app/page.js`: The main page of the application.
-   `src/app/search/page.js`: The search results page.
-   `src/app/components`: Contains the reusable components of the application.
-   `src/app/utils/search.js`: Contains the logic for fetching search results from the Google API and caching them in Redis.
-   `keys.js`: Contains the API keys and database credentials. **(This file is not committed to the repository)**
