"use client";

import Image from "next/image";
import Avatar from "./avatar";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import HeaderOptions from "./headerOptions";
import {
    XMarkIcon,
    MicrophoneIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";

function Header() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const searchInputRef = useRef(null);

    const search = (e) => {
        e.preventDefault();
        const term = searchInputRef.current.value;

        if (!term) return;

        router.push(`/search?term=${term}`);
    };

    return (
        <header className="sticky top-0 bg-white">
            <div className="flex w-full p-6 items-center">
                <Image
                    src="https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                    width={120}
                    height={40}
                    alt="google logo"
                    onClick={() => router.push("/")}
                    className="cursor-pointer"
                    loading="lazy"
                />

                <form className="flex flex-grow border border-gray-200 rounded-full shadow-lg max-w-3xl items-center px-6 py-3 ml-10 mr-5">
                    <input
                        ref={searchInputRef}
                        className="flex-grow w-full focus:outline-none"
                        type="text"
                        defaultValue={searchParams.get("term") || ""}
                    />

                    <XMarkIcon
                        className="h-7 sm:mr-3 cursor-pointer text-gray-500 transition duration-100 transform hover:scale-125"
                        onClick={() => (searchInputRef.current.value = "")}
                    />
                    <MicrophoneIcon className="mr-3 h-6 hidden sm:inline-flex text-blue-500 border-l-2 pl-4 border-gray-300" />
                    <MagnifyingGlassIcon className="h-6 text-blue-500 hidden sm:inline-flex" />
                    <button hidden type="submit" onClick={search}>
                        Search
                    </button>
                </form>
                <Avatar
                    className="ml-auto"
                    url="https://lh3.googleusercontent.com/a/ACg8ocIb-G00WNSW-kW7ZRNQywWqxYghOezxhfa108bp5Exb2rT_6Fvx=s576-c-no"
                />
            </div>

            {/* HeaderOptions */}
            <HeaderOptions />
        </header>
    );
}

export default Header;
