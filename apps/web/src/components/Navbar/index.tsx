import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import darkLogo from "../../assets/logo/dark.svg";

const Logo = () => {
  return (
    <div className="flex gap-2 align-middle center">
      <img src={darkLogo} className="w-12" alt="Your SVG" />
      <h3 className="text-xl">zyme</h3>
    </div>
  );
};

function Navbar() {
  return (
    <nav className="bg-black text-white px-4 py-4 fixed w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div>
          <SignedOut>
            <div className="text-white px-3 py-1 rounded text-base">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="text-white px-3 py-1 rounded text-base">
              <SignOutButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
