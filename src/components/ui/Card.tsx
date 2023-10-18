// import React from 'react';

// const Card = () => {
//     return (
//         <div>
//         <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-2 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
//           <Link to={`/product-details/${product._id}`} className="w-full">
//             <img src={product?.image} alt="product" />
//             <h1 className="text-xl font-semibold">{product?.title}</h1>
//           </Link>
//           <p>Author: {product?.author}</p>
//           <p className="text-sm">Genre: {product?.genre}</p>
//           <p className="text-sm">Date: {product?.publicationDate}</p>
//           <div className="flex justify-between gap-10">
//             {user.email && (
//               <>
//                 <p onClick={() => handleAddRead(product)}>
//                   <Link to="/addToRead">
//                     <Button>Add To Read</Button>
//                   </Link>
//                 </p>
//                 <p onClick={() => handleAddProduct(product)}>
//                   <Link to="/whishlist">
//                     <Button>Whishlist</Button>
//                   </Link>
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
// };

// export default Card;
