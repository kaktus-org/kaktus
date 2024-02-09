import "./PlaidPairLiabilityButton.css";
import { useCallback, } from "react";
import api from "api";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";
import { PlaidLinkButtonTemplate } from "components/openBanking/plaid";

const PlaidPairLiabilityButton = () => {

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      const data = { public_token: public_token, metadata: metadata };
      try {
        await api.post("banking/access-token", data);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  return (
    <PlaidLinkButtonTemplate buttonText="Pair Liability" getLinkEndpoint="banking/liability-link-token" onSuccess={onSuccess} />
  );
};

export default PlaidPairLiabilityButton;