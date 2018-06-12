const publicStripeKey = 'pk_test_JKYPSQvNh8M2p1ahEPB7Bp0s'
const purchaseData = {
    amount: 0
}

var handler = StripeCheckout.configure({
    key: publicStripeKey,
    image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
    locale: 'auto',
    token: function (token) {
        const payload = {
            stripeToken: token.id,
            amount: purchaseData.amount
        }
        fetch('https://cch-stripe-drill.herokuapp.com/accept-payment', {
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.failure_code) {
                    displayError(new Error('There was an error processing your card'))
                } else {
                    const charge = res.amount / 100
                    const message = `Your card was charged $${charge}`
                    const status = document.querySelector('#paid-status')
                    status.innerHTML = message;
                }
            })
            .catch(displayError)
    }
})


document.querySelector('#tuition-payment').addEventListener('submit', function (e) {
    e.preventDefault()

    const form = new FormData(e.target)
    const pennies = Number(form.get('amount'))
    const amount = pennies * 100

    purchaseData.amount = amount

    if (amount) {
        handler.open({
            name: 'Galvanize',
            description: 'Tuition payment',
            amount
        })
    }
})

window.addEventListener('popstate', function () {
    handler.close();
})

function displayError(err) {
    const status = document.querySelector('#paid-status')
    const message = `There was an error processing your credit card: ${err.message}`
    status.innerHTML = message
}