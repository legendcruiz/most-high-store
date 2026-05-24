function Footer() {
  return (
    <footer>
      
      <div className='bg-[#37475A] text-center py-4 cursor-pointer'>
        Back to top
      </div>

      <div className='bg-[#232F3E] text-white'>
        <div className='max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-10'>
          
          <div>
            <h2 className='font-bold mb-4'>Get To Know Us</h2>
            <p className='text-sm text-gray-300'>About Us</p>
            <p className='text-sm text-gray-300'>Careers</p>
            <p className='text-sm text-gray-300'>Blog</p>
          </div>

          <div>
            <h2 className='font-bold mb-4'>Make Money</h2>
            <p className='text-sm text-gray-300'>Sell Products</p>
            <p className='text-sm text-gray-300'>Affiliate</p>
            <p className='text-sm text-gray-300'>Advertise</p>
          </div>

          <div>
            <h2 className='font-bold mb-4'>Policies</h2>
            <p className='text-sm text-gray-300'>Terms & Conditions</p>
            <p className='text-sm text-gray-300'>Privacy Policy</p>
            <p className='text-sm text-gray-300'>Cookies</p>
          </div>

          <div>
            <h2 className='font-bold mb-4'>Support</h2>
            <p className='text-sm text-gray-300'>Help Center</p>
            <p className='text-sm text-gray-300'>Orders</p>
            <p className='text-sm text-gray-300'>Returns</p>
          </div>
        </div>

        <div className='border-t border-gray-700 text-center py-6 text-sm text-gray-400'>
          © 2026 THE MOST HIGH
        </div>
      </div>
    </footer>
  )
}

export default Footer