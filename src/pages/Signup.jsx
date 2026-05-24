function Signup() {
  return (
    <div className='max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow'>
      <h1 className='text-3xl font-bold mb-6'>Create Account</h1>

      <input
        type='text'
        placeholder='Full Name'
        className='w-full border p-3 mb-4 rounded'
      />

      <input
        type='email'
        placeholder='Email'
        className='w-full border p-3 mb-4 rounded'
      />

      <input
        type='password'
        placeholder='Password'
        className='w-full border p-3 mb-4 rounded'
      />

      <button className='bg-yellow-400 w-full py-3 rounded font-bold'>
        Sign Up
      </button>
    </div>
  )
}

export default Signup