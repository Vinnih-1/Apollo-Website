import axios, { AxiosError } from 'axios'
import { useEffect, useState } from 'react'

export interface ValidationProps {
  email: string
  token: string
  authorities: Array<{ authority: string }>
  isValid: boolean
  loading: boolean
  success: boolean
}

export const useAuth = (): ValidationProps => {
  const validateUrl = process.env.NEXT_PUBLIC_AUTH_VALIDATE as string
  const [validation, setValidation] = useState<ValidationProps>({
    email: '',
    token: '',
    isValid: false,
    authorities: [],
    loading: true,
    success: false,
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      return
    }

    axios
      .get(validateUrl + '?token=' + token)
      .then((response) => {
        const { email, valid, token, authorities } = response.data

        if (!valid) {
          handleLogout()
          return
        }

        setValidation({
          email,
          token,
          isValid: valid as boolean,
          authorities,
          loading: false,
          success: true,
        })
      })
      .catch((error: AxiosError) => {
        let success = false
        if (error.response) {
          success = true
        }
        setValidation((prevState) => ({
          ...prevState,
          loading: false,
          success,
        }))
      })
  }, [])

  return validation
}
