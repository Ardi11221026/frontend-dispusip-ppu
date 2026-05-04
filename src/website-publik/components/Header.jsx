import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';

export default function Header() {
  return (
    <>
      <div className="hidden md:block sticky top-0 z-50">
        <HeaderDesktop />
      </div>
      <div className="md:hidden">
        <HeaderMobile />
      </div>
    </>
  );
}

