import { useCallback, useEffect, useState } from "react";
import api from "./axiosConfig";
import {
  PlaidLinkError,
  PlaidLinkOnExit,
  PlaidLinkOnExitMetadata,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "react-bootstrap";

export const Link = () => {
  const [linkToken, setLinkToken] = useState(null);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
      console.log(public_token);
      console.log(metadata);
      const data = { public_token: public_token };
      try {
        await api.post("bank/set-access-token", data);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const onExit = useCallback<PlaidLinkOnExit>(
    (err: PlaidLinkError | null, metadata: PlaidLinkOnExitMetadata) => {
      console.log(err);
      console.log(metadata);
    },
    []
  );

  const config: PlaidLinkOptions = {
    token: linkToken!,
    onSuccess,
    onExit,
  };

  async function pairBank() {
    const token = await getLinkToken();
    setLinkToken(token);

    console.log(token);
  }

  async function getLinkToken() {
    try {
      const response = await api.get("/bank/get-link-token");

      return response.data.link_token;
    } catch (err) {
      console.log(err);
    }
  }

  const { open, exit, ready } = usePlaidLink(config);

  return (
    <div>
      <div>
        <Button type="button" onClick={pairBank}>
          get Link
        </Button>
      </div>
      <div>
        <Button type="button" onClick={() => open()} disabled={!ready}>
          Launch Link
        </Button>
      </div>
    </div>
  );
};
