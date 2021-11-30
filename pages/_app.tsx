import axios from "axios";
import App, { AppContext } from "next/app";
import { useEffect } from "react";
import axiosInstance from "./lib/axiosInstance";

export default function AppRoot({ Component, pageProps }) {
    useEffect(() => {
        if (pageProps.setAuthorization) {
            axios.defaults.headers["authorization"] =
                pageProps.setAuthorization;
        }
    }, []);

    return <Component {...pageProps} />;
}

AppRoot.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);

    const cookie = appContext?.ctx?.req?.headers?.cookie?.split("=");
    const isToken = cookie?.indexOf("access_token");

    if (!appContext.ctx.req.headers.authorization && isToken > -1) {
        const authorization = "Bearer " + cookie[isToken + 1];
        appProps.pageProps.setAuthorization = authorization;
    }

    return { ...appProps };
};
