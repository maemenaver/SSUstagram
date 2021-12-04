import {
    Button,
    Card,
    CardContent,
    Container,
    FormControlLabel,
    Pagination,
    Radio,
} from "@mui/material";
import { NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import axiosInstance from "../lib/axiosInstance";
import SwipeableViews from "react-swipeable-views";
import { Board } from "../../src/api/board/entities/board.entity";
import { Field, Form, Formik } from "formik";
import { RadioGroup, TextField } from "formik-mui";
import { useEffect, useState } from "react";
import moment from "moment";
import { FindAllArgDto } from "../../src/api/board/dto/board.dto";
import { User } from "../../src/api/user/entities/user.entity";

type HomeProps = {
    query: {
        board: Board[];
        boardLength: number;
        user: User;
    };
    imagePage: {
        [boardID: string]: number;
    };
    skip: number;
    reqQuery: FindAllArgDto;
};

export default function Home(props: HomeProps) {
    const router = useRouter();
    const { reqQuery, query } = props;
    const { board, user } = query;
    const [imagePage, setImagePage] = useState(props.imagePage);

    return (
        <>
            <Container maxWidth="md">
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        width: "900px",
                    }}
                >
                    {board &&
                        board.map((data) => {
                            return (
                                <Card key={data.id} sx={{ width: 250 + 33 }}>
                                    <CardContent>
                                        <SwipeableViews
                                            index={imagePage[data.id] - 1}
                                        >
                                            {data.image &&
                                                data.image.map((v, idx) => {
                                                    // console.log(v);
                                                    return (
                                                        <img
                                                            key={`${data.id}_${idx}`}
                                                            src={`/${v}`}
                                                            width={250}
                                                            height={250}
                                                        />
                                                    );
                                                })}
                                        </SwipeableViews>
                                        <Pagination
                                            hideNextButton
                                            hidePrevButton
                                            count={data.image.length}
                                            page={imagePage[data.id]}
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                            onChange={(event, v) => {
                                                imagePage[data.id] = v;
                                                setImagePage({
                                                    ...imagePage,
                                                    [data.id]: v,
                                                });
                                                // console.log(imageIndex);
                                            }}
                                        />
                                        <div>
                                            <div>
                                                <Link
                                                    href={`/home?userID=${data.authorID}`}
                                                >
                                                    {data.authorID}
                                                </Link>
                                                {` ${moment(
                                                    data.createdAt
                                                ).format("YYYY. M. D. HH:mm")}`}
                                            </div>
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: data.content,
                                                }}
                                            ></div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "end",
                                                }}
                                            >
                                                {user.id === data.authorID && (
                                                    <Button
                                                        onClick={() => {
                                                            router.push(
                                                                `/edit?id=${data.id}`
                                                            );
                                                        }}
                                                    >
                                                        수정
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                </div>
                <div>
                    <Pagination
                        count={Math.ceil(props.query.boardLength / 9)}
                        page={Math.floor(props.skip / 9) + 1}
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                        onChange={(event, v) => {
                            let urlQuery = `skip=${(v - 1) * 9}`;
                            Object.keys(reqQuery).forEach((v) => {
                                if (v === "skip") return;
                                urlQuery += `&${v}=${reqQuery[v]}`;
                            });
                            router.push(`/home?${urlQuery}`);
                        }}
                    />
                </div>
            </Container>
        </>
    );
}

Home.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;

    const reqQuery = context.req["query"];
    const skip = reqQuery?.skip ?? 0;

    const { board } = query as any;

    const imagePage = {};

    board.map((v: Board) => {
        imagePage[v.id] = 1;
        if (v.hashtag && v.hashtag.length > 0) {
            let hashtags = v.hashtag.join("|");

            const hashtagRegex = RegExp(`#(${hashtags}*)`, "g");
            v.content = v.content.replaceAll(hashtagRegex, (tag) => {
                return `<a href="/home/?hashtagEqual=${tag.replace(
                    "#",
                    ""
                )}">${tag}</a>`;
            });
        }
    });

    return { query, imagePage, skip, reqQuery };
};
