import axios from 'axios'
import { useEffect, useState } from 'react'

export interface ValidationProps {
  email: string
  token: string
  authorities: Array<{ authority: string }>
  isValid: boolean
  loading: boolean
  success: boolean
  logout: () => void
}

export const useAuth = (): ValidationProps => {
  const validateUrl = process.env.NEXT_PUBLIC_AUTH_VALIDATE as string

  const handleLogout = () => {
    localStorage.removeItem('token')
  }

  const [validation, setValidation] = useState<ValidationProps>({
    email: '',
    token: '',
    isValid: false,
    authorities: [],
    loading: true,
    success: false,
    logout: handleLogout,
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setValidation((prevState) => ({
        ...prevState,
        loading: false,
        success: true,
      }))
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

        if (response.status === 200) {
          setValidation({
            email,
            token,
            isValid: valid as boolean,
            authorities,
            loading: false,
            success: true,
            logout: handleLogout,
          })
        }
      })
      .catch(() => {
        setValidation((prevState) => ({
          ...prevState,
          loading: false,
          success: false,
        }))
      })
  }, [])

  return validation
}
