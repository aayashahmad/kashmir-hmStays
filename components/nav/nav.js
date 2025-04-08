import { useRouter } from "next/router";
const Nav = () => {
  const router = useRouter();
  return (
    <div className="Navbar">
      <div className='image_text' onClick={() => router.push('/')}>
        <div className='image'>
          <h1 style={{cursor:"pointer"}}>Kashmir HomeStays</h1>
        </div>
        <div className='text'>
          <span onClick={() => router.push('./nav-details/our')}>Our story</span>
          <span onClick={() => router.push('./nav-details/member')}>Membership</span>
          <span onClick={() => router.push('./nav-details/right')}>Write</span>
          <span onClick={() => router.push('./nav-details/sign')}>Sign In</span>
          <div className='text_button'>
            <button onClick={() => router.push('./nav-details/started')}>Get started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nav;