"use client";

import Head from "next/head";
import Avatar from "./components/avatar";
import Footer from "./components/footer";
import { useRouter } from "next/navigation";
import { useRef } from "react";

import Image from "next/image";
import {
    MicrophoneIcon,
    Squares2X2Icon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

export default function Home() {
    const router = useRouter();
    const searchInputRef = useRef(null);

    const search = (e) => {
        e.preventDefault();
        const term = searchInputRef.current.value;

        if (!term) return;

        router.push(`/search?term=${term}`);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Head>
                <title>Google</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Header */}
            <header className="flex w-full p-5 justify-between text-sm text-gray-700">
                {/* Right */}
                <div className="flex space-x-4 items-center">
                    <p className="link font-medium">About</p>
                    <p className="link font-medium">Store</p>
                </div>

                {/* Left */}
                <div className="flex space-x-4 items-center">
                    <p className="link font-medium">Gmail</p>
                    <p className="link font-medium">Images</p>

                    {/* Icon */}
                    <Squares2X2Icon className="h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer" />

                    {/* Avatar */}
                    <Avatar url="https://lh3.googleusercontent.com/a/ACg8ocIb-G00WNSW-kW7ZRNQywWqxYghOezxhfa108bp5Exb2rT_6Fvx=s576-c-no" />
                </div>
            </header>

            {/* Body */}
            <form
                onSubmit={search}
                className="flex flex-col flex-grow items-center mt-44 w-4/5"
            >
                <Image
                    src="https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                    width={300}
                    height={100}
                    alt="google logo"
                    loading="lazy"
                />

                <div className="flex w-full mt-5 hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-5 py-3 items-center sm:max-w-xl lg:max-w-2xl">
                    <MagnifyingGlassIcon className="h-5 mr-3 text-gray-500" />
                    <input
                        type="text"
                        ref={searchInputRef}
                        className="focus:outline-none flex-grow"
                    />
                    <MicrophoneIcon className="h-5" />
                </div>

                <div className="flex flex-col w-1/2 space-y-2 justify-center mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
                    <button onClick={search} className="btn">
                        Google Search
                    </button>
                    <button onClick={search} className="btn">
                        I&apos;m Feeling Lucky
                    </button>
                </div>
            </form>

            <Footer />
        </div>
    );
}
