import 'react-multi-carousel/lib/styles.css';
import banner from '../../assets/image/banners/banner.png'

export default function Banner() {
  return (
    <div className='w-full h-full flex items-center justify-center p-5 shadow-2xl'>
        <img src={banner} alt="banner"/>
    </div>
  )
}
