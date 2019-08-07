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
                <Field type='text' name='username' placeholder='Username' className='registerFormField'/>
                {touched.username && errors.username && (
                    <p className='errorMessage'>{errors.username}</p>
                )}
                <Field type='email' name='email' placeholder='Email' className='registerFormField'/>
                {touched.email && errors.email && (
                    <p className='errorMessage'>{errors.email}</p>
                )}
                <Field type='password' name='password' placeholder='Password' className='registerFormField'/>
                {touched.password && errors.password && (
                    <p className='errorMessage'>{errors.password}</p>
                )}
                <label className='registerFormField'>
                    <Field type='checkbox' name='tos' checked={values.tos}/>
                    Accept TOS
                    {touched.tos && errors.tos && (
                    <p className='errorMessage'>{errors.tos}</p>
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
        username: Yup.string().required('Username is a required field'),
        email: Yup.string().email().required('Email is a required field'),
        password: Yup.string().min(6, 'Password must be 6 characters or longer').required('Password is a required field'),
        tos: Yup.boolean().oneOf([true], 'Please accept our TOS')
    }),

    handleSubmit(values, {setStatus, resetForm}) {
        console.log(values)
        axios
            .post('https://reqres.in/api/users/', values)
            .then(response => {
                setStatus(response.data)
                resetForm();
            })
            .catch(error => {
                console.log(error.response)
            })
    }
})(RegisterForm)

export default FormikRegisterForm;