import React from 'react'
import './style.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import {
    Container,
    Grid,
    Spinner,
    useToast,
    Heading
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import AddnewPost from '../Components/AddnewPost';
const dev = 'http://localhost:8000';
const baseURL = window.location.hostname.split(':')[0] === 'localhost' ? dev : ""
const fetchPost = async () => {
    try {
        const { data } = await axios.get(`${baseURL}/api/v1/posts`)
        return data;
    }
    catch (error) {
        throw Error("unable to fetch post")
    }
}
const Home = () => {
    const toast = useToast();
    const history = useNavigate();
    const { data, isLoading } = useQuery('posts', fetchPost, {
        onError: (error) => {
            toast({ status: "error", title: error.message })
        }
    })
    console.log(data)
    return (
        <Container maxWidth="1300px" mt="4">
            <AddnewPost />
            <Heading> Post </Heading>
            {
                isLoading ? (
                    <Grid placeItems="center" height="100vh"><Spinner /></Grid>
                ) :
                    (
                        <>

                            <table>
                                <tr>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>DESCRIPTION</th>
                                </tr>
                                {data.map((post) => (
                                    <tr key={post._id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.description}</td>
                                    </tr>
                                ))}
                            </table>

                        </>
                    )
            }

        </Container>
    )
}

export default Home
