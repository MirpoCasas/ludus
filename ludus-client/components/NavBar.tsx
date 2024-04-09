"use client";

import styles from "@/public/styles/navbar.module.scss";
import { useState, useEffect, useContext } from "react";
import menuIcon from "@/public/menuIcon.svg";
import colorsImg from "@/public/colors.svg";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import nota from '@/public/nota.svg';
import notaconslash from '@/public/notaconslash.svg';
import { AudioContext } from "@/public/assets/audiocontext";



export function NavBar() {
  const [isOpenNav, setIsOpenNav] = useState(false);
  const {start , playing} = useContext(AudioContext);


  const variantsNavBar = {
    open: { height: "100vh" },
    closed: { height: "" },
  };

  function toggleTheme() {
    const currentTheme = localStorage.getItem("theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  useEffect(() => {
    const selectedTheme: string | null = localStorage.getItem("theme");
    console.log(selectedTheme , "selectedTheme");
    if (!selectedTheme) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", selectedTheme);
    }
  }, []);

  return (
    <motion.div className={styles.navBar} animate={isOpenNav ? "open" : "closed"} variants={variantsNavBar}>
      <div className={styles.navBar_top}>
        <Image src={playing ? notaconslash : nota} alt="nota" className={styles.nota} onClick={start}></Image>
        <Image src={colorsImg} alt="color swap" className={styles.colorChange} onClick={() => toggleTheme()}></Image>
        <Image src={menuIcon} alt="menu" className={styles.menuIcon} onClick={() => setIsOpenNav(!isOpenNav)}></Image>
      </div>
      <div className={styles.navBar_content}>
        <Link onClick={()=>setIsOpenNav(false)} href="/">HOGAR</Link>
        <Link onClick={()=>setIsOpenNav(false)} href="/quienes">QUIÉNES SOMOS</Link>
        <Link onClick={()=>setIsOpenNav(false)} href="/quehacemos">QUÉ HACEMOS</Link>
        <Link onClick={()=>setIsOpenNav(false)} href="/contacto">CONTACTO</Link>
      </div>
    </motion.div>
  );
}
