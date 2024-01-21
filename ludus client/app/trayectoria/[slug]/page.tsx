'use client'

import styles from "@/public/styles/trayectoria.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Azeret_Mono } from "next/font/google";
import backarrow from "@/public/backarrow.svg";
import Filters from "@/components/filters";
import { PageWrap } from "@/components/pageWrap";
const Azert = Azeret_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ItemAttributes {
  Cliente: string;
  Titulo: string;
  Comienzo: string;
  Final: string;
  Descripcion: string;
  Link: string;
  Autor: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Item {
  id: number;
  attributes: ItemAttributes;
}

interface ItemTrayectoriaProps {
  place: string;
  title: string;
  startdate: string;
  enddate: string;
  desc: string;
  url: string;
}

function ItemTrayectoria (props: ItemTrayectoriaProps) {
  return (
    <div className={styles.trayectoria_item}>
      <h3>{props.place} - {props.title}</h3>
      <p>{props.startdate} - {props.enddate}</p>
      <p>{props.desc}</p>
      <p>{props.url}</p>
    </div>
  )
}

export default function Trayectoria({params}: {params: {slug: string}}) {

  const [items, setItems] = useState<Item[] | null>(null)
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (loaded) return;
    fetch("http://localhost:1337/api/trayectorias?populate=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        let autor : string
        if (params.slug === 'lucia') {
          autor = 'Lucia Maldivo Franchi'
        } else if (params.slug === 'francisco') {
          autor = 'Francisco Marzioni'
        }
        const filteredData = data.data.filter((item: Item) => item.attributes.Autor === 'Ambos' || item.attributes.Autor === autor);
        console.log(filteredData);
        setItems(filteredData);
        setLoaded(true);
      });
    });
  }, [items, loaded, params]);


  return (
    <PageWrap>
      <Link href="/quienes">
        <Image src={backarrow} alt="go back" className={styles.backarrow}></Image>
      </Link>
      <div className={`${Azert.className} ${styles.trayectoria}`}>
        <h1>Trayectoria</h1>
        <div className={styles.trayectoria_items}>
          {items && items.map((item) => {
            return <ItemTrayectoria key={item.id} place={item.attributes.Cliente} title={item.attributes.Titulo} startdate={item.attributes.Comienzo} enddate={item.attributes.Final} desc={item.attributes.Descripcion} url={item.attributes.Link}></ItemTrayectoria>
          })}
        </div>
      </div>
    </PageWrap>
  );
}
