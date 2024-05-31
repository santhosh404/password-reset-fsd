import React, { useEffect } from 'react';
import {Button} from "@mui/material";
import {useNavigate} from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    if(!localStorage.getItem('user')) {
      navigate('/sign-in')
    }
  }, [])
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-4 mt-10'>
        <h1 className='text-3xl font-[900]'>Welcome! to the page, {JSON.parse(localStorage.getItem('user'))?.first_name}</h1>
        <Button
          onClick={() => {
            navigate('/sign-in')
            localStorage.clear()
          }}
          variant='outlined'
          sx={{
            textTransform: 'capitalize'
          }}
        >
          Logout
        </Button>
      </div>
    </>
  )
}
