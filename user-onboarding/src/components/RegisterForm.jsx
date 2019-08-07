import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'

import './RegisterForm.scss'

const RegisterForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    // // console.log(users);
    // console.log('Current status', status)

    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <div>
            <h1>Register</h1>
            <Form className='registerForm'>
                <Field type='text' name='username' placeholder='Username'/>
                {touched.username && errors.username && (
                    <p>{errors.username}</p>
                )}
                <Field type='email' name='email' placeholder='Email'/>
                {touched.email && errors.email && (
                    <p>{errors.email}</p>
                )}
                <Field type='password' name='password' placeholder='Password'/>
                {touched.password && errors.password && (
                    <p>{errors.password}</p>
                )}
                <label>
                    <Field type='checkbox' name='tos' checked={values.tos}/>
                    Accept TOS
                    {touched.tos && errors.tos && (
                    <p>{errors.tos}</p>
                    )}
                </label>
                <button type='submit'>Login</button>
            </Form>
            {
                users.map(user => {
                    return <h3 key={user.id}>{user.username}, {user.id}</h3>
                })
            }
        </div>
    )
}

const FormikRegisterForm = withFormik({
    mapPropsToValues({username, email, password, tos}) {
        return {
            username: username || '',
            email: email || '',
            password: password || '',
            tos: tos || false            
        }
    },

    validationSchema: Yup.object().shape({
        username: Yup.string().required('Username field is required'),
        email: Yup.string().email().required('Email field is required'),
        password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password field is required'),
        tos: Yup.boolean().oneOf([true], 'Oppsie')
    }),

    handleSubmit(values, {setStatus}) {
        console.log(values)
        axios
            .post('https://reqres.in/api/users/', values)
            .then(response => {
                setStatus(response.data)
            })
            .catch(error => {
                console.log(error.response)
            })
    }
})(RegisterForm)

export default FormikRegisterForm;