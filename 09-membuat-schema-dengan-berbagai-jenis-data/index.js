const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ShopApp")
    .then((result) => {
        console.info("Connected to MongoDB")
    }).catch((err) => {
        console.info(err)
    })

/*
    ketika kita ingin memberikan type data array kita perlu mengawalinya dengan tanda "[ ]" kurung kotak, lalu baru object
    type nya, kita juga bisa memberikan minimal panjang atau maksimal panjang suatu string untuk data "deskripsi" misalnya
    dengan cara menggunakan menambahkan property "maxLength" untuk maksimal dan "minLength" untuk minimal

    - dokumentasi untuk properi validator pada schema setiap type data:
    https://mongoosejs.com/docs/schematypes.html

    kita juga bisa memberikan sebuah type "String" namun datanya adalah "enum" atau data nya sudah dicustom hanya pilihan
    yang ditentukan pada schema nya saja, kita juga bisa memberikan nilai "default" pada suatu schema properties dengan
    menambahkan property "default"
*/
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        color: {
            type: String,
            required: true
        },
        size: [
            {
                type: String,
                required: true
            }
        ],
        description: {
            type: String,
            required: true,
            maxLength: 150
        },
        condition: {
            type: String,
            enum: ["Baru", "Bekas"],
            default: "Baru"
        },
        stock: {
            type: Number,
            min: 0
        },
        availability: {
            online: {
                type: Boolean,
                required: true
            },
            offline: {
                type: Boolean,
                required: true
            }
        }
    }
)

// membuat model product
const Product = mongoose.model("Product", productSchema)