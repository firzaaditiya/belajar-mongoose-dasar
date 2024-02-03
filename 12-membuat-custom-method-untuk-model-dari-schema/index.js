const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ShopApp").then((result) => {
    console.info("Connected to MongoDB")
}).catch((err) => {
    console.info(err)
})

/*
    pada sebuah schema kita tidak hanya mendefisinikan sebuah property, type, validator namun kita juga bisa mendefinisikan
    sebuah method yang nanti akan digunakan oleh modelnya, ini adalah sebuah method yang mempermudah kita ketika kita ingin
    membuat sebuah query untuk melakukan sebuah perubahan dokumen atau data 
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
            min: [0, "Nilai stock tidak boleh minus"]
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

/*
    membuat custom method pada schema "productSchema", setelah property "methods" akan diikuti dengan nama dari
    "custom method" yang ingin kita buat

    logic perubahan data
*/
productSchema.methods.outStock = function() {
    this.stock = 0

    this.availability.online = false
    this.availability.offline = false

    // melakukan update
    return this.save()
}

// membuat model product
const Product = mongoose.model("Product", productSchema)

/*
    disini kita menggunakna async & await karena ini berhubungan dengan database dan kita harus memastikan bahwa prosesnya
    satu per satu selesai

    logic pengeksekusian query
*/
const changeStock = async (id) => {
    // mencari product
    const foundProduct = await Product.findById(id)

    // mengupdate product stock menjadi 0
    await foundProduct.outStock()

    console.info("Berhasil Dirubah")
}

changeStock("65b3b9f76dc8ad0379d96240")