import React from 'react';

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import Loader from '../../components/shared/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { SignupValidation as SigninValidation } from '../../lib/validation'; 
import { useSignInAccount } from '../../lib/react-query/queriesAndMutations';
import { useUserContext } from '../../context/AuthContext';

const SigninForm = () => {
  const navigate= useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { checkAuthUser, isLoading: isUserLoading, user} = useUserContext();

  
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {mutateAsync: signInAccount} = useSignInAccount();

  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    // Make an announcement of success or failure
    // console.log(newUser);
    const session= await signInAccount({
      email: values.email,
      password: values.password,
    });
    if(!session){
      alert('Login failed, Please try again later');
      console.log('Signin failed');
      navigate("/sign-in");
      return;
    }

    const isLoggedIn = await checkAuthUser();
    if(isLoggedIn){
      form.reset();
      // sessionStorage.setItem('user', user.id);
      // console.log(sessionStorage.getItem('user'));
      navigate('/');
    }else{
      alert('Login failed, Please try again later');
      console.log('Sigup failed');
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className='mb-4'>
      <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>
      <div className="sm:hidden flex justify-center">
        <img src="/assets/images/icon.svg" alt="logo" className='object-scale-down h-20'/>
      </div>
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" {...register('email', { required: true })}
          className={`mt-1 p-2 w-full border rounded-md ${errors.email ? 'border-red-500' : ''}`} />
        {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" {...register('password', { required: true,})}
          className={`mt-1 p-2 w-full border rounded-md ${errors.password ? 'border-red-500' : ''}`} />
        {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
      </div>

      <button type="submit" className="syn-button">
      {isUserLoading ?(
          <div className="flex-center gap-2">
            <Loader />
          </div>
          ): "Login"}
      </button>
      <Link to="/sign-up/" className="text-sm text-indigo-600 hover:underline pl-5">New Here?</Link>
    </form>
  );
};

export default SigninForm;
