"use client";

import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import menuIcon from "@/public/menuicon.svg";
import colorsImg from "@/public/colors.svg";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
    <motion.div
      className={styles.navBar}
      animate={isOpenNav ? "open" : "closed"}
      variants={variantsNavBar}
    >
      <div className={styles.navBar_top}>
        <Image
          src={colorsImg}
          alt="color swap"
          className={styles.colorChange}
          onClick={() => toggleTheme()}
        ></Image>
        <Image
          src={menuIcon}
          alt="menu"
          className={styles.menuIcon}
          onClick={() => setIsOpenNav(!isOpenNav)}
        ></Image>
      </div>
      <div className={styles.navBar_content}>
        <Link href="/quienes">Quienes somos</Link>
        <Link href="/quehacemos">Que hacemos</Link>
        <Link href="">Contacto</Link>
      </div>
    </motion.div>
  );
}
