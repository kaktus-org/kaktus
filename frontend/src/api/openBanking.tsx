import { useCallback, useEffect, useState } from "react";
import api from "./axiosConfig";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "react-bootstrap";

export const Link = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [expiration, setExpiration] = useState(null);

  async function pairBank() {
    try {
      const response = await api.get("/bank/get-link-token");

      setLinkToken(response.data.link_token);
      setExpiration(response.data.expiration);
    } catch (err) {
      console.log(err);
    }
  }

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      const data = { public_token: public_token };
      try {
        await api.post("bank/set-access-token", data);
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
