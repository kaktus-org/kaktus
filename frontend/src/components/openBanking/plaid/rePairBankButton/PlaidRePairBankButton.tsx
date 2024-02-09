import "./PlaidRePairBankButton.css";
import { useCallback, useState } from "react";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";
import { PlaidLinkButtonTemplate } from "components/openBanking/plaid/linkTemplateButton"

export const PlaidRePairBankButton = () => {
  const [bankAccountName, setBankAccountName] = useState("");

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log("Success re-pairing bank", public_token, metadata)
    },
    []
  );

  return (
    <div className="">
      <PlaidLinkButtonTemplate buttonText={"Re-Pair Bank"} getLinkEndpoint={`banking/update-link-token?account_name=` + bankAccountName} onSuccess={onSuccess} />
      <input
        type="text"
        className="flex-grow mx-auto px-4 py-2 border border-gray-300 rounded m-1"
        value={bankAccountName}
        onChange={(e) => setBankAccountName(e.target.value)}
        required
      />
    </div>

  );
};
