import "./PlaidPairBankButton.css";
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

export const PlaidPairBankButton = () => {
  const [linkToken, setLinkToken] = useState<null | string>(null);
  const [expiration, setExpiration] = useState<null | string>(null);

  async function pairBank() {
    try {
      const response: LinkToken = await api.get("banking/link-token", true);

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
        await api.post("banking/access-token", true, data);
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
