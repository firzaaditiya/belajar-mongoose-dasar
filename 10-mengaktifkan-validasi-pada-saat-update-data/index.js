const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ShopApp")
    .then((result) => {
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

/*
    ketika kita melakukan sebuah update data yang mana data nya tidak sesuai dengan yang ada pada schema, misalnya pada
    schema yang dibuat diatas ditentukan bahwa field "price" dan "stock" minimal nya adalah 0, namun ketika melakukan
    update dan kita set datanya menjadi negatif itu ternyata berhasil artinya validasi pada schema tidak aktif

    https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()

    ketika kita ingin validasi yang ada pada schema juga berlaku atau berjalan pada saat update data maka kita perlu
    menambahkan sebuah options property bernama "runValidators" dan memberikan nilai "true", ini juga berlaku pada
    method update lain seperti salah satunya "findByIdAndUpdate"
*/
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
})