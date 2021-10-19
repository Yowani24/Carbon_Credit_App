import React from "react";
import Head from 'next/head'
import styles from '../success/Successful.module.css'
import Link from 'next/link'

export default function Success() {
    return(
        <>
            <Head>
                <title>Success</title>
            </Head>

            <div className={styles.wrapper}>
                    <h3>Successful purchase!</h3>
                    <div className={styles.checkIcon}></div>
                    
                <p>Thank you for your preference!</p>
                <Link href="/" passHref>
                    <button className={styles.success_btn}>Return Home</button>
                </Link>
            </div>
        </>

    )
}