const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ShopApp")
    .then((result) => {
        console.info("Connected to MongoDB")
    }).catch((err) => {
        console.info(err)
    })

/*
    didalam konsep schema kita bisa menambahkan sebuah validasi agar data yang kita simpan didalam collection itu sesuai
    dengan schema yang kita buat
*/

/*
    membuat products schema dengan cara yang lebih panjang, dan menambahkan sebuah validasi agar ketika kita lupa
    mengisi field pada saat membuat data terdapat sebuah validasi

    contoh data yang tidak valid

    {
        price: 50000
    }

    terdapat 1 field yang tidak diberikan yaitu "name", dan ini bisa jadi masalah ketika kita menyimpan data tapi
    tidak sesuai dengan schema, maka dari itu kita beri validasi dengan menambahkan "required" dgn nilai "true"

    artinya data field yang terdapat property "required" harus ada
*/
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number    
        }
    }
)

// membuat model product
const Product = mongoose.model("Product", productSchema)

// membuat data product
// const tshirt = new Product(
//     {
//         name: "T Shirt Raglan",
//         price: 50000
//     }
// )

/*
    membuat data salah, dimana field "name" tidak didefinisikan atau tidak disertakan, ini akan menyebabkan error
    "Product Validation Failed"
*/
// const tshirt = new Product(
//     {
//         price: 50000
//     }
// )

/*
    membuat data salah, dimana field "price" diisikan dengan data String, ini juga akan menyebabkan error
    "Product Validation Failed"

    namun ketika kita memasukan data string tapi berupa number contoh "500" maka ini akan berhasil, karena di javascript
    500 == "500" itu akan menghasilkan true, berbeda ketika kita memberikan data field "price" nya adalah sebuah huruf
    seperti "dslafjaldjfladsf" ini akan Error

    namun disarankan sesuaikan dengan tipe yang sudah ditetapkan jika ditetapkan "Number" maka isikan Number saja jangan
    menggunakan "500" seperti ini
*/
// const tshirt = new Product(
//     {
//         name: "T Shirt Raglan",
//         price: "500"
//     }
// )

/*
    membuat data salah dimana kita menambahkan sebuah "field" yang tidak didefinisikan pada Schema, maka ini tidak
    menyebabkan error, namun data field "color" ini tidak akan disimpan kedalam mongodb atau diabaikan karena tidak
    terdaftar pada Schema yang telah dibuat
*/
const tshirt = new Product(
    {
        name: "T Shirt Baligus",
        price: 25000,
        color: "Black"
    }
)

tshirt.save().then((result) => {
    console.info(result)
}).catch((err) => {
    console.info(err)
})