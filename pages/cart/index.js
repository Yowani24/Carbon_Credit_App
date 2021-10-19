import React, { useContext } from "react";
import styles from './Cart.module.css'
import Link from 'next/link'

import { CardList } from '../productList/CardList'

export default function Cart(props){
    const { onAdd, onRemove, cartItems } = useContext(CardList);
    const [itemsInCart,setItemsInCart] = cartItems;

    const total_price_to_pay = itemsInCart.reduce((a, c) => a + c.price * c.quantity, 0);
    const qty = itemsInCart.reduce((a, c) => c.quantity, 0);

    const handleClick = () => {
        
        // aqui fazemos um request ao servidor

        fetch("http://localhost:4000/payment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // aqui espeificamos o tipo de dados sendo enviados para o servidor (no nosso caso é "json")
            },
            // aqui criamos um objeto json com os dados do produto que serão enviados para o servidor
            body: JSON.stringify({
                items: itemsInCart.map(item => {
                    return{
                        id: item.id,
                        product: item.product,
                        name: item.name,
                        price: item.price,
                        image: item.image,
                        description: item.description,
                        quant: qty
                    }
                })
            })
            // aqui validamos os dados informados e recebemos uma resposta do servidor em forma de url para onde o usuário será redirecionado
        }).then(res => {
            if(res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            window.location = url //resposta do servidor = url para onde o usuário será redirecionado
        }).catch(e => {
            console.error(e.error)
        })
    }

    return (
        <div>
            <header className={styles.header}>
                <Link href="/" passHref>
                    <button>Back <span>Home</span></button>
                </Link>
                <h1>Cart</h1>
                <div className={styles.cart_items_qty}>{itemsInCart.length}</div> 
            </header>

            <section>
                <h3 className={styles.noItemInCard}>{itemsInCart.length === 0 && <p>No item added</p>}</h3>
                {itemsInCart.map(item => (
                    <div className={styles.cart_items_box} key={item.id}>
                    <div className={styles.cart_box}>{item.product}</div>
                    <div className={styles.cart_detail_box}>
                        <p>{item.name}</p>
                        <div className={styles.cart_items_plus_minus}>
                            <span>
                                <button onClick={() => onRemove(item)}>-</button>
                                <button onClick={() => onAdd(item)}>+</button>
                            </span>
                            
                            <div className={styles.total_sum}>
                                <span>{item.quantity}</span>
                                <span>x</span>
                                <span>${item.price}</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                ))}

                {itemsInCart.length > 0 && 

                    <div className={styles.total_price_box}>
                    <span>Total:</span>
                    <span>${total_price_to_pay.toFixed(2)}</span>
                    </div>
                
                }


                {itemsInCart.length > 0 && 

                    <div className={styles.cart_confirm_btn_box}>
                    <button onClick={handleClick}>Confirm</button>
                    </div>

                }             
            </section>
        </div>
    );
};