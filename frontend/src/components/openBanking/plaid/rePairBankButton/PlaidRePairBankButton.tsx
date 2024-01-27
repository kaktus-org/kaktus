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
    <div>
      <Button type="button" onClick={pairBank}>
        Re-Pair Bank
      </Button>
      <input
        type="text"
        value={bankAccountName}
        onChange={(e) => setBankAccountName(e.target.value)}
        required
      />
    </div>
  );
};
