import '@styles/global.scss';
import Navbar from '@component/navbar/navbar';

const RootLayout = ({children}) => {
  return (
    <html className='html'>
      <body className='body'>
        <Navbar />
        <main>{children}</main>
      </body>

    </html>
  )
}

export default RootLayout