import React from 'react'
import styles from '@/public/styles/contacto.module.scss'
import { Azeret_Mono } from "next/font/google";
const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });


export default function contacto() {
  return (
    <div className={`${styles.contacto} ${Azert.className}`}>
      <h1>Contacto</h1>
      <form action="" method="post" className={styles.contacto_form}>
        <input type="text" name="nombre" id="nombre" placeholder="Nombre" />
        <input type="text" name="asunto" id="asunto" placeholder="Asunto" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <textarea name="mensaje" id="mensaje" placeholder="Mensaje"></textarea>
        <button type="submit" className={Azert.className}>Enviar</button>
      </form>
    </div>
  )
}
