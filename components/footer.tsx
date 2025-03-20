import React from "react";
import { TbPhone, TbWorldWww } from "react-icons/tb";

const navigation = [
    {
        name: "Teléfono",
        href: "tel:+584129897838",
        icon: TbPhone,
    },
    {
        name: "Página web",
        href: "https://solvexpress.vercel.app/",
        icon: TbWorldWww,
    },
];

const Footer: React.FC = () => {
    return (
        <footer className="absolute bottom-0 bg-white rounded-lg">
            <div className="mx-auto max-w-7xl px-6 py-2 md:flex md:gap-x-4 md:items-center md:justify-between lg:px-8">
                <div className="flex justify-center gap-x-6 md:order-2">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-gray-600 hover:text-gray-800"
                        >
                            <span className="sr-only">{item.name}</span>
                            <item.icon aria-hidden="true" className="w-6 h-6" />
                        </a>
                    ))}
                </div>
                <p className="mt-8 text-center text-sm text-gray-600 md:order-1 md:mt-0">
                    &copy; 2021 Solve Express, Inc. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;