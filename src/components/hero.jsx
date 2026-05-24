import { FaSkull } from 'react-icons/fa'

function Hero() {
  return (
    <div
      className='h-[500px] bg-cover bg-center relative flex items-center justify-center'
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)',
      }}
    >
      <div className='absolute inset-0 bg-black/80'></div>

      <div className='relative z-10 text-center px-6'>
        <FaSkull className='text-red-700 text-6xl mx-auto mb-5 animate-pulse' />

        <h1 className='logo-text text-5xl md:text-6xl font-bold text-white'>
          THE MOST HIGH
        </h1>

        <p className='mt-5 text-base text-gray-300 max-w-xl mx-auto leading-7'>
          Enter the darkest online marketplace for premium products.
        </p>

        <button className='mt-8 bg-red-700 hover:bg-red-900 transition px-6 py-3 rounded-xl text-base font-semibold'>
          ENTER THE MARKET
        </button>
      </div>
    </div>
  )
}

export default Hero