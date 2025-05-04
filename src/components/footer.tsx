import React from "react";

const Footer = () => (
  <footer className="w-full py-2 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
    <p>&copy; {new Date().getFullYear()} MyChatApp </p>
  </footer>
);

export default Footer;
