'use client'

import { Azeret_Mono } from "next/font/google";
import Link from "next/link";
import { PageWrap } from "@/components/pageWrap";
import styles from "@/public/styles/quienes.module.scss";
import backarrow from "@/public/backarrow.svg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

type TextButtonProps = {
  text: string;
  href: string;
};

function TextButton(props: TextButtonProps) {
  return (
    <Link href={props.href} className={Azert.className}>
      <button className={`${styles.TextButton} ${Azert.className}`}>{props.text}</button>
    </Link>
  );
}

export default function Quienes() {

//  const [loadedFrancisco, setLoadedFrancisco] = useState<boolean>(false)
//  const [loadedLucia, setLoadedLucia] = useState<boolean>(false)
  const [descFrancisco, setDescFrancisco] = useState<string | null>(null)
  const [descLucia, setDescLucia] = useState<string | null>(null)

  useEffect(() => {
    if (descFrancisco && descLucia) return;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    axios.get("http://localhost:1337/api/intro-francisco", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("Fran response", res.data);
      setDescFrancisco(res.data.data.attributes.Texto)
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
    axios.get("http://localhost:1337/api/intro-lucia", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("Lucia response", res.data);
      setDescLucia(res.data.data.attributes.Texto)
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }, [descFrancisco, descLucia]);

  return (
    <PageWrap>
      <Link href="/">
        <Image src={backarrow} alt="go back" className={styles.backarrow}></Image>
      </Link>
      <div className={`${Azert.className} ${styles.quienes}`}>
        <h1>Quíenes somos</h1>
        <div className={styles.quienes_grid}>
          <div className={styles.quienes_item}>
            <div className={styles.quienes_foto}></div>
            <div className={styles.quienes_item_contenido}>
              <h2>Francisco Marzioni</h2>
              <p>
                {descFrancisco ? descFrancisco : "Cargando..."}
              </p>
              <div className={styles.quienes_buttoncont}>
                <TextButton text="Trayectoria" href="/trayectoria" />
                <TextButton text="Escritura" href="/escritura" />
              </div>
            </div>
          </div>
          <div className={styles.quienes_item}>
            <div className={styles.quienes_foto}></div>
            <div className={styles.quienes_item_contenido}>
              <h2>Lucia Maldivo Franchi</h2>
              <p>
                {descLucia ? descLucia : "Cargando..."}
              </p>
              <div className={styles.quienes_buttoncont}>
                <TextButton text="Trayectoria" href="/trayectoria" />
                <TextButton text="Escritura" href="/escritura" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
