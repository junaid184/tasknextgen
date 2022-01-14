import React from 'react'
import { Form, Formik } from "formik";
import { InputControl, SubmitButton, TextareaControl } from "formik-chakra-ui"
import { Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';
const dev = 'http://localhost:8000';
const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
const AddnewPost = () => {
    const toast = useToast();
    return (

        <Formik initialValues={{ id: "", title: "", description: "" }}
            onSubmit={async (values) => {
                console.log(values)
                axios.post(`${baseURL}/api/v1/post`, {
                    id: values.id,
                    title: values.title,
                    description: values.description
                }).then((res) => {
                    toast({ status: "success", title: res })
                })
                    .catch((e) => {
                        toast({ status: "error", title: e.message })
                    })
            }}
        >
            <Form>
                <Heading fontSize="2xl" textAlign="center">
                    Add New Post
                </Heading>
                <InputControl name="id" label="ID" />
                <InputControl name="title" label="Title" />
                <TextareaControl name="description" label='Description' />
                <SubmitButton>Add Post</SubmitButton>
            </Form>

        </Formik>

    )
}

export default AddnewPost
