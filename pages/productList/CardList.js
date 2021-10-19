import React, { createContext, useState } from "react";

export const CardList = createContext();

export const CardProvider = (props) => {
    const [card, setCard] = useState([
       {
           id: '1',
           product: 'CarbCred',
           name: 'Reforestation',
           price: 120,
           image:'https://t4.ftcdn.net/jpg/04/50/27/97/360_F_450279738_CRxs69dbCN1AIWPdKbcZIXG2PTR2ooZI.jpg',
           description: 'Detalhes sobre o serviço/produto'
       },
       {
            id: '2',
            product: 'CarbCred',
            name: 'Wind Energy',
            price: 120,
            image:'https://assets.justenergy.com/wp-content/uploads/2020/11/wind-turbines-learning-what-is-it-image.jpg',
            description: 'Detalhes sobre o serviço/produto'
        },
        {
             id: '3',
             product: 'CarbCred',
             name: 'Potable Water',
             price: 120,
             image:'https://thumbs.dreamstime.com/b/vector-illustration-wastage-water-home-waste-our-big-problem-people-wasting-realizing-wasted-163625165.jpg',
             description: 'Detalhes sobre o serviço/produto'
         },
         {
              id: '4',
              product: 'CarbCred',
              name: 'ONECO2',
              price: 1,
              image:'https://resize.indiatvnews.com/en/resize/newbucket/715_-/2018/06/environment-web-tcm73-79759-1528163380.jpg',
              description: 'Crédito de Carbono Onearth'
          }
       
    ]);

    const [cartItems, setCartItems] = useState([]);

    const onAdd = (credit) => {
        const exist = cartItems.find((x) => x.id === credit.id);
        if(exist) {
            setCartItems(cartItems.map((x) => x.id === credit.id ? {...exist, quantity: exist.quantity + 1}: x))
        }else{
            setCartItems([...cartItems, {...credit, quantity: 1}]);
        }
    }

    const onRemove = (credit) => {
        const exist = cartItems.find((x) => x.id === credit.id);
        if(exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== credit.id));
        }else{
            setCartItems(cartItems.map((x) => x.id === credit.id ? {...exist, quantity: exist.quantity - 1}: x))
        }
    }

    

    return(
        <CardList.Provider value={{Card:[card, setCard], cartItems:[cartItems, setCartItems], onAdd:onAdd, onRemove:onRemove}}>
            {props.children}
        </CardList.Provider>
    )
}