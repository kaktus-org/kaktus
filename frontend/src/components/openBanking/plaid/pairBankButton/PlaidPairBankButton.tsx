import "./PlaidPairBankButton.css";
import { useCallback, useEffect, useState } from "react";
import { api } from "api";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "react-bootstrap";

export const PlaidPairBankButton = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [expiration, setExpiration] = useState(null);

  async function pairBank() {
    try {
      const response = await api.get("banking/get-link-token");

      setLinkToken(response.data.link_token);
      setExpiration(response.data.expiration);
    } catch (err) {
      console.log(err);
    }
  }

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      const data = { public_token: public_token, metadata: metadata };
      try {
        await api.post("banking/set-access-token", data);
      } catch (err) {
        console.log(err);
      }
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
        Pair Bank
      </Button>
    </div>
  );
};
