import { Button } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-mui";
import { NextRouter } from "next/dist/client/router";
import axiosInstance from "../lib/axiosInstance";

interface SignInProps {
    router: NextRouter;
}

export default function SignIn(props: SignInProps) {
    return (
        <>
            <div>
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
                                console.log(res);
                                if (
                                    res.data.roles.some(
                                        (v) => v === "EmailVerified"
                                    )
                                ) {
                                    props.router.replace("/home");
                                } else {
                                    props.router.reload();
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                if (
                                    err?.error?.response?.data?.includes(
                                        `"message":"Password is wrong"`
                                    )
                                ) {
                                    alert("Password is wrong");
                                }
                                if (
                                    err?.error?.response?.data?.includes(
                                        `"message":"User Not Found"`
                                    )
                                ) {
                                    alert("User Not Found");
                                }
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
                                autoComplete="username"
                                placeholder="????????? ?????? ?????? ????????? ??????"
                            />
                            <br />
                            <Field
                                component={TextField}
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="????????????"
                            />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                ?????????
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                ????????? ???????????????? <a href="/account">????????????</a>
            </div>
            <div>
                ???????????? ????????? ?????????
                <img src="https://picsum.photos/200/300" />
            </div>
        </>
    );
}
