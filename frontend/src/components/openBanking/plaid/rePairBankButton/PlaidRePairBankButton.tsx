import "./PlaidRePairBankButton.css";
import { useCallback, useEffect, useState } from "react";
import api from "api";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "react-bootstrap";

interface LinkToken {
  data: {
    link_token: string,
    expiration: string
  }
}

export const PlaidRePairBankButton = () => {
  const [linkToken, setLinkToken] = useState<null | string>(null);
  const [expiration, setExpiration] = useState<null | string>(null);
  const [bankAccountName, setBankAccountName] = useState("");

  async function pairBank() {
    try {
      const response: LinkToken = await api.get("banking/update-link-token?account_name=" + bankAccountName);

      setLinkToken(response.data.link_token);
      setExpiration(response.data.expiration);
    } catch (err) {
      console.log(err);
    }
  }

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log("Success re-pairing bank", public_token, metadata)
    },
    []
  );

  const config: PlaidLinkOptions = {
    token: linkToken!,
    onSuccess,
  };

  const { open, exit, ready } = usePlaidLink(config);

  useEffect(() => {
    if (ready) {
      open();
    }
  }, [ready, exit, open, expiration]);

  return (
    <div className="flex items-start">
      <div className="bg-burntOrange mx-auto px-3 py-3 rounded hover:bg-lightBlue transition-colors duration-300 inline-block m-1 cursor-pointer" onClick={pairBank}>
        Re-Pair Bank
      </div>
      <input
        type="text"
        className="flex-grow px-3 p-3 border border-gray-300 rounded m-1"
        value={bankAccountName}
        onChange={(e) => setBankAccountName(e.target.value)}
        required
      />
    </div>

  );
};
