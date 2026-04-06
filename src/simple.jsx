

// export default function simple()
// {
//     const products=[
//    {
//       id:1 , title:"keyword",price:59
//    },
//     {
//       id:2 , title:"Mouse",price:19
//    },
//     {
//       id:3 , title:"Moniter",price:199
//    },
//     {
//       id:4 , title:"Ram",price:5999
//    },
//     {
//       id:5 , title:"cover",price:590
//    }
// ];

//     return(
        
//         <ol>
//             {
//                 products.map((item)=>(
//                     <li key={item.id}>{item.title}  - $ {item.price}</li>
//                 )
//                 )
//             }
//         </ol>
        
//     )
// }



export default function Simple() {
  const products = [
    { id: 1, title: "Keyboard", price: 59 },
    { id: 2, title: "Mouse", price: 19 },
    { id: 3, title: "Monitor", price: 199 },
    { id: 4, title: "Ram", price: 5999 },
    { id: 5, title: "Cover", price: 590 }
  ];

  return (
    <ol>
      {products.map(({ id, title, price }) => (
        <li key={id}>
          {title} — **${price.toLocaleString()}**
        </li>
      ))}
    </ol>
  );
}