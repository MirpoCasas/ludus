import { Azeret_Mono } from "next/font/google";
import Link from "next/link";

import styles from "@/public/styles/quienes.module.scss";

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
    <button className ={`${styles.TextButton} ${Azert.className}`}>{props.text}</button>
    </Link>
  )
}

export default function Quienes() {
  return (
    <div className={`${Azert.className} ${styles.quienes}`}>
      <h1>Quienes somos</h1>
      <div className={styles.quienes_grid}>
        <div className={styles.quienes_item}>
          <div className={styles.quienes_foto}></div>
          <div className={styles.quienes_item_contenido}>
            <h2>Lucia Maldivo Franchi</h2>
            <p>
              (Ciudad de México, 1985) Es escritora técnica y creativa. Se
              especializa en el desarrollo y la gestión de proyectos
              relacionados con la educación, los derechos humanos, las artes y
              la cultura, la industria y la tecnología. Fundadora, docente y
              project manager de Ludus.
            </p>
            <div className={styles.quienes_buttoncont}>
              <TextButton text='Trayectoria' href='/trayectoria' />
              <TextButton text='Escritura' href='/escritura' />
            </div>
          </div>
        </div>
        <div className={styles.quienes_item}>
          <div className={styles.quienes_foto}></div>
          <div className={styles.quienes_item_contenido}>
            <h2>Lucia Maldivo Franchi</h2>
            <p>
              (Ciudad de México, 1985) Es escritora técnica y creativa. Se
              especializa en el desarrollo y la gestión de proyectos
              relacionados con la educación, los derechos humanos, las artes y
              la cultura, la industria y la tecnología. Fundadora, docente y
              project manager de Ludus.
            </p>
            <div className={styles.quienes_buttoncont}>
              <TextButton text='Trayectoria' href='/trayectoria' />
              <TextButton text='Escritura' href='/escritura' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
