import { NextPageContext } from "next";
import Head from "next/head";

type ProfileProps = {
    query: {
        title: string;
    };
};

export default function Profile(props: ProfileProps) {
    const { title } = props.query;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <p>Date and Time : {new Date()}</p>
            </div>
        </>
    );
}

Profile.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
