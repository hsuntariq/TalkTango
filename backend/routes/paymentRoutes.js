const express = require('express');
const router = express.Router();
const stripe = require('stripe')('sk_test_51MycIqD2171rDQ1bM2Vo43LraZJVqjoKBvTbP7yl52C5ShEqWmsSrT7kktdyrtUAuRwrOD8HRmqXnfFOXPULc7Xr00A9NYeUOU')

router.post('/api/checkout', async (req, res) => {
    let item = req.body.item;
    const lineItems = [
        {
            price_data: {
                currency: 'USD',
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100, // Amount should be in cents
            },
            quantity: 1,
        },
    ];

    try {
        const stripeSession = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5173/home',
            cancel_url: 'http://127.0.0.1:5173/cancel',

        })

        res.send(JSON.stringify({
            url: stripeSession.url
        }))
    } catch (error) {
        res.send('an error orrured:' + error)
    }

})



module.exports = router