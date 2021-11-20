import { NextPageContext } from "next";
import Head from "next/head";

type IndexProps = {
    query: {
        title: string;
    };
};

export default function Index(props: IndexProps) {
    const { title } = props.query;
    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <input
                    type="text"
                    name="accountID"
                    id="accountID"
                    placeholder="이메일 주소 또는 사용자 이름"
                />
                <br />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="비밀번호"
                />
                <br />
                <button>로그인</button>
            </div>
            <div>
                계정이 없으신가요? <a href="">회원가입</a>
            </div>
        </>
    );
}

Index.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
