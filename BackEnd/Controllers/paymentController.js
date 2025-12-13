//POST //api /payment/chckout

const Stripe = require("stripe");
const Product = require("../Model/product");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//POST/ api/payment/checkout
exports.createCheckoutSession = async (req, res) => {
    try{
        const { cartItems } = req.body; //Array: [{ productId, quantity}]

        //fetch product details from DB
        const line_items = await Promise.all(
            cartItems.map(async (item) => {
                const product = await Product.findById(item.productId);
                if(!product) throw new Error("product not found");

                return{
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: product.name,
                            // description: product.description,
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: item.quantity,
                };
            })
        );



        //create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode:"payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.status(200).json({ url: session.url});
    } catch (err) {
        console.error("stripe error:", err.message);
        res.status(500).json({ error: "Payment session creation failed"});
    }
};

//cash on delivery controller
exports.cashOnDelivery = async (req, res) => {
    try{

                const {cartItems, user} = req.body;

                //basic varification
                if(!cartItems || cartItems.length === 0 ) {
                    return res.status(400).json({error: "caert is empty"});
                }

                // you can save order to DB here if needed
                //for now, just respond success

                res.status(200).json({
                    status: "success",
                    message: "order placed successfully with cash on delivery",
                    orderDetails: {
                        user,
                        cartItems,
                        paymentMethod: "COD",
                    },
                });
            }catch(err){
                console.error("COD error:", err.message);
                res.status(500).json({ error: "failed to place COD order"});
            }
            };   
        