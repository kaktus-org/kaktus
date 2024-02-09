import "./LinkButtonTemplate.css"
import { useEffect, useState } from "react";
import api from "api";
import {
    PlaidLinkOnSuccess,
    PlaidLinkOptions,
    usePlaidLink,
} from "react-plaid-link";

interface LinkToken {
    data: {
        link_token: string,
        expiration: string
    }
}

interface Props {
    getLinkEndpoint: string,
    onSuccess: PlaidLinkOnSuccess,
    buttonText: string
}

const PlaidLinkButtonTemplate = ({ getLinkEndpoint, onSuccess, buttonText }: Props) => {
    const [linkToken, setLinkToken] = useState<null | string>(null);
    const [expiration, setExpiration] = useState<null | string>(null);

    async function pairBank() {
        try {
            const response: LinkToken = await api.get(getLinkEndpoint);

            setLinkToken(response.data.link_token);
            setExpiration(response.data.expiration);
        } catch (err) {
            console.log(err);
        }
    }

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
        <div className="bg-burntOrange mx-auto px-4 py-2 text-white rounded hover:bg-lightBlue transition-colors duration-300 inline-block cursor-pointer" onClick={pairBank}>
            {buttonText}
        </div>
    );
};

export default PlaidLinkButtonTemplate;