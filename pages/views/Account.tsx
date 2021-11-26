import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
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
                <Formik
                    initialValues={{
                        email: "",
                        name: "",
                        id: "",
                        password: "",
                    }}
                    onSubmit={(value, helper) => {
                        fetch("/api/auth/sign-up", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                ...value,
                            }),
                        }).then((res) => {
                            console.log(res);
                        });
                        helper.setSubmitting(false);
                    }}
                >
                    {({ submitForm, isSubmitting }) => (
                        <Form>
                            <Field
                                component={TextField}
                                name="email"
                                type="email"
                                placeholder="이메일 주소"
                            />
                            <br />
                            <Field
                                component={TextField}
                                name="name"
                                type="text"
                                placeholder="성명"
                            />
                            <br />
                            <Field
                                component={TextField}
                                name="id"
                                type="text"
                                placeholder="사용자 이름"
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
                                가입
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

Account.getInitialProps = async function (context: NextPageContext) {
    const { query } = context;
    return { query };
};
