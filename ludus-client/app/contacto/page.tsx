'use client';

import React from "react";
import styles from "@/public/styles/contacto.module.scss";
import { Azeret_Mono } from "next/font/google";
const Azert = Azeret_Mono({ subsets: ["latin"], weight: ["400", "500"] });
import Link from "next/link";
import Image from "next/image";
import { PageWrap } from "@/components/pageWrap";
import BackButton from "@/components/backButton";

import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xvoejrdb");
  if (state.succeeded) {
      return <p>Gracias por comunicarte! Pronto nos pondremos en contacto!</p>;
  }
  return (
    <form onSubmit={handleSubmit} className={`${Azert.className} ${styles.contacto_form}`}>
      <input
        id="nombre"
        type="text" 
        name="nombre"
        placeholder="Nombre"
      />
      <ValidationError 
        prefix="Nombre" 
        field="nombre"
        errors={state.errors}
      />
      <input
        id="asunto"
        type="text" 
        name="asunto"
        placeholder="Asunto"
      />
      <ValidationError 
        prefix="Asunto" 
        field="asunto"
        errors={state.errors}
      />
      <input
        id="email"
        type="email" 
        name="email"
        placeholder="Email"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <textarea
        id="message"
        name="message"
        placeholder="Mensaje"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" disabled={state.submitting} className={Azert.className}>
        Submit
      </button>
    </form>
  );
}


export default function Contacto() {
  const [state, handleSubmit] = useForm("xvoejrdb");
  return (
    <PageWrap>
      <BackButton href="/"/>
      <div className={`${styles.contacto} ${Azert.className}`}>
        <h1>Contacto</h1>
        <ContactForm />
      </div>
    </PageWrap>
  );
}
