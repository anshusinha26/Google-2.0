"use client";

import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

function Footer() {
    const [location, setLocation] = useState("");

    useEffect(() => {
        // Fetch location data from ipapi.co
        fetch("https://ipapi.co/json/")
            .then((response) => response.json())
            .then((data) => {
                setLocation(data.country_name); // or data.country_name for full country name
            })
            .catch((error) => {
                console.error("Error fetching location:", error);
                setLocation("Location not available");
            });
    }, []);

    return (
        <footer className="grid w-full divide-y-[1px] divide-gray-300 bg-gray-100 text-sm text-gray-500">
            <div className="px-8 py-3 flex items-center">
                <p>{location || "Detecting location..."}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 grid-flow-row-dense px-8 py-3">
                <div className="flex justify-center items-center md:col-span-2 lg:col-span-1 lg:col-start-2 ">
                    <GlobeEuropeAfricaIcon className="h-5 mr-1 text-green-700" />
                    Carbon neutral since 2007
                </div>
                <div className="flex justify-center space-x-8 whitespace-nowrap md:justify-self-start">
                    <p>Advertising</p>
                    <p>Business</p>
                    <p>How Search works</p>
                </div>
                <div className="flex justify-center space-x-8 md:ml-auto">
                    <p>Privacy</p>
                    <p>Terms</p>
                    <p>Settings</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
