"use client";

import styles from "@/public/styles/articulo.module.scss";
import { Azeret_Mono, Crimson_Text, Domine } from "next/font/google";
const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const Playfair = Crimson_Text({ subsets: ["latin"], weight: ["400", "600", "700"] });

const Title = Domine({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

function Articulo({ params }: { params: { id: string } }) {
  return (
    <div className={`${Azert.className} ${styles.articulo}`}>
      <div className={styles.header}>
        <h1 className={Title.className}>El huesero {params.id}</h1>
        <div className={styles.foto}></div>
        <p>Texto debajo del titulo</p>
      </div>
      <div className={styles.texto}>
        <div className={styles.texto_meta}>
          <p>Autor: Francisco Marzioni</p>
          <div className={styles.articulo_tags_holder}>
            <p>#TV</p>
            <p>#Comedy</p>
          </div>
        </div>
        <p className={`${Title.className} ${styles.texto_principal}`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ducimus aperiam laudantium quidem possimus reprehenderit dolorum consectetur tenetur eum ipsam amet voluptatibus, quod,
          ratione, expedita pariatur veritatis perferendis iusto quis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate modi totam minus eaque culpa veniam doloremque consequatur
          labore suscipit asperiores officiis, voluptate in quia quasi, nam ipsa vero! Facere, impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita iusto voluptatibus inventore.
          Voluptate quaerat illum aut, amet iure sint assumenda eos odit explicabo corporis iste neque necessitatibus fuga officiis deserunt! Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Expedita nemo quae ipsum distinctio ad, aut rerum at impedit laboriosam! Nihil quibusdam sed distinctio voluptates consequatur sequi molestias harum, similique omnis. Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Quasi recusandae excepturi perspiciatis, accusantium ut, molestiae laboriosam tenetur beatae laudantium ullam vero impedit voluptate praesentium expedita
          aliquam labore in, laborum culpa! Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam voluptatem eos voluptates reiciendis obcaecati doloribus esse magnam tempore dignissimos
          corrupti deserunt provident, quaerat iusto expedita cum quod nesciunt perferendis laudantium. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore fuga reiciendis consectetur
          nisi corrupti, soluta placeat hic temporibus, id repellat est ipsam aliquam aspernatur quas delectus et animi itaque nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          voluptates ipsam molestias distinctio perspiciatis quaerat aspernatur nobis, a autem officiis reprehenderit molestiae ad veritatis recusandae laboriosam culpa! Consequuntur, earum sequi.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum officiis eos at facere, facilis architecto totam explicabo eius, laborum sequi deleniti, fugiat velit nobis animi odit in
          quaerat vel omnis?
        </p>
      </div>
    </div>
  );
}

export default Articulo;
