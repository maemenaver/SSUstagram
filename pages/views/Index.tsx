import { Button } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";

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
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={(value, helper) => {
                        axios
                            .post("/api/auth/sign-in", {
                                ...value,
                            })
                            .then((res) => {
                                console.log(res);
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
                                name="username"
                                type="text"
                                placeholder="이메일 주소 또는 사용자 이름"
                            />
                            <br />
                            <Field
                                component={TextField}
                                name="password"
                                type="password"
                                placeholder="비밀번호"
                            />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                로그인
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                계정이 없으신가요? <Link href="/account">회원가입</Link>
            </div>
        </>
    );
}

Index.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
