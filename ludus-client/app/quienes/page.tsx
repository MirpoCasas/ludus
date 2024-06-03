'use client'

import { Azeret_Mono } from "next/font/google";
import Link from "next/link";
import { PageWrap } from "@/components/pageWrap";
import styles from "@/public/styles/quienes.module.scss";
import backarrow from "@/public/backarrow.svg";
import Image from "next/image";
import axios from "axios";
import BackButton from "@/components/backButton";
import { useEffect, useState } from "react";

interface Response {
    Texto: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    Foto: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: null | string;
          caption: null | string;
          width: number;
          height: number;
          formats: {
            thumbnail: {
              name: string;
              hash: string;
              ext: string;
              mime: string;
              path: null | string;
              width: number;
              height: number;
              size: number;
              url: string;
            };
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: null | string;
          provider: string;
          provider_metadata: null | any;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };

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
  const [descFrancisco, setDescFrancisco] = useState<Response | null>(null)
  const [descLucia, setDescLucia] = useState<Response | null>(null)

  useEffect(() => {
    if (descFrancisco && descLucia) return;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/intro-francisco?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("Fran response", res.data);
      setDescFrancisco(res.data.data.attributes)
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
    axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/intro-lucia?populate=*`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log("Lucia response", res.data);
      setDescLucia(res.data.data.attributes)
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }, [descFrancisco, descLucia]);

  const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`;
  }

  return (
    <PageWrap>
      <BackButton href="/"/>
      <div className={`${Azert.className} ${styles.quienes}`}>
        <h1>Quiénes somos</h1>
        <div className={styles.quienes_grid}>
          <div className={styles.quienes_item}>
            <div className={styles.quienes_foto}>
              { descFrancisco &&
              <Image loader={myLoader} src={descFrancisco.Foto.data.attributes.url} alt="Francisco Marzioni" fill/>
              }
            </div>
            <div className={styles.quienes_item_contenido}>
              <h2>Francisco Marzioni</h2>
              <h3>(Argentina, 1979)</h3>
              <p>
                {descFrancisco ? descFrancisco.Texto : "Cargando..."}
              </p>
              <div className={styles.quienes_buttoncont}>
                <TextButton text="Trayectoria" href="/trayectoria/francisco" />
                <TextButton text="Escritura" href="/escritura" />
              </div>
            </div>
          </div>
          <div className={styles.quienes_item}>
            <div className={styles.quienes_foto}>
              { descLucia &&
              <Image loader={myLoader} src={descLucia.Foto.data.attributes.url} alt="Lucia Maldivo Franchi" fill/>
              }
            </div>
            <div className={styles.quienes_item_contenido}>
              <h2>Lucía Malvido Franchi</h2>
              <h3>(Ciudad de México, 1985)</h3>
              <p>
                {descLucia ? descLucia.Texto : "Cargando..."}
              </p>
              <div className={styles.quienes_buttoncont}>
                <TextButton text="Trayectoria" href="/trayectoria/lucia" />
                <TextButton text="Escritura" href="/escritura" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrap>
  );
}
