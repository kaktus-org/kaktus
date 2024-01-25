import LoginForm from "components/login";
import { PairBankButton, RePairBankButton } from "components/openBanking/OpenBanking";

export const Home = () => {
  return (
    <div>
      <div className="text-3xl font-bold underline">Home</div>
      <PairBankButton />
      <RePairBankButton />
      <LoginForm />
    </div>
  );
};
