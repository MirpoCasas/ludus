"use client";

import styles from "@/public/styles/articulo.module.scss";
import { Azeret_Mono, Crimson_Text, Domine } from "next/font/google";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PageWrap } from "@/components/pageWrap";
import BackButton from "@/components/backButton";

const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const Playfair = Crimson_Text({ subsets: ["latin"], weight: ["400", "600", "700"] });

const Title = Domine({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

type articleData = {
  Title: string;
  Post: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  publicationDate: string;
  Featured: string;
  Subtitulo?: string;
  Colaboradores: {
    Autor: string;
    Imagenes: string;
  };
  Image?: {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: {
          thumbnail: {
            name: string;
            hash: string;
            ext: string;
            mime: string;
            path: string;
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
        previewUrl: string;
        provider: string;
        provider_metadata: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  filtros: {
    data: [
      {
        id: number;
        attributes: {
          Nombre: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      }
    ];
  };
};

function Articulo({ params }: { params: { id: string } }) {
  const [articleData, setArticleData] = useState<articleData | null>(null);
  const myLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}`;
  }

  //fetch data
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${params.id}?populate=* `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log("response", data.data);
        setArticleData(data.data.attributes);
      });
    });
  }, [params]);

  return (
    <PageWrap>
      <BackButton href="/escritura" />
      <div className={`${Azert.className} ${styles.articulo}`}>
        {articleData && (
          <>
            <div className={styles.header}>
              <h1 className={Title.className}>{articleData.Title}</h1>
              {articleData.Image?.data && 
              <div className={styles.imgHolder}>
                <Image className={styles.foto} loader={myLoader} alt={"image"} src={articleData.Image.data.attributes.url} layout="fill"></Image>
              </div>
              }
              {articleData.Subtitulo && <p>Texto debajo del titulo</p>}
            </div>
            <div className={styles.texto}>
              <div className={styles.texto_meta}>
                {articleData.Colaboradores &&
                  Object.entries(articleData.Colaboradores).map(([key, value]) => {
                    return (
                      <p key={key}>
                        {key}: {value}
                      </p>
                    );
                  })}
                <div className={styles.articulo_tags_holder}>
                  {articleData.filtros.data.map((tag) => {
                    return (
                      <div className={styles.articulo_tag} key={tag.id}>
                        #{tag.attributes.Nombre}
                      </div>
                    );
                  })}
                </div>
              </div>
              <p className={`${Title.className} ${styles.texto_principal}`}>{articleData.Post}</p>
            </div>
          </>
        )}
        {!articleData && (
          <div className={styles.loadercont}>
            <span className={styles.loader}></span>
          </div>
        )}
      </div>
    </PageWrap>
  );
}

export default Articulo;
