"use client";
import styles from "./page.module.scss";
import player from "@/public/cassete.svg";
import Image from "next/image";
import { motion } from "framer-motion";

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
    }
  };


  return (
    <motion.div className={styles.Player} initial='start' whileHover='hover'>
      <motion.div className={styles.Player_cass} variants={variantsPlayer}>
        <Image src={player} alt='cassete player'></Image>
      </motion.div>
      <motion.div className={styles.Player_text} variants={variantsPlayerText}>
        <p>Clickeame!</p>
      </motion.div>
    </motion.div>
  );
}