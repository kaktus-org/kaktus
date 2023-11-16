import Header from "components/Header";
import { PairBankButton } from "components/openBanking/OpenBanking";
import RegistrationForm from "components/registration";

export const Home = () => {
  return (
    <div>
      <Header />
      <div className="text-3xl font-bold underline">Home</div>
      <PairBankButton />
      <RegistrationForm />
    </div>
  );
};
