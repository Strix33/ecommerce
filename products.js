// product.js:

const products = [
  {
    "name": "Classic Oxford Button-Down Shirt",
    "description": "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton, it features a button-down collar and a comfortable, slightly relaxed fit. Perfect for both formal and casual occasions, it comes with long sleeves, a button placket, and a yoke at the back. The shirt is finished with a gently rounded hem and adjustable button cuffs.",
    "price": 39.99,
    "discountPrice": 34.99,
    "countInStock": 20,
    "sku": "OX-SH-001",
    "category": "Top Wear",
    "brand": "Urban Threads",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Red",
      "Blue",
      "Yellow"
    ],
    "collections": "Business Casual",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.hawesandcurtis.com/tr:q-80/WV/WVCRJ005-B04-201466-1400px-1820px.jpg",
        "altText": "Classic Oxford Button-Down Shirt Front View"
      },
      {
        "url": "https://images.hawesandcurtis.com/tr:q-80/WV/WVPRA060-B01-205303-1400px-1820px.jpg",
        "altText": "Classic Oxford Button-Down Shirt Back View"
      },
      {
        "url": "https://paul-smith-products-ressh.cloudinary.com/image/upload/v1715950919/MODEL/ECOM/M1R/M1R-546Y-M01991-01/M1R-546Y-M01991-01_1.jpg",
        "altText": "Classic Oxford Button-Down Shirt Detail View"
      },
      {
        "url": "https://content.josephturner.co.uk/Original/55127d09_mens-blue-buttondown-oxford-shirt-mcbdoxblu_1.jpg",
        "altText": "Classic Oxford Button-Down Shirt Styled View"
      }
    ],
    "rating": 4.5,
    "numReviews": 12
  },
  {
    "name": "Slim-Fit Stretch Shirt",
    "description": "A versatile slim-fit shirt perfect for business or evening events. Designed with a fitted silhouette, the added stretch provides maximum comfort throughout the day. Features a crisp turn-down collar, button placket, and adjustable cuffs.",
    "price": 29.99,
    "discountPrice": 24.99,
    "countInStock": 35,
    "sku": "SLIM-SH-002",
    "category": "Top Wear",
    "brand": "Modern Fit",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Navy Blue",
      "Burgundy"
    ],
    "collections": "Formal Wear",
    "material": "Cotton Blend",
    "gender": "Men",
    "images": [
      {
        "url": "https://handcmediastorage.blob.core.windows.net/productimages/SE/SEPMA220-A01-128501-800px-1040px.jpg",
        "altText": "Slim-Fit Stretch Shirt Front View"
      },
      {
        "url": "https://handcmediastorage.blob.core.windows.net/productimages/SE/SEPMV014-G01-132687-800px-1040px.jpg",
        "altText": "Slim-Fit Stretch Shirt Back View"
      },
      {
        "url": "https://m.media-amazon.com/images/I/610NaWLzXvL._AC_SL1500_.jpg",
        "altText": "Slim-Fit Stretch Shirt Detail View"
      },
      {
        "url": "https://m.media-amazon.com/images/I/614pXs47+tL._AC_SL1500_.jpg",
        "altText": "Slim-Fit Stretch Shirt Styled View"
      }
    ],
    "rating": 4.8,
    "numReviews": 15
  },
  {
    "name": "Casual Denim Shirt",
    "description": "This casual denim shirt is made from lightweight cotton denim. It features a regular fit, snap buttons, and a straight hem. With Western-inspired details, this shirt is perfect for layering or wearing solo.",
    "price": 49.99,
    "discountPrice": 44.99,
    "countInStock": 15,
    "sku": "CAS-DEN-003",
    "category": "Top Wear",
    "brand": "Street Style",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Light Blue",
      "Dark Wash"
    ],
    "collections": "Casual Wear",
    "material": "Denim",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.nexusapp.co/assets/01/1b/63/36965046.jpg",
        "altText": "Casual Denim Shirt Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/db/37/40/db374045cbb6f08be48ca0d431355188.jpg",
        "altText": "Casual Denim Shirt Back View"
      },
      {
        "url": "https://images.nexusapp.co/assets/97/68/27/358047767.jpg",
        "altText": "Casual Denim Shirt Detail View"
      },
      {
        "url": "https://i.pinimg.com/originals/86/52/3e/86523e87499e89f11201acaca79abd60.jpg",
        "altText": "Casual Denim Shirt Styled View"
      }
    ],
    "rating": 4.6,
    "numReviews": 8
  },
  {
    "name": "Printed Resort Shirt",
    "description": "Designed for summer, this printed resort shirt is perfect for vacation or weekend getaways. It features a relaxed fit, short sleeves, and a camp collar. The all-over tropical print adds a playful vibe.",
    "price": 29.99,
    "discountPrice": 22.99,
    "countInStock": 25,
    "sku": "PRNT-RES-004",
    "category": "Top Wear",
    "brand": "Beach Breeze",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Tropical Print",
      "Navy Palms"
    ],
    "collections": "Vacation Wear",
    "material": "Viscose",
    "gender": "Men",
    "images": [
      {
        "url": "https://www.hancockfashion.com/cdn/shop/products/1_fff079f3-191d-4ccd-bfeb-1b6ed3f38729_large.jpg?v=1661591389",
        "altText": "Printed Resort Shirt Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/74/9c/35/749c350d9c3cffd81c99ebf4adb2dd71.jpg",
        "altText": "Printed Resort Shirt Back View"
      },
      {
        "url": "https://assets.timberland.eu/images/t_img/f_auto,h_650,w_650,e_sharpen:60/dpr_2.0/v1733389901/TB0A68HYEPU-HERO/Seersucker-Graphic-Resort-Shirt-for-Men-in-Multicolour.png",
        "altText": "Printed Resort Shirt Detail View"
      },
      {
        "url": "https://www.thefashionisto.com/wp-content/uploads/2023/12/Casual-Resort-Man-Shirt.jpg",
        "altText": "Printed Resort Shirt Styled View"
      }
    ],
    "rating": 4.4,
    "numReviews": 10
  },
  {
    "name": "Slim-Fit Easy-Iron Shirt",
    "description": "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette. Features a turn-down collar, classic button placket, and a yoke at the back. Long sleeves and adjustable button cuffs with a rounded hem.",
    "price": 34.99,
    "discountPrice": 29.99,
    "countInStock": 30,
    "sku": "SLIM-EIR-005",
    "category": "Top Wear",
    "brand": "Urban Chic",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Gray"
    ],
    "collections": "Business Wear",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://image.hm.com/assets/hm/bf/4b/bf4b0de3f60dec873830261f9525e6aeafb65809.jpg?imwidth=2160",
        "altText": "Slim-Fit Easy-Iron Shirt Front View"
      },
      {
        "url": "https://image.hm.com/assets/hm/e5/b4/e5b4aaea17cc747d2dcea5c50a2fa33e69d0982a.jpg?imwidth=1260",
        "altText": "Slim-Fit Easy-Iron Shirt Back View"
      },
      {
        "url": "https://handcmediastorage.blob.core.windows.net/productimages/SE/SEPMA220-A01-128501-800px-1040px.jpg",
        "altText": "Slim-Fit Easy-Iron Shirt Detail View"
      },
      {
        "url": "https://image.hm.com/assets/hm/be/5b/be5bef8f42a2d22983dd0bbe410789f692f9b646.jpg?imwidth=2160",
        "altText": "Slim-Fit Easy-Iron Shirt Styled View"
      }
    ],
    "rating": 5,
    "numReviews": 14
  },
  {
    "name": "Polo T-Shirt with Ribbed Collar",
    "description": "A wardrobe classic, this polo t-shirt features a ribbed collar and cuffs. Made from 100% cotton, it offers breathability and comfort throughout the day. Tailored in a slim fit with a button placket at the neckline.",
    "price": 24.99,
    "discountPrice": 19.99,
    "countInStock": 50,
    "sku": "POLO-TSH-006",
    "category": "Top Wear",
    "brand": "Polo Classics",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Navy",
      "Red"
    ],
    "collections": "Casual Wear",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/47/77/04/4777048aac2cce1b5fac34f1f5545f97.jpg",
        "altText": "Polo T-Shirt with Ribbed Collar Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/e5/d5/42/e5d5423d00d51d7a1d570302108be2f4.png",
        "altText": "Polo T-Shirt with Ribbed Collar Back View"
      },
      {
        "url": "https://m.media-amazon.com/images/I/81IP233cXTL._AC_SL1500_.jpg",
        "altText": "Polo T-Shirt with Ribbed Collar Detail View"
      },
      {
        "url": "https://i.pinimg.com/originals/fa/a6/dc/faa6dce89c37527a9b736ca68a26dbfc.jpg",
        "altText": "Polo T-Shirt with Ribbed Collar Styled View"
      }
    ],
    "rating": 4.3,
    "numReviews": 22
  },
  {
    "name": "Oversized Graphic T-Shirt",
    "description": "An oversized graphic t-shirt that combines comfort with street style. Featuring bold prints across the chest, this relaxed fit tee offers a modern vibe, perfect for pairing with jeans or joggers.",
    "price": 19.99,
    "discountPrice": 15.99,
    "countInStock": 40,
    "sku": "OVS-GRF-007",
    "category": "Top Wear",
    "brand": "Street Vibes",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Gray"
    ],
    "collections": "Streetwear",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://i.pinimg.com/originals/23/af/b5/23afb559bcd2c2b9dd05ad4861514f66.jpg",
        "altText": "Oversized Graphic T-Shirt Front View"
      },
      {
        "url": "https://i.pinimg.com/736x/0b/4e/14/0b4e140849824af64fb94e3e20e1c0cb.jpg",
        "altText": "Oversized Graphic T-Shirt Back View"
      },
      {
        "url": "https://i.pinimg.com/originals/92/d8/a1/92d8a12f1ffcaa3dd046eb1fda00afc9.jpg",
        "altText": "Oversized Graphic T-Shirt Detail View"
      },
      {
        "url": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/30461446/2024/11/16/9b6cf599-eb7e-49d2-bb69-e071edac45711731747490789-NOBERO-Men-Oversized-Graphic-Printed-Cotton-T-shirt-50517317-1.jpg",
        "altText": "Oversized Graphic T-Shirt Styled View"
      }
    ],
    "rating": 4.6,
    "numReviews": 30
  },
  {
    "name": "Regular-Fit Henley Shirt",
    "description": "A modern take on the classic Henley shirt, this regular-fit style features a buttoned placket and ribbed cuffs. Made from a soft cotton blend with a touch of elastane for stretch.",
    "price": 22.99,
    "discountPrice": 18.99,
    "countInStock": 35,
    "sku": "REG-HEN-008",
    "category": "Top Wear",
    "brand": "Heritage Wear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Heather Gray",
      "Olive",
      "Black"
    ],
    "collections": "Casual Wear",
    "material": "Cotton Blend",
    "gender": "Men",
    "images": [
      {
        "url": "https://i5.walmartimages.com/seo/Men-s-Long-Sleeves-Henley-Shirts-Regular-Fit-Button-Down-Casual-Cotton-T-Shirt-Soft-Comfy-Shirt-with-Pocket_50cf3911-7366-4117-bdec-c67b39e497e7.398573c28aa4d7f3db7aac2710b378dc.jpeg",
        "altText": "Regular-Fit Henley Shirt Front View"
      },
      {
        "url": "https://i5.walmartimages.com/seo/DxhmoneyHX-Mens-Henley-Shirt-Casual-Long-Sleeve-Lightweight-Button-T-Shirts-Front-Placket-Basic-Regular-Fit-Pullover-Top_79078480-d05a-41d6-af99-d53d852b488f.08cb7326c6d71c9528bf778b5f03a4a3.jpeg",
        "altText": "Regular-Fit Henley Shirt Back View"
      },
      {
        "url": "https://media.centrepointstores.com/i/centrepoint/7410486-HQ175224-SP26161025_01-2100.jpg",
        "altText": "Regular-Fit Henley Shirt Detail View"
      },
      {
        "url": "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/82cd536c289f81a07f2a707cea31afa8.jpg",
        "altText": "Regular-Fit Henley Shirt Styled View"
      }
    ],
    "rating": 4.5,
    "numReviews": 25
  },
  {
    "name": "Long-Sleeve Thermal Tee",
    "description": "Stay warm with this long-sleeve thermal tee, made from soft cotton with a waffle-knit texture. Ideal for layering in cooler months, the slim-fit design ensures a snug yet comfortable fit.",
    "price": 27.99,
    "discountPrice": 22.99,
    "countInStock": 20,
    "sku": "LST-THR-009",
    "category": "Top Wear",
    "brand": "Winter Basics",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Charcoal",
      "Dark Green",
      "Navy"
    ],
    "collections": "Winter Essentials",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://lsco.scene7.com/is/image/lsco/A92490010-dynamic1-pdp?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=880&hei=880",
        "altText": "Long-Sleeve Thermal Tee Front View"
      },
      {
        "url": "https://oldnavy.gap.com/webcontent/0027/226/512/cn27226512.jpg",
        "altText": "Long-Sleeve Thermal Tee Back View"
      },
      {
        "url": "https://i5.walmartimages.com/seo/Top-Pro-Men-s-Classic-Waffle-Knit-Heavyweight-Cotton-Long-Sleeve-Thermal-T-Shirt-Top_282f340f-2b68-4c57-8b47-66ca1a1d9ffc.404324689f2200ff212dd1dfe2510453.jpeg",
        "altText": "Long-Sleeve Thermal Tee Detail View"
      },
      {
        "url": "https://cdn.aws.toolstation.com/images/141020-UK/800/89441.jpg",
        "altText": "Long-Sleeve Thermal Tee Styled View"
      }
    ],
    "rating": 4.4,
    "numReviews": 18
  },
  {
    "name": "V-Neck Classic T-Shirt",
    "description": "A classic V-neck t-shirt for everyday wear. This regular-fit tee is made from breathable cotton and features a clean, simple design with a flattering V-neckline. Lightweight fabric and soft texture make it perfect for casual looks.",
    "price": 14.99,
    "discountPrice": 11.99,
    "countInStock": 60,
    "sku": "VNECK-CLS-010",
    "category": "Top Wear",
    "brand": "Everyday Comfort",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Black",
      "Navy"
    ],
    "collections": "Basics",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://img.freepik.com/premium-photo/modern-vneck-tshirt-mockup-male-model_627984-331.jpg?w=2000",
        "altText": "V-Neck Classic T-Shirt Front View"
      },
      {
        "url": "https://www.trueclassictees.com/cdn/shop/files/4100_WHITE_3_7f6769f5-c2ca-4ac7-a299-bc40e724e783.jpg?v=1692725739&width=1420",
        "altText": "V-Neck Classic T-Shirt Back View"
      },
      {
        "url": "https://ae01.alicdn.com/kf/H87861a51f59d44299edaf61712265d2fe/Stretch-Deep-V-Neck-T-Shirt-for-Men-Low-Cut-Vneck-Vee-Top-Tees-Slim-Fit.jpg",
        "altText": "V-Neck Classic T-Shirt Detail View"
      },
      {
        "url": "https://assets.tpop.com/tpop/gallery/tshirt-man-v-neck_large.jpg",
        "altText": "V-Neck Classic T-Shirt Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 28
  },
  {
    "name": "Slim Fit Joggers",
    "description": "Slim-fit joggers with an elasticated drawstring waist. Features ribbed hems and side pockets. Ideal for casual outings or workouts.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 20,
    "sku": "BW-001",
    "category": "Bottom Wear",
    "brand": "ActiveWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Gray",
      "Navy"
    ],
    "collections": "Casual Collection",
    "material": "Cotton Blend",
    "gender": "Men",
    "images": [
      {
        "url": "https://i5.walmartimages.com/asr/1c6e921c-452e-4a98-a2af-a2ffd096aa18.d071c56d03c409b35f105b555e92e1d0.jpeg",
        "altText": "Slim Fit Joggers Front View"
      },
      {
        "url": "http://vntura.com/cdn/shop/files/Gabriele-Mens-Slim-Fit-Joggers-2_1200x1200.webp?v=1750641484",
        "altText": "Slim Fit Joggers Back View"
      },
      {
        "url": "http://vntura.com/cdn/shop/files/Gabriele-Mens-Slim-Fit-Joggers-3_1200x1200.png?v=1750641488",
        "altText": "Slim Fit Joggers Detail View"
      },
      {
        "url": "https://cdn.dsmcdn.com/mnresize/600/-/ty1140/product/media/images/prod/SPM/PIM/20240120/13/b682e01d-4df0-3a78-b0a3-9f6178c4f61e/1_org_zoom.jpg",
        "altText": "Slim Fit Joggers Styled View"
      }
    ],
    "rating": 4.5,
    "numReviews": 12
  },
  {
    "name": "Cargo Joggers",
    "description": "Relaxed-fit cargo joggers featuring multiple pockets for functionality. Drawstring waist and cuffed hems for a modern look.",
    "price": 45,
    "discountPrice": 40,
    "countInStock": 15,
    "sku": "BW-002",
    "category": "Bottom Wear",
    "brand": "UrbanStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Olive",
      "Black"
    ],
    "collections": "Urban Collection",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://i.pinimg.com/originals/02/3d/8b/023d8b04745f2017a503fd8e65a65f32.png",
        "altText": "Cargo Joggers Front View"
      },
      {
        "url": "https://ae01.alicdn.com/kf/Sb6b1fb012cd14190af829eb43d526cc37.jpg",
        "altText": "Cargo Joggers Back View"
      },
      {
        "url": "https://m.media-amazon.com/images/I/51ZXaXDMWCL._AC_SL1500_.jpg",
        "altText": "Cargo Joggers Detail View"
      },
      {
        "url": "https://i.pinimg.com/736x/30/e4/0c/30e40c17653b6d4ba08a3b8c0b7e8925.jpg",
        "altText": "Cargo Joggers Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 20
  },
  {
    "name": "Tapered Sweatpants",
    "description": "Tapered sweatpants designed for comfort. Elastic waistband with adjustable drawstring, perfect for lounging or athletic activities.",
    "price": 35,
    "discountPrice": 30,
    "countInStock": 25,
    "sku": "BW-003",
    "category": "Bottom Wear",
    "brand": "ChillZone",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Charcoal",
      "Blue"
    ],
    "collections": "Lounge Collection",
    "material": "Fleece",
    "gender": "Men",
    "images": [
      {
        "url": "https://oldnavy.gap.com/webcontent/0052/668/126/cn52668126.jpg",
        "altText": "Tapered Sweatpants Front View"
      },
      {
        "url": "https://assets.paulsmith.com/paul-smith-products/f_jpg,q_auto,w_922/v1714649718/MODEL/ECOM/M2R/M2R-421R-KZEBRA-72/M2R-421R-KZEBRA-72_4",
        "altText": "Tapered Sweatpants Back View"
      },
      {
        "url": "https://i.pinimg.com/736x/c0/2d/ce/c02dcea6971241a8ff2c497c697b03fe.jpg",
        "altText": "Tapered Sweatpants Detail View"
      },
      {
        "url": "https://i5.walmartimages.com/seo/Skinny-Tight-Jogger-Pants-for-Men-Fashion-Zipper-Sweatpants-Athletic-Workout-Bodybuilding-Sports-Tapered-Joggers_cdf4cb79-699a-453d-9bad-3de0cfb68c4a.cf4b0fe92dd123a3e32303fbb25c70d1.jpeg",
        "altText": "Tapered Sweatpants Styled View"
      }
    ],
    "rating": 4.3,
    "numReviews": 18
  },
  {
    "name": "Denim Jeans",
    "description": "Classic slim-fit denim jeans with a slight stretch for comfort. Features a zip fly and five-pocket styling for a timeless look.",
    "price": 60,
    "discountPrice": 50,
    "countInStock": 30,
    "sku": "BW-004",
    "category": "Bottom Wear",
    "brand": "DenimCo",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Dark Blue",
      "Light Blue"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "gender": "Men",
    "images": [
      {
        "url": "https://www.thefashionisto.com/wp-content/uploads/2019/07/Latin-Male-Model-Double-Denim-Style.jpg",
        "altText": "Denim Jeans Front View"
      },
      {
        "url": "https://www.thefashionisto.com/wp-content/uploads/2015/02/HM-Mens-Skinny-Denim-Jeans-Harvey-Haydon-Shoot-002-800x1119.jpg",
        "altText": "Denim Jeans Back View"
      },
      {
        "url": "https://i.pinimg.com/736x/77/55/29/775529ab711d173cce84ddb6039876b3--mens-denim-blue-jean.jpg",
        "altText": "Denim Jeans Detail View"
      },
      {
        "url": "https://www.thefashionisto.com/wp-content/uploads/2016/11/Levis-2016-Holiday-Mens-Denim-Fashions-001.jpg",
        "altText": "Denim Jeans Styled View"
      }
    ],
    "rating": 4.6,
    "numReviews": 22
  },
  {
    "name": "Chino Pants",
    "description": "Slim-fit chino pants made from stretch cotton twill. Features a button closure and front and back pockets. Ideal for both casual and semi-formal wear.",
    "price": 55,
    "discountPrice": 48,
    "countInStock": 40,
    "sku": "BW-005",
    "category": "Bottom Wear",
    "brand": "CasualLook",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Navy",
      "Black"
    ],
    "collections": "Smart Casual Collection",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0162/2116/files/30086895_166887547362125_7859526599601815552_n.jpg?v=1550739460",
        "altText": "Chino Pants Front View"
      },
      {
        "url": "https://dqp736wsu6w3m.cloudfront.net/s3bucket/w1000/looks/1914/brown-linen-shirt-chinos-1.png",
        "altText": "Chino Pants Back View"
      },
      {
        "url": "https://dqp736wsu6w3m.cloudfront.net/s3bucket/w1000/looks/1912/blue-polo-shirt-beige-chinos-1.png",
        "altText": "Chino Pants Detail View"
      },
      {
        "url": "https://stylegirlfriend.com/wp-content/uploads/2019/10/best-chinos-guys-jcrew.png",
        "altText": "Chino Pants Styled View"
      }
    ],
    "rating": 4.8,
    "numReviews": 15
  },
  {
    "name": "Track Pants",
    "description": "Comfortable track pants with an elasticated waistband and tapered leg. Features side stripes for a sporty look. Ideal for athletic and casual wear.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 20,
    "sku": "BW-006",
    "category": "Bottom Wear",
    "brand": "SportX",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Red",
      "Blue"
    ],
    "collections": "Activewear Collection",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/30047033/2025/1/15/5d031936-0910-4332-a5bf-74ebf6293c711736924612950-WROGN-Men-Track-Pants-5651736924612381-1.jpg",
        "altText": "Track Pants Front View"
      },
      {
        "url": "https://i.pinimg.com/736x/03/e7/d1/03e7d128e9ea23713c00b320c15fc4b5.jpg",
        "altText": "Track Pants Back View"
      },
      {
        "url": "https://i.pinimg.com/736x/c0/2c/4f/c02c4ff38bad7d62bcb2480c062582c0.jpg",
        "altText": "Track Pants Detail View"
      },
      {
        "url": "https://ae01.alicdn.com/kf/S2dc7132d606f49da837580e6f5230ee52/New-Streetwear-Men-s-Multi-Pockets-Cargo-Harem-Pants-Hip-Hop-Casual-Male-Track-Pants-Joggers.jpg",
        "altText": "Track Pants Styled View"
      }
    ],
    "rating": 4.2,
    "numReviews": 17
  },
  {
    "name": "Slim Fit Trousers",
    "description": "Tailored slim-fit trousers with belt loops and a hook-and-eye closure. Suitable for formal occasions or smart-casual wear.",
    "price": 65,
    "discountPrice": 55,
    "countInStock": 15,
    "sku": "BW-007",
    "category": "Bottom Wear",
    "brand": "ExecutiveStyle",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Black"
    ],
    "collections": "Office Wear",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://images.nexusapp.co/assets/e1/27/35/94224297.jpg",
        "altText": "Slim Fit Trousers Front View"
      },
      {
        "url": "https://i.pinimg.com/736x/c9/50/5a/c9505a266ff28edaba843701f73ae584.jpg",
        "altText": "Slim Fit Trousers Back View"
      },
      {
        "url": "https://i.pinimg.com/originals/54/87/9b/54879b155ba677108a37407ee4b075fc.jpg",
        "altText": "Slim Fit Trousers Detail View"
      },
      {
        "url": "https://img-lcwaikiki.mncdn.com/mnpadding/1020/1360/ffffff/pim/productimages/20252/8471434/v1/l_20252-w5jc55z8-sx6-94-79-94-188_a.jpg",
        "altText": "Slim Fit Trousers Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 10
  },
  {
    "name": "Cargo Pants",
    "description": "Loose-fit cargo pants with multiple utility pockets. Features adjustable ankle cuffs and a drawstring waist for versatility and comfort.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 25,
    "sku": "BW-008",
    "category": "Bottom Wear",
    "brand": "StreetWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Olive",
      "Brown",
      "Black"
    ],
    "collections": "Street Style Collection",
    "material": "Cotton",
    "gender": "Men",
    "images": [
      {
        "url": "https://milern.com/wp-content/uploads/2023/10/Cargo-pants-mens-fashion-outfit-2-768x1152.png",
        "altText": "Cargo Pants Front View"
      },
      {
        "url": "https://i5.walmartimages.com/seo/Levi-Strauss-Signature-Men-s-and-Big-and-Tall-Ultimate-Flex-Cargo-Pants_e4d55a7c-f43d-4374-8cfb-50d90fbf5bd4.345807e19de8f4d6f08f9cf2925b4cd0.jpeg",
        "altText": "Cargo Pants Back View"
      },
      {
        "url": "https://i.pinimg.com/originals/2e/15/16/2e15160d5fe4cb02417307e0b7f29fe4.jpg",
        "altText": "Cargo Pants Detail View"
      },
      {
        "url": "https://i.pinimg.com/originals/bb/7f/b2/bb7fb2bee3f38761bc8d38405ee35038.jpg",
        "altText": "Cargo Pants Styled View"
      }
    ],
    "rating": 4.5,
    "numReviews": 13
  },
  {
    "name": "Relaxed Fit Sweatpants",
    "description": "Relaxed-fit sweatpants made from soft fleece fabric. Features an elastic waist and adjustable drawstring for a custom fit.",
    "price": 35,
    "discountPrice": 30,
    "countInStock": 35,
    "sku": "BW-009",
    "category": "Bottom Wear",
    "brand": "LoungeWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Black",
      "Navy"
    ],
    "collections": "Lounge Collection",
    "material": "Fleece",
    "gender": "Men",
    "images": [
      {
        "url": "https://img-lcwaikiki.mncdn.com/mnpadding/1020/1360/ffffff/pim/productimages/20252/8067585/v2/l_20252-w5ah30z8-cvl-99-80-94-187_a.jpg",
        "altText": "Relaxed Fit Sweatpants Front View"
      },
      {
        "url": "https://img-lcwaikiki.mncdn.com/mnpadding/1020/1360/ffffff/pim/productimages/20252/8063211/v1/l_20252-w5ac50z8-cvl-98-76-96-189_a.jpg",
        "altText": "Relaxed Fit Sweatpants Back View"
      },
      {
        "url": "https://img.ltwebstatic.com/v4/j/pi/2025/04/14/76/174463441244895ab752caad80379bf4456bf871d0_thumbnail_900x.webp",
        "altText": "Relaxed Fit Sweatpants Detail View"
      },
      {
        "url": "https://img-lcwaikiki.mncdn.com/mnpadding/1020/1360/ffffff/pim/productimages/20252/8348345/v1/l_20252-w5ht87z8-yfu-97-72-0-184_a.jpg",
        "altText": "Relaxed Fit Sweatpants Styled View"
      }
    ],
    "rating": 4.3,
    "numReviews": 14
  },
  {
    "name": "Formal Dress Pants",
    "description": "Classic formal dress pants with a slim fit. Made from lightweight, wrinkle-resistant fabric for a polished look at the office or formal events.",
    "price": 70,
    "discountPrice": 60,
    "countInStock": 20,
    "sku": "BW-010",
    "category": "Bottom Wear",
    "brand": "ElegantStyle",
    "sizes": [
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Navy"
    ],
    "collections": "Formal Collection",
    "material": "Polyester",
    "gender": "Men",
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0423/3576/4634/files/light-grey-formal-pants_843377af-6d8b-451c-a8c7-21f0748bbf6a_480x480.jpg?v=1700119538",
        "altText": "Formal Dress Pants Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/12/2e/34/122e34cbfc9db204583acf3886802127.jpg",
        "altText": "Formal Dress Pants Back View"
      },
      {
        "url": "https://myquickurl.com/cheerlives.com/65-cheerlives_gleamnest_20241017135111.webp",
        "altText": "Formal Dress Pants Detail View"
      },
      {
        "url": "https://www.sainly.com/cdn/shop/products/sainly-apparel-accessories-26-men-pants-office-grey-casual-straight-suit-pants-men-s-formal-pants-men-s-dress-party-club-dress-pants-men-office-grey-casual-men-formal-pants-men-party_1024x1024.png?v=1663244657",
        "altText": "Formal Dress Pants Styled View"
      }
    ],
    "rating": 4.9,
    "numReviews": 8
  },
  {
    "name": "High-Waist Skinny Jeans",
    "description": "High-waist skinny jeans in stretch denim with a button and zip fly. Features a flattering fit that hugs your curves and enhances your silhouette.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 30,
    "sku": "BW-W-001",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Dark Blue",
      "Black",
      "Light Blue"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/originals/2e/f7/06/2ef706be043b697fb92b9a7b52e16ffc.jpg",
        "altText": "High-Waist Skinny Jeans Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/42/c9/05/42c90504489e05e92d2bcb51df3e8359.jpg",
        "altText": "High-Waist Skinny Jeans Back View"
      },
      {
        "url": "https://www.na-kd.com/globalassets/nakd_high_waist_skinny_jeans_1100-001879-0047_01c.jpg?ref=F947B4254A",
        "altText": "High-Waist Skinny Jeans Detail View"
      },
      {
        "url": "https://img.ltwebstatic.com/images3_pi/2023/06/20/1687240642f3401dc5d6f11c772ff3147ee54c9e0c_thumbnail_900x.webp",
        "altText": "High-Waist Skinny Jeans Styled View"
      }
    ],
    "rating": 4.8,
    "numReviews": 20
  },
  {
    "name": "Wide-Leg Trousers",
    "description": "Flowy, wide-leg trousers with a high waist and side pockets. Perfect for an elegant look that combines comfort and style.",
    "price": 60,
    "discountPrice": 55,
    "countInStock": 25,
    "sku": "BW-W-002",
    "category": "Bottom Wear",
    "brand": "ElegantWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Beige",
      "Black",
      "White"
    ],
    "collections": "Formal Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/38/80/b6/3880b6d013c05095cd03c3f4f9a49e53.jpg",
        "altText": "Wide-Leg Trousers Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/3c/3d/49/3c3d4925160931f0617ca5540358e3ca.jpg",
        "altText": "Wide-Leg Trousers Back View"
      },
      {
        "url": "https://i.pinimg.com/736x/a5/45/c3/a545c3ad218fc694106fd3859a469bae.jpg",
        "altText": "Wide-Leg Trousers Detail View"
      },
      {
        "url": "https://i.pinimg.com/736x/40/ff/38/40ff38ec3a89c221420b6a9cf3900d0e.jpg",
        "altText": "Wide-Leg Trousers Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 15
  },
  {
    "name": "Stretch Leggings",
    "description": "Soft, stretch leggings in a high-rise style. Perfect for lounging, working out, or casual wear, with a smooth fit that flatters your body.",
    "price": 25,
    "discountPrice": 20,
    "countInStock": 40,
    "sku": "BW-W-003",
    "category": "Bottom Wear",
    "brand": "ComfyFit",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "Gray",
      "Navy"
    ],
    "collections": "Activewear Collection",
    "material": "Cotton Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/originals/af/30/05/af3005cf8697a387ab13bf4a23070b2f.jpg",
        "altText": "Stretch Leggings Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/87/ef/b5/87efb56ebb447ad05da0cd4dbd9341f5.png",
        "altText": "Stretch Leggings Back View"
      },
      {
        "url": "https://i.pinimg.com/originals/34/d3/0b/34d30b07baf842be23b56ee38240a88f.jpg",
        "altText": "Stretch Leggings Detail View"
      },
      {
        "url": "https://i.pinimg.com/originals/2e/02/8f/2e028f364414cb6c447b18a6a8e03ca3.jpg",
        "altText": "Stretch Leggings Styled View"
      }
    ],
    "rating": 4.5,
    "numReviews": 30
  },
  {
    "name": "Pleated Midi Skirt",
    "description": "Elegant pleated midi skirt with a high waistband and soft fabric that drapes beautifully. Ideal for both formal and casual occasions.",
    "price": 55,
    "discountPrice": 50,
    "countInStock": 20,
    "sku": "BW-W-004",
    "category": "Bottom Wear",
    "brand": "ChicStyle",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Pink",
      "Navy",
      "Black"
    ],
    "collections": "Spring Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://anninc.scene7.com/is/image/AN/830031_018771?$pdpzoom$",
        "altText": "Pleated Midi Skirt Front View"
      },
      {
        "url": "https://natalieyerger.com/wp-content/uploads/2021/11/fall-winter-pleated-midi-skirt-outfit-001-scaled.jpg",
        "altText": "Pleated Midi Skirt Back View"
      },
      {
        "url": "https://anninc.scene7.com/is/image/AN/830082_6254_MKTG1?$pdpzoom$",
        "altText": "Pleated Midi Skirt Detail View"
      },
      {
        "url": "https://ae01.alicdn.com/kf/HTB14pKwzY1YBuNjSszhq6AUsFXay/Pleated-Skirt-Spring-Autumn-2019-European-Style-Elegant-Tulle-Pleated-Skirt-Blue-Chiffon-Skirt-Women-s.jpg",
        "altText": "Pleated Midi Skirt Styled View"
      }
    ],
    "rating": 4.6,
    "numReviews": 18
  },
  {
    "name": "Flared Palazzo Pants",
    "description": "High-waist palazzo pants with a loose, flowing fit. Comfortable and stylish, making them perfect for casual outings or beach days.",
    "price": 45,
    "discountPrice": 40,
    "countInStock": 35,
    "sku": "BW-W-005",
    "category": "Bottom Wear",
    "brand": "BreezyVibes",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Beige",
      "Light Blue"
    ],
    "collections": "Summer Collection",
    "material": "Linen Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/originals/26/35/01/263501e9003158ae7775f04420b14f25.png",
        "altText": "Flared Palazzo Pants Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/5f/48/a0/5f48a0d8454854a5618e52059bfeb80f.jpg",
        "altText": "Flared Palazzo Pants Back View"
      },
      {
        "url": "https://i.pinimg.com/originals/0a/7e/61/0a7e613fa5e34608272473f0d5630001.jpg",
        "altText": "Flared Palazzo Pants Detail View"
      },
      {
        "url": "https://i5.walmartimages.com/asr/baec1fe1-48c1-4896-bdce-a51b43a4ada2.b6380fe80449e3bf8c85eea885b37915.jpeg",
        "altText": "Flared Palazzo Pants Styled View"
      }
    ],
    "rating": 4.4,
    "numReviews": 22
  },
  {
    "name": "High-Rise Joggers",
    "description": "Comfortable high-rise joggers with an elastic waistband and drawstring for a perfect fit. Great for lounging or working out.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 30,
    "sku": "BW-W-006",
    "category": "Bottom Wear",
    "brand": "ActiveWear",
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Black",
      "Gray",
      "Pink"
    ],
    "collections": "Loungewear Collection",
    "material": "Cotton Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://athleta.gap.com/webcontent/0057/457/813/cn57457813.jpg",
        "altText": "High-Rise Joggers Front View"
      },
      {
        "url": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/29413750/2024/5/8/e9c9dd89-2b05-412f-89e7-c9145069265b1715168012668HubberholmeWomenRelaxedStraightLegHigh-RiseJoggersTrousers2.jpg",
        "altText": "High-Rise Joggers Back View"
      },
      {
        "url": "https://athleta.gap.com/webcontent/0056/519/424/cn56519424.jpg",
        "altText": "High-Rise Joggers Detail View"
      },
      {
        "url": "https://athleta.gap.com/webcontent/0055/864/087/cn55864087.jpg",
        "altText": "High-Rise Joggers Styled View"
      }
    ],
    "rating": 4.3,
    "numReviews": 25
  },
  {
    "name": "Paperbag Waist Shorts",
    "description": "Stylish paperbag waist shorts with a belted waist and wide legs. Perfect for summer outings and keeping cool in style.",
    "price": 35,
    "discountPrice": 30,
    "countInStock": 20,
    "sku": "BW-W-007",
    "category": "Bottom Wear",
    "brand": "SunnyStyle",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "White",
      "Khaki",
      "Blue"
    ],
    "collections": "Summer Collection",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/21/99/24/21992412efdd3322000dec80e4e45369.jpg",
        "altText": "Paperbag Waist Shorts Front View"
      },
      {
        "url": "https://www.lulus.com/images/product/xlarge/3669540_719342.jpg?w=560",
        "altText": "Paperbag Waist Shorts Back View"
      },
      {
        "url": "https://i.pinimg.com/originals/06/df/22/06df220eda58c47572dffeacee7a17ad.jpg",
        "altText": "Paperbag Waist Shorts Detail View"
      },
      {
        "url": "https://i.pinimg.com/736x/0e/0b/88/0e0b8865dfce4038586b8cbf1380c1a6.jpg",
        "altText": "Paperbag Waist Shorts Styled View"
      }
    ],
    "rating": 4.5,
    "numReviews": 19
  },
  {
    "name": "Stretch Denim Shorts",
    "description": "Comfortable stretch denim shorts with a high-waisted fit and raw hem. Perfect for pairing with your favorite tops during warmer months.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 25,
    "sku": "BW-W-008",
    "category": "Bottom Wear",
    "brand": "DenimStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Blue",
      "Black",
      "White"
    ],
    "collections": "Denim Collection",
    "material": "Denim",
    "gender": "Women",
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0293/9277/products/03-07-23Studio2_RM_RL_11-59-19_6_FNN31790IL08_MediumWash_7711_DQ.jpg?v=1679443122&width=1600&height=2400&crop=center",
        "altText": "Stretch Denim Shorts Front View"
      },
      {
        "url": "http://www.fashionnova.com/cdn/shop/products/03-07-23Studio2_RM_RL_11-59-19_6_FNN31790IL08_MediumWash_7715_DQ_1200x1200.jpg?v=1679443122",
        "altText": "Stretch Denim Shorts Back View"
      },
      {
        "url": "https://i5.walmartimages.com/seo/Manxivoo-Shorts-for-Women-Women-s-Ripped-High-Waisted-Denim-Shorts-Stretchy-Jean-Shorts-Womens-Shorts-Dark-Blue_b69a4c40-4ca0-4bc5-ba85-92ddaf3f6594.b9de1e3c35457f4bafffb38a42c0d9e1.jpeg",
        "altText": "Stretch Denim Shorts Detail View"
      },
      {
        "url": "https://www.fashionnova.com/cdn/shop/products/03-22-23Studio2_KJ_RL_11-50-24_20_SD05_LightWash_P_9248_SG_1200x1200.jpg?v=1679687638",
        "altText": "Stretch Denim Shorts Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 15
  },
  {
    "name": "Culottes",
    "description": "Wide-leg culottes with a flattering high waist and cropped length. The perfect blend of comfort and style for any casual occasion.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 30,
    "sku": "BW-W-009",
    "category": "Bottom Wear",
    "brand": "ChicStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Olive"
    ],
    "collections": "Casual Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/originals/86/0a/c2/860ac22c08f70f8dae0682e6a239c59e.jpg",
        "altText": "Culottes Front View"
      },
      {
        "url": "https://thumbs.dreamstime.com/b/fashion-model-woman-wearing-white-outfit-crop-top-wide-trousers-culottes-woman-wearing-crop-top-culottes-160103632.jpg",
        "altText": "Culottes Back View"
      },
      {
        "url": "https://thumbs.dreamstime.com/b/woman-wearing-crop-top-culottes-fashion-model-white-outfit-wide-trousers-157757371.jpg",
        "altText": "Culottes Detail View"
      },
      {
        "url": "https://i.pinimg.com/originals/72/80/df/7280dfc2095f810650cab68174639054.png",
        "altText": "Culottes Styled View"
      }
    ],
    "rating": 4.6,
    "numReviews": 23
  },
  {
    "name": "Classic Pleated Trousers",
    "description": "Timeless pleated trousers with a tailored fit. A wardrobe essential for workwear or formal occasions.",
    "price": 70,
    "discountPrice": 65,
    "countInStock": 25,
    "sku": "BW-W-010",
    "category": "Bottom Wear",
    "brand": "ElegantWear",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Navy",
      "Black",
      "Gray"
    ],
    "collections": "Formal Collection",
    "material": "Wool Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/34/1f/0a/341f0a64392268ab2b21b671287e2c9e--pleated-pants-jeans-shorts.jpg",
        "altText": "Classic Pleated Trousers Front View"
      },
      {
        "url": "https://n.nordstrommedia.com/it/e4f5d258-1663-40f1-8208-b1ba746f5a44.jpeg?h=365&w=240&dpr=2",
        "altText": "Classic Pleated Trousers Back View"
      },
      {
        "url": "https://i.pinimg.com/736x/f3/bd/7d/f3bd7dcdd93900389f9e2bc5dd97fb10.jpg",
        "altText": "Classic Pleated Trousers Detail View"
      },
      {
        "url": "https://cdna.lystit.com/photos/shopbop/e473bfe3/theory-Navy-Sapphire-Stripe-Pleated-Trousers.jpeg",
        "altText": "Classic Pleated Trousers Styled View"
      }
    ],
    "rating": 4.8,
    "numReviews": 20
  },
  {
    "name": "Knitted Cropped Top",
    "description": "A stylish knitted cropped top with a flattering fitted silhouette. Perfect for pairing with high-waisted jeans or skirts for a casual look.",
    "price": 40,
    "discountPrice": 35,
    "countInStock": 25,
    "sku": "TW-W-001",
    "category": "Top Wear",
    "brand": "ChicKnit",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Beige",
      "White"
    ],
    "collections": "Knits Collection",
    "material": "Cotton Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://i5.walmartimages.com/seo/Hduncf-Womens-Summer-Sweater-Knit-Crop-Tops-Short-Sleeve-Casual-Blouses-Crewneck-Jacquard-Knitted-Pullover-Shirt-Pink-S_fa12e95b-536e-4762-979a-543a04fe09a4.9f61d86e95e342a44f48befdc57bd973.jpeg",
        "altText": "Knitted Cropped Top Front View"
      },
      {
        "url": "https://styledup.co.uk/cdn/shop/files/knitted-cropped-white-jumper-styledup-fashion.jpg?v=1697492004",
        "altText": "Knitted Cropped Top Back View"
      },
      {
        "url": "https://i.pinimg.com/originals/68/ef/ef/68efef4d7adb96fe3526dea2607cdac8.png",
        "altText": "Knitted Cropped Top Detail View"
      },
      {
        "url": "https://i.etsystatic.com/35984954/r/il/83be9f/4891473990/il_fullxfull.4891473990_3a4f.jpg",
        "altText": "Knitted Cropped Top Styled View"
      }
    ],
    "rating": 4.6,
    "numReviews": 15
  },
  {
    "name": "Boho Floral Blouse",
    "description": "Flowy boho blouse with floral patterns, featuring a relaxed fit and balloon sleeves. Ideal for casual summer days.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 30,
    "sku": "TW-W-002",
    "category": "Top Wear",
    "brand": "BohoVibes",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Pink"
    ],
    "collections": "Summer Collection",
    "material": "Viscose",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/fa/d5/df/fad5df8d4f8fb8a605a2e7d9ae43eb5d.jpg",
        "altText": "Boho Floral Blouse Front View"
      },
      {
        "url": "https://i.etsystatic.com/27220271/r/il/cecd1a/5212799276/il_1080xN.5212799276_lfyq.jpg",
        "altText": "Boho Floral Blouse Back View"
      },
      {
        "url": "https://i.pinimg.com/736x/65/ae/04/65ae04af6b1d12d294ac6ad37dfa0269.jpg",
        "altText": "Boho Floral Blouse Detail View"
      },
      {
        "url": "https://i.pinimg.com/originals/39/f6/af/39f6af353146a855084cb72860053707.jpg",
        "altText": "Boho Floral Blouse Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 20
  },
  {
    "name": "Casual T-Shirt",
    "description": "A soft, breathable casual t-shirt with a classic fit. Features a round neckline and short sleeves, perfect for everyday wear.",
    "price": 25,
    "discountPrice": 20,
    "countInStock": 50,
    "sku": "TW-W-003",
    "category": "Top Wear",
    "brand": "ComfyTees",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Black",
      "White",
      "Gray"
    ],
    "collections": "Essentials",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://stock.pincel.app/wp-content/uploads/2024/03/00594-Young_woman_apparel_model_in_a_white_t-shirt_mockup_full_body_portrait_on_a_solid_gray_background_half-up_half-down_hairstyle.jpg",
        "altText": "Casual T-Shirt Front View"
      },
      {
        "url": "https://stock.pincel.app/wp-content/uploads/2024/03/00613-Woman_apparel_model_in_a_white_t-shirt_mockup_full_body_portrait_on_a_solid_gray_background_sleek_straight_hair_no_glasses_l.jpg",
        "altText": "Casual T-Shirt Back View"
      },
      {
        "url": "https://img.freepik.com/premium-photo/woman-wearing-casual-tshirt-white-background-closeup-collage-with-back-front-view-photos_396607-22906.jpg",
        "altText": "Casual T-Shirt Detail View"
      },
      {
        "url": "https://m.media-amazon.com/images/I/71h4XAUn8PL.jpg",
        "altText": "Casual T-Shirt Styled View"
      }
    ],
    "rating": 4.5,
    "numReviews": 25
  },
  {
    "name": "Off-Shoulder Top",
    "description": "An elegant off-shoulder top with ruffled sleeves and a flattering fit. Ideal for adding a touch of femininity to your outfit.",
    "price": 45,
    "discountPrice": 40,
    "countInStock": 35,
    "sku": "TW-W-004",
    "category": "Top Wear",
    "brand": "Elegance",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Red",
      "White",
      "Blue"
    ],
    "collections": "Evening Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://cdn.shopify.com/s/files/1/0293/9277/files/09-16-24_S2_15_HT17498_Red_P_CXB_RL_13-49-25_7568_PXF.jpg?v=1726592642&width=1200&height=1800&crop=center",
        "altText": "Off-Shoulder Top Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/df/f7/4f/dff74f6b85b2ad0ffe6e8da29600d6be.jpg",
        "altText": "Off-Shoulder Top Back View"
      },
      {
        "url": "https://n.nordstrommedia.com/it/52760bfb-ce22-49ba-b36b-cfdef7f46b76.jpeg?h=365&w=240&dpr=2",
        "altText": "Off-Shoulder Top Detail View"
      },
      {
        "url": "https://n.nordstrommedia.com/it/b8f9da94-1e32-40ed-9856-6d2961e90843.jpeg?h=368&w=240&dpr=2",
        "altText": "Off-Shoulder Top Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 18
  },
  {
    "name": "Lace-Trimmed Cami Top",
    "description": "A delicate cami top with lace trim and adjustable straps. The lightweight fabric makes it perfect for layering or wearing alone during warmer weather.",
    "price": 35,
    "discountPrice": 30,
    "countInStock": 40,
    "sku": "TW-W-005",
    "category": "Top Wear",
    "brand": "DelicateWear",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "collections": "Lingerie-Inspired",
    "material": "Silk Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/40/76/62/4076623de742f944217054631ca19bc0.jpg",
        "altText": "Lace-Trimmed Cami Top Front View"
      },
      {
        "url": "https://i.pinimg.com/736x/9a/51/67/9a51676c797f4a92ce605c85234308e4.jpg",
        "altText": "Lace-Trimmed Cami Top Back View"
      },
      {
        "url": "https://cdn-img.prettylittlething.com/2/3/c/c/23cce5208947a2fd2fa79bbc6ccebcb169e70e5d_CNN6826_1_navy_satin_lace_detail_cami_top.jpg?imwidth=600",
        "altText": "Lace-Trimmed Cami Top Detail View"
      },
      {
        "url": "https://cdna.lystit.com/photos/saksfifthavenue/261db328/dolce-gabbana-white-Lace-trimmed-Camisole.jpeg",
        "altText": "Lace-Trimmed Cami Top Styled View"
      }
    ],
    "rating": 4.8,
    "numReviews": 22
  },
  {
    "name": "Graphic Print Tee",
    "description": "A trendy graphic print tee with a relaxed fit. Pair it with jeans or skirts for a cool and casual look.",
    "price": 30,
    "discountPrice": 25,
    "countInStock": 45,
    "sku": "TW-W-006",
    "category": "Top Wear",
    "brand": "StreetStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Black"
    ],
    "collections": "Urban Collection",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/originals/cf/64/95/cf6495430516a1ad3305f34e86f523f8.jpg",
        "altText": "Graphic Print Tee Front View"
      },
      {
        "url": "https://oldnavy.gap.com/webcontent/0053/265/368/cn53265368.jpg",
        "altText": "Graphic Print Tee Back View"
      },
      {
        "url": "https://i5.walmartimages.com/seo/Deadline-World-Tour-2025-Korean-Girls-Band-T-shirt-Fashion-Graphic-Printing-Tee-shirt-Women-Clothing-Tee_0e263e96-703d-4f11-a170-ab8ea29176f2.93cfad68de00a374edd9959c0ddd85d5.jpeg",
        "altText": "Graphic Print Tee Detail View"
      },
      {
        "url": "https://i.pinimg.com/736x/af/60/88/af6088f362d8b2c5181eb7f5747cd55f.jpg",
        "altText": "Graphic Print Tee Styled View"
      }
    ],
    "rating": 4.6,
    "numReviews": 30
  },
  {
    "name": "Ribbed Long-Sleeve Top",
    "description": "A cozy ribbed long-sleeve top that offers comfort and style. Perfect for layering during cooler months.",
    "price": 55,
    "discountPrice": 50,
    "countInStock": 30,
    "sku": "TW-W-007",
    "category": "Top Wear",
    "brand": "ComfortFit",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "Gray",
      "Pink",
      "Brown"
    ],
    "collections": "Fall Collection",
    "material": "Cotton Blend",
    "gender": "Women",
    "images": [
      {
        "url": "https://i5.walmartimages.com/seo/cfhntfmh-Women-s-Ribbed-Long-Sleeve-Tops-Crew-Neck-Slim-Fit-Knit-Basic-Casual-Stretch-Layering-Tee-Shirts-Fall-Fashion_30c2a5b9-1da7-4cea-b035-90d3bf5363cb.3c6fdfd6b456946e776ae4d243a10040.jpeg",
        "altText": "Ribbed Long-Sleeve Top Front View"
      },
      {
        "url": "https://myer-media.com.au/wcsstore/MyerCatalogAssetStore/images/70/707/2518/100/1/162963880/162963880_1_720x928.webp?w=1920&q=75",
        "altText": "Ribbed Long-Sleeve Top Back View"
      },
      {
        "url": "https://asda.scene7.com/is/image/Asda/5059192116391?hei=1026&wid=762&qlt=85&fmt=pjpg&resmode=sharp2&op_usm=1.1,0.5,0,0&defaultimage=default_details_George_rd",
        "altText": "Ribbed Long-Sleeve Top Detail View"
      },
      {
        "url": "https://www.na-kd.com/globalassets/v-neck_ribbed_long_sleeve-top_1100-010220-0017_23421.jpg?ref=3900DD3B1D",
        "altText": "Ribbed Long-Sleeve Top Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 26
  },
  {
    "name": "Ruffle-Sleeve Blouse",
    "description": "A lightweight ruffle-sleeve blouse with a flattering fit. Perfect for a feminine touch to any outfit.",
    "price": 45,
    "discountPrice": 40,
    "countInStock": 20,
    "sku": "TW-W-008",
    "category": "Top Wear",
    "brand": "FeminineWear",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "White",
      "Navy",
      "Lavender"
    ],
    "collections": "Summer Collection",
    "material": "Viscose",
    "gender": "Women",
    "images": [
      {
        "url": "https://i.pinimg.com/originals/a3/0b/55/a30b55f22da75c62c37ccd04d2d46ee0.jpg",
        "altText": "Ruffle-Sleeve Blouse Front View"
      },
      {
        "url": "https://i.pinimg.com/originals/f1/b2/7d/f1b27dcf4bfae0daf31c5d1490f5393b.png",
        "altText": "Ruffle-Sleeve Blouse Back View"
      },
      {
        "url": "https://i.pinimg.com/originals/4d/aa/ec/4daaec369b7c72a03b1ba5ac6ac98dd6.jpg",
        "altText": "Ruffle-Sleeve Blouse Detail View"
      },
      {
        "url": "https://i.pinimg.com/originals/f4/bc/a2/f4bca2ab230206ea1bafe2c5586096cf.jpg",
        "altText": "Ruffle-Sleeve Blouse Styled View"
      }
    ],
    "rating": 4.5,
    "numReviews": 19
  },
  {
    "name": "Classic Button-Up Shirt",
    "description": "A versatile button-up shirt that can be dressed up or down. Made from soft fabric with a tailored fit, it's perfect for both casual and formal occasions.",
    "price": 60,
    "discountPrice": 55,
    "countInStock": 25,
    "sku": "TW-W-009",
    "category": "Top Wear",
    "brand": "ClassicStyle",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "colors": [
      "White",
      "Light Blue",
      "Black"
    ],
    "collections": "Office Collection",
    "material": "Cotton",
    "gender": "Women",
    "images": [
      {
        "url": "https://oldnavy.gap.com/webcontent/0055/931/998/cn55931998.jpg",
        "altText": "Classic Button-Up Shirt Front View"
      },
      {
        "url": "https://images.ctfassets.net/c8luxa5v52ih/2yctkW5U0tqsGGspIDBmho/828b4a4a4bf436fa13a45978b3fa9e53/NEW_Women-s_Classic_Long_Sleeve_Button-Up_Shirt1.jpg",
        "altText": "Classic Button-Up Shirt Back View"
      },
      {
        "url": "https://oldnavy.gap.com/webcontent/0052/750/196/cn52750196.jpg",
        "altText": "Classic Button-Up Shirt Detail View"
      },
      {
        "url": "https://d1fufvy4xao6k9.cloudfront.net/looks/1895/white-classic-button-up-shirt-look-1.png",
        "altText": "Classic Button-Up Shirt Styled View"
      }
    ],
    "rating": 4.8,
    "numReviews": 25
  },
  {
    "name": "V-Neck Wrap Top",
    "description": "A chic v-neck wrap top with a tie waist. Its elegant style makes it perfect for both casual and semi-formal occasions.",
    "price": 50,
    "discountPrice": 45,
    "countInStock": 30,
    "sku": "TW-W-010",
    "category": "Top Wear",
    "brand": "ChicWrap",
    "sizes": [
      "S",
      "M",
      "L"
    ],
    "colors": [
      "Red",
      "Black",
      "White"
    ],
    "collections": "Evening Collection",
    "material": "Polyester",
    "gender": "Women",
    "images": [
      {
        "url": "https://www.whistles.com/dw/image/v2/BDCH_PRD/on/demandware.static/-/Sites-whistles-master-catalog/default/dw1d689182/images/01103573590/whistles-velvet-v-neck-wrap-top-navy-03.jpg?sw=1280&sh=1792&strip=false",
        "altText": "V-Neck Wrap Top Front View"
      },
      {
        "url": "https://www.whistles.com/dw/image/v2/BDCH_PRD/on/demandware.static/-/Sites-whistles-master-catalog/default/dw0289c012/images/01103573590/whistles-velvet-v-neck-wrap-top-navy-01.jpg?sw=1280&sh=1792&strip=false",
        "altText": "V-Neck Wrap Top Back View"
      },
      {
        "url": "https://target.scene7.com/is/image/Target/GUEST_8b977469-b5f2-4e77-9a83-31aba93c0682?wid=488&hei=488&fmt=pjpeg",
        "altText": "V-Neck Wrap Top Detail View"
      },
      {
        "url": "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/30007608/2024/6/20/52d54747-5339-4a7b-843b-e59e0a1175f01718899331165FableStreetSatinWrapTop1.jpg",
        "altText": "V-Neck Wrap Top Styled View"
      }
    ],
    "rating": 4.7,
    "numReviews": 22
  }
];

module.exports = products;
