"use client";
import styles from "@/public/styles/player.module.scss";
import player from "@/public/cassete.svg";
import Image from "next/image";
import { motion } from "framer-motion";
import { Azeret_Mono } from "next/font/google";
import { useEffect, useContext } from "react";
import { AudioContext } from "@/public/assets/audiocontext";
const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function Player() {
  const variantsPlayer = {
    start: {
      x: 0,
      rotate: 0,
    },
    hover: {
      x: 100,
      rotate: 15,
    },
  };

  const variantsPlayerText = {
    start: {
      opacity: 0,
      y: 100,
    },
    hover: {
      opacity: 1,
      y: 0,
    },
  };

const {start} = useContext(AudioContext);


  const ClickEvent = () => {
    console.log("click")
    start();
  };

  return (
    <motion.div className={`${Azert.className} ${styles.Player}`} initial="start" whileHover="hover" onClick={ClickEvent}>
      <motion.div className={styles.Player_cass} variants={variantsPlayer}>
        <Image src={player} alt="cassete player"></Image>
      </motion.div>
      <motion.div className={styles.Player_text} variants={variantsPlayerText}>
        <p>Clickeame!</p>
      </motion.div>
    </motion.div>
  );
}
