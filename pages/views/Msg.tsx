import { NextPageContext } from "next";

type MessageProps = {
    query: {
        // username: string;
    };
};

export default function Msg(props: MessageProps) {
    // const { username } = props.query;
    return (
        <>
            <div>
                <p>template</p>
            </div>
        </>
    );
}

Msg.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
