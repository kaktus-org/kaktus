import { PairBankButton } from "components/openBanking/OpenBanking";
import { RePairBankButton } from "components/openBanking/OpenBanking";

const Home = () => {
  return (
    <div>
      <div className="text-3xl font-bold underline">Home</div>
      <PairBankButton />
      <RePairBankButton />
    </div>
  );
};

export default Home