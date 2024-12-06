
const Loader = () => (
  <div className='flex h-screen w-screen flex-col items-center justify-center gap-2'>
    <img
      src='/loader.gif'
      alt='loader'
      className='object-contain w-[100px] h-[100px]'
    />
    <p className='text-sm font-bold text-primary-grey-300'>Loading...</p>
  </div>
);

export default Loader;
