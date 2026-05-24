function CategoryBar() {
  const categories = [
    'Phones',
    'Fashion',
    'Gaming',
    'Electronics',
    'Shoes',
  ]

  return (
    <div className='flex gap-4 overflow-auto py-4'>
      {categories.map((cat) => (
        <button
          key={cat}
          className='bg-white shadow px-6 py-2 rounded-full'
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar