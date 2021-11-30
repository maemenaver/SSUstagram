import { Button } from "@mui/material";
import { NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";
import axiosInstance from "../lib/axiosInstance";

type HomeProps = {
    query: {
        title: string;
    };
};

export default function Home(props: HomeProps) {
    const router = useRouter();

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
                <Button
                    onClick={() => {
                        axiosInstance()
                            .post("/api/auth/sign-out")
                            .then((res) => {
                                router.replace("/");
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }}
                >
                    Logout
                </Button>
            </nav>
            <div></div>
        </>
    );
}

Home.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
