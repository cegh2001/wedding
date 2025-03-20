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
      <footer className="absolute bottom-0 rounded-lg">
        <div className="mx-auto max-w-7xl py-2 flex gap-x-4 items-center justify-between px-8">
          <p className="text-center text-sm text-gray-600">
            &copy; 2021 Solve Express
          </p>
          <div className="flex justify-center gap-x-6 order-2">
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
        </div>
      </footer>
    );
};

export default Footer;