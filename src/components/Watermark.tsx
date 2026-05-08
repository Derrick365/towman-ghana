/* Global brand watermark — subtle fixed logo shown on every page (except inside the navbar).
   Pointer-events disabled so it never interferes with interaction. Hidden from screen readers. */
import logo from "@/assets/logo.png";

const Watermark = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed bottom-3 right-3 z-[1] opacity-10 hover:opacity-20 transition-opacity print:hidden"
  >
    <img
      src={logo}
      alt=""
      width={64}
      height={64}
      className="w-12 h-12 sm:w-16 sm:h-16 select-none"
    />
  </div>
);

export default Watermark;