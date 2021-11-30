import { NextPageContext } from "next";

type ProfileProps = {
    query: {
        username: string;
    };
};

export default function Profile(props: ProfileProps) {
    const { username } = props.query;
    return (
        <>
            <div>
                <p>{username}</p>
                <p>Date and Time : {new Date().toISOString()}</p>
            </div>
        </>
    );
}

Profile.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
