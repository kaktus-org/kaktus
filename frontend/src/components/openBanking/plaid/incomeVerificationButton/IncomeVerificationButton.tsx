import "./IncomeVerificationButton.css";
import { useCallback, } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";
import { PlaidLinkButtonTemplate } from "components/openBanking/plaid";

const PlaidIncomeVerificationButton = () => {
  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      const data = { public_token: public_token, metadata: metadata };
      try {
        console.log(public_token, metadata)
        // await api.post("banking/access-token", data);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  return (
    <PlaidLinkButtonTemplate buttonText="Verify Income" getLinkEndpoint="banking/income-link-token" onSuccess={onSuccess} />
  );
};

export default PlaidIncomeVerificationButton;