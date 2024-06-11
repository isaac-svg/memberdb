import Image from "next/image";
import React from "react";
interface props {
  lightTheme: boolean;
  toggleTheme: () => void;
}
export const Header = ({ lightTheme, toggleTheme }: props) => {
  return (
    <div className="header">
      <span className="logo">TODO</span>
      <span className="theme_img--wrapper">
        {lightTheme ? (
          <Image
            className="theme__img"
            src="/images/icon-moon.svg"
            onClick={toggleTheme}
            alt="moon icon "
            width={20}
            height={20}
          />
        ) : (
          <Image
            className="theme__img"
            src="/images/icon-sun.svg"
            onClick={toggleTheme}
            alt="sun icon"
            width={20}
            height={20}
          />
        )}
      </span>
    </div>
  );
};
