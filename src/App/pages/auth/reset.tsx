import React, { useEffect, useState } from 'react'

import axios from '../../shared/axios/axios'
import { useQuery } from '../../shared/hooks/query-hook'

const ResetPassword = () => {
  const { search } = useQuery()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(`/user/verify-hashed-reset-password-token${search}`)
        if (result.status === 200) {
          setLoading(false)
        }
      } catch (err) {
        console.log('err', err)
        setLoading(false)
        setError(true)
      }
    }
    )()
  }, [search])
  // WH
  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return <>Error Message </>
  }

  return <>Form rendered </>
}

export default ResetPassword
