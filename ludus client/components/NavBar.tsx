"use client";

import styles from "@/public/styles/navbar.module.scss";
import { useState, useEffect } from "react";
import menuIcon from "@/public/menuIcon.svg";
import colorsImg from "@/public/colors.svg";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Azeret_Mono } from "next/font/google";
const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function NavBar() {
  const variantsNavBar = {
    open: { height: "100vh" },
    closed: { height: "" },
  };

  function toggleTheme() {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  useEffect(() => {
    const selectedTheme: string | null = localStorage.getItem("theme");
    if (selectedTheme) {
      document.documentElement.setAttribute("data-theme", selectedTheme);
    }
  }, []);

  const [isOpenNav, setIsOpenNav] = useState(false);

  return (
    <motion.div className={`${Azert.className} ${styles.navBar}`} animate={isOpenNav ? "open" : "closed"} variants={variantsNavBar}>
      <div className={styles.navBar_top}>
        <Image src={colorsImg} alt="color swap" className={styles.colorChange} onClick={() => toggleTheme()}></Image>
        <Image src={menuIcon} alt="menu" className={styles.menuIcon} onClick={() => setIsOpenNav(!isOpenNav)}></Image>
      </div>
      <div className={styles.navBar_content}>
        <Link onClick={()=>setIsOpenNav(false)} href="/">HOGAR</Link>
        <Link onClick={()=>setIsOpenNav(false)} href="/quienes">QUÍENES SOMOS</Link>
        <Link onClick={()=>setIsOpenNav(false)} href="/quehacemos">QUÉ HACEMOS</Link>
        <Link onClick={()=>setIsOpenNav(false)} href="/contacto">CONTACTO</Link>
      </div>
    </motion.div>
  );
}
