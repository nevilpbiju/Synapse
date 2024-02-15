import React from 'react';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import Loader from '../../components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { SignupValidation } from '../../lib/validation'; 
import { useCreateUserAccount, useSignInAccount } from '../../lib/react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';

const SignupForm = () => {
  const navigate= useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();

  
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const {mutateAsync: createUserAccount, isPending: isCreatingAccount} = useCreateUserAccount();
  const {mutateAsync: signInAccount, isPending: isLoading} = useSignInAccount();

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser= await createUserAccount(values);
    // Make an announcement of success or failure
    // console.log(newUser);
    if(!newUser){
      return;
    }
    const session= await signInAccount({
      email: values.email,
      password: values.password,
    });
    if(!session){
      alert('Registration failed, Please try again later');
      console.log('Signin failed'); 
      navigate("/sign-in");
      return;
    }

    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn){
      form.reset();
      sessionStorage.setItem('user', user.id);
      console.log(sessionStorage.getItem('user'));
      navigate('/');
    }else{
      alert('Registration failed, Please try again later');
      console.log('Sigup failed');
      return;
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className='mb-4'>
      <h2 className="text-2xl font-semibold mb-4">Welcome to SYNAPSE</h2>
      <div className="sm:hidden flex justify-center">
        <img src="/assets/images/logo.svg" alt="logo" className='object-scale-down h-20'/>
      </div>
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="name" {...register('name', { required: true })}
          className={`mt-1 p-2 w-full border rounded-md ${errors.name ? 'border-red-500' : ''}`} />
        {errors.name && <p className="text-red-500 text-xs">Name is required</p>}
      </div>

      {/* Change adding username */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">User name</label>
        <input type="text" id="username" {...register('username', { required: true })}
          className={`mt-1 p-2 w-full border rounded-md ${errors.username ? 'border-red-500' : ''}`} />
        {errors.username && <p className="text-red-500 text-xs">Username is required</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" {...register('email', { required: true })}
          className={`mt-1 p-2 w-full border rounded-md ${errors.email ? 'border-red-500' : ''}`} />
        {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" {...register('password', { 
            required: true,
            minLength: 8,
            pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
            message: 'Password must contain at least one numeric digit, one uppercase, one lowercase letter, and one special character'}})}
          className={`mt-1 p-2 w-full border rounded-md ${errors.password ? 'border-red-500' : ''}`} />
        {errors.password && <p className="text-red-500 text-xs">Password should have: <br/>
        At least 8 characters<br/> Contains at least one numeric digit <br/>
        Contains at least one uppercase letter <br/> Contains at least one lowercase letter <br/>
        Contains at least one special character (!@#$%^&*)</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input type="password" id="confirmPassword" {...register('confirmPassword', { 
          required: true, validate: (value, { password }) => value === password || "Passwords do not match"})} 
          className={`mt-1 p-2 w-full border rounded-md ${errors.confirmPassword ? 'border-red-500' : ''}`} />
          {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit" className="syn-button">
        {isLoading || isUserLoading ?(
          <div className="flex-center gap-2">
            <Loader />
          </div>
          ): "Register"}
      </button>
      <Link to="/sign-in" className="text-sm text-indigo-600 hover:underline pl-5">Already have an account?</Link>
    </form>
  );
};

export default SignupForm;
