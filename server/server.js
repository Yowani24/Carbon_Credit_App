require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

// aqui definimos uma função que chama a lib stripe e alocamos nela a chave do stripe

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

app.post("/payment", async (req, res) => {
    const { items } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card','boleto'],
            mode: 'payment',

// LINE_ITEMS => Aqui criamos um array que recebe as informaçẽs do(s) produto(s) que está sendo comprado,
// desde o nome, quantidade, preço ...

            line_items:items.map(item => {
                return{
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: item.name,
                            images: [item.image],
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quant,
                    description: item.description
                }               
            }),

//SUCCESS_URL / CANCEL_URL => Aqui definimos a tela para onde o cliente será redirecionado após uma compra bem sucedida ou no caso de cancelamento

            success_url:`${process.env.CLIENT_URL}/success`,
            cancel_url:`${ process.env.CLIENT_URL}`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.listen(4000, () => console.log("Listening on PORT 4000"));