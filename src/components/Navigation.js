import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {
  return (
    <nav>
      <div className="nav__brand">
        <h1>Dappcord</h1>
      </div>
      <button type="button" className="nav__connect">
        Connect
      </button>
    </nav>
  );
};

export default Navigation;
