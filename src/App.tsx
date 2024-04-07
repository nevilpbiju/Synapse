import { Routes, Route } from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import {Admin, Chat, Conference, CreateQuery, EditQuery, Friends, Home, Profile, QueryDetails, Search, UpdateProfile} from './_root/pages';
import PageNotFound from './_root/pages/PageNotFound';

// Continue

const App = () => {
  return (
    <main className="flex h-screen">
        <Routes>
            {/* Public routes */}
            <Route element={<AuthLayout />}>
                <Route path='/sign-in' element={<SigninForm/>}/>
                <Route path='/sign-up' element={<SignupForm/>}/>
            </Route>

            {/* Private routes */}
            <Route element={<RootLayout />}>
                <Route index element={<Home/>}/>
                <Route path='/search' element={<Search/>}/>
                <Route path='/create-query' element={<CreateQuery/>}/>
                <Route path='/edit-query/:id' element={<EditQuery/>}/>
                <Route path='/query/:id' element={<QueryDetails/>}/>
                <Route path='/friends' element={<Friends/>}/>.
                <Route path='/profile/:id/*' element={<Profile/>}/>
                <Route path='/update-profile/:id' element={<UpdateProfile/>}/>
                <Route path='/chat' element={<Chat/>}/>
                <Route path='/conference' element={<Conference/>}/>
                <Route path='/admin' element={<Admin/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Route>

        </Routes>
    </main>
  )
}

export default App