const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ShopApp")
    .then((result) => {
        console.info("Connected to MongoDB")
    }).catch((err) => {
        console.info(err)
    })

/*
    kita bisa mengubah error validation message, dimana misal pada bagian field "stock" kita save/update data dengan data
    yang salah maka akan terjadi error dan pesan error nya itu bisa kita rubah atau custom sesuai keinginan kita

    dengan cara pada property validator seperti "min" kita ubah menjadi array [value, error_message], maka akan menjadi
    [0, "Pesan Error Sesuai Keinginan Kita"]
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

// membuat model product
const Product = mongoose.model("Product", productSchema)

// const product = new Product(
//     {
// 		"name": "Kemeja Flanel",
// 		"brand": "Hollister",
// 		"price": 750000,
// 		"color": "biru muda",
// 		"size": ["S", "M", "L"],
// 		"description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
// 		"condition": "Baru",
// 		"stock": 25,
// 		"availability": {
// 			"online": true,
// 			"offline": true
// 		}
// 	}
// )

// product.save().then((result) => {
//     console.info(result)
// }).catch((err) => {
//     console.info(err)
// })

Product.findOneAndUpdate(
    {
        name: "Kemeja Flanel"
    },
    {
        price: -150000,
        stock: -10
    },
    {
        new: true,
        runValidators: true
    }
).then((result) => {
    console.info(result)
}).catch((err) => {
    console.info(err)

    // mendapatkan data message error pada field stock
    console.info(err.errors.stock.properties.message)
})