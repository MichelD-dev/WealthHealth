const Spinner = () => {
  const spinnerSize = 'w-40 h-40'
  const strokeWidth = 2

  return (
    <div className="flex translate-y-60 justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-gray-200 border-2 rounded-full"></div>
        <div className="w-20 h-20 border-[#96b400] border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  )
}

export default Spinner