export const contentComponents = {
  h2: (props: any) => <h3 className=' text-lg sm:text-xl' {...props} />,
  h3: (props: any) => <h3 className='font-bold text-base sm:text-lg' {...props} />,
  a: (props: any) => <a className='text-orange-900 hover:text-orange-700 underline' {...props} />,
  p: (props: any) => <p className="w-full" {...props}></p>,
  ul: (props: any) => <ul className="list-disc list-inside" {...props}></ul>
};
