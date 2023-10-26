import { useEffect } from "react";
import api from "./axiosConfig";
import { PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { Button } from "react-bootstrap";

export const Link = () => {
  const config: PlaidLinkOptions = {
    token: "",
    onSuccess: getAccessToken,
  };

  async function pairBank() {
    config.token = await getLinkToken();

    console.log(config.token);
  }

  async function getLinkToken() {
    try {
      const response = await api.get("/bank/get-link-token");

      return response.data.link_token;
    } catch (err) {
      console.log(err);
    }
  }

  function getAccessToken(publicToken: string) {}

  if (window.location.href.includes("?oauth_state_id=")) {
    // TODO: figure out how to delete this ts-ignore
    // @ts-ignore
    config.receivedRedirectUri = window.location.href;
  }
  const { open, ready } = usePlaidLink(config);

  config.receivedRedirectUri = window.location.href;

  return (
    <div>
      <Button type="button" onClick={pairBank}>
        get Link
      </Button>
      <Button type="button" onClick={() => open()} disabled={!ready}>
        Launch Link
      </Button>
    </div>
  );
};
