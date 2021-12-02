import { NextPageContext } from "next";

type FollowProps = {
    query: {
        // username: string;
    };
};

export default function Follow(props: ProfileProps) {
    // const { username } = props.query;
    return (
        <>
            <div>
                <p>template</p>
            </div>
        </>
    );
}

Follow.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
