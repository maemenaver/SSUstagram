import { NextPageContext } from "next";
import Head from "next/head";

type AccountProps = {
    query: {
        title: string;
    };
};

export default function Account(props: AccountProps) {
    const { title } = props.query;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="이메일 주소"
                />
                <br />
                <input type="text" name="name" id="name" placeholder="성명" />
                <br />
                <input
                    type="text"
                    name="accountID"
                    id="accountID"
                    placeholder="사용자 이름"
                />
                <br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="비밀번호"
                />
                <br />
                <button>가입</button>
            </div>
        </>
    );
}

Account.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
