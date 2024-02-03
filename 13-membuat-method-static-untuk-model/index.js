const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ShopApp").then((result) => {
    console.info("Connected to MongoDB")
}).catch((err) => {
    console.info(err)
})

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

productSchema.methods.outStock = function() {
    this.stock = 0

    this.availability.online = false
    this.availability.offline = false

    return this.save()
}

/*
    kita juga bisa membuat sebuah static method untuk model jadi kita tidak perlu membuat sebuah instance untuk menggunakan
    method yang dimiliki oleh schema

    untuk membuat ini sama seperti membuat custom method untuk model, namun kali ini kita perlu menambahkan sebuah
    keyword "statics" lalu diikuti nama function nya yang akan dibuat
*/
productSchema.statics.closeStore = function() {
    // logic yang akan digunakan ketika method ini dipanggil oleh model nya
    return this.updateMany(
        {},
        {
            stock: 0,
            "availability.online": false,
            "availability.offline": false,
        }
    )
}

// membuat model product
const Product = mongoose.model("Product", productSchema)


// menjalankan method static yang dimiliki oleh model, maka data stock dan availibility akan terupdate
Product.closeStore().then((result) => {
    console.info(result)
}).catch((err) => {
    console.info(err)
})