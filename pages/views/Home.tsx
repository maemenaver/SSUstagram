import { Button, Card, CardContent, Pagination } from "@mui/material";
import { NextPageContext } from "next";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import axiosInstance from "../lib/axiosInstance";
import SwipeableViews from "react-swipeable-views";
import { Board } from "../../src/api/board/entities/board.entity";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { useEffect, useState } from "react";

type HomeProps = {
    query: {
        board: Board[];
    };
};

export default function Home(props: HomeProps) {
    const router = useRouter();
    const { board } = props.query;

    const [imageIndex, setImageIndex] = useState<{ [boardID: string]: number }>(
        {}
    );

    useEffect(() => {
        const imageIdx = {};

        board.map((v) => {
            imageIdx[v.id] = 0;
        });

        setImageIndex(imageIdx);
    }, []);

    return (
        <>
            <header>
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={(value, helper) => {
                        axiosInstance()
                            .post("/api/auth/sign-in", {
                                ...value,
                            })
                            .then((res) => {
                                // console.log(res);
                                // if (
                                //     res.data.roles.some(
                                //         (v) => v === "EmailVerified"
                                //     )
                                // ) {
                                //     props.router.replace("/home");
                                // } else {
                                //     props.router.reload();
                                // }
                            })
                            .catch((err) => {
                                console.log(err);
                                helper.setSubmitting(false);
                            });
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            <Field
                                component={TextField}
                                name="keyword"
                                type="text"
                                // autoComplete="username"
                                // placeholder="이메일 주소 또는 사용자 이름"
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                검색
                            </Button>
                        </Form>
                    )}
                </Formik>
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
            </header>
            <div>
                {board &&
                    board.map((data) => {
                        return (
                            <Card key={data.id}>
                                <CardContent>
                                    <SwipeableViews index={imageIndex[data.id]}>
                                        {data.image &&
                                            data.image.map((v, idx) => {
                                                console.log(v);
                                                return (
                                                    <img
                                                        key={`${data.id}_${idx}`}
                                                        src={`/${v}`}
                                                    />
                                                );
                                            })}
                                    </SwipeableViews>
                                    <Pagination
                                        count={data.image.length}
                                        page={imageIndex[data.id]}
                                        onChange={(event, v) => {
                                            setImageIndex({
                                                ...imageIndex,
                                                [data.id]: v - 1,
                                            });
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        );
                    })}
            </div>
        </>
    );
}

Home.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
