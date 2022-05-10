import { useSelector } from 'react-redux'

const Checkout = () => {
  const cartState = useSelector((state) => state.cart)
  const cartItems = cartState.cartItems

  const onSubmitHandler = (e) => {
    e.preventDefault()
    fetch(`${process.env.SERVER_URL}/create-checkout-session`, {
      method: 'POST',
      body: JSON.stringify(cartItems),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (res.ok) return res.json()
        const err = await res.json()
        return await Promise.reject(err)
      })

      .then(({ url }) => {
        window.location.href = url
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <form onSubmit={(e) => onSubmitHandler(e)}>
        <button
          className='btn btn-danger'
          type='submit'
          disabled={cartItems.length === 0}
        >
          Checkout
        </button>
      </form>
    </div>
  )
}

export default Checkout
