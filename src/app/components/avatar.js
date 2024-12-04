import Image from "next/image";

function Avatar({ url, className }) {
    return (
        <Image
            className={`rounded-full h-10 cursor-pointer transition duration-150 transform hover:scale-110 ${className}`}
            loading="lazy"
            src={url}
            alt="profile picture"
            width={40}
            height={40}
            priority={false}
        />
    );
}

export default Avatar;
