import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";

type HomeProps = {
    query: {
        title: string;
    };
};

export default function Home(props: HomeProps) {
    const { title } = props.query;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <nav>
                <Link href="/home">Home</Link>
                <Link href="/new">New</Link>
                <Link href="/profile">Profile</Link>
                <Link href="/follow">Follow</Link>
                <Link href="/msg">Message</Link>
                <Link href="/logout">Logout</Link>
            </nav>
            <div></div>
        </>
    );
}

Home.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
