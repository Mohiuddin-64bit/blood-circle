'use client'

import { getAccount } from '@/lib/actions/user.actions'
import React, { useEffect } from 'react'

const GetUser = () => {
  useEffect(() => {
    const getUser = async () => {
      const user = await getAccount()
      console.log(user)
    }
    getUser()
  }, [])
  return (
    <div>GetUser</div>
  )
}

export default GetUser