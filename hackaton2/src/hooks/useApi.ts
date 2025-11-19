// src/hooks/useApi.ts

import { useState, useCallback } from 'react'

interface UseApiReturn<T> {
  data: T | null
  loading: boolean
  error: string | null
  execute: (...args: any[]) => Promise<T | null>
  reset: () => void
}

/**
 * Hook personalizado para manejar llamadas API con estados de carga y error.
 * 
 * @param apiFunction - Función que realiza la llamada API
 * @returns Objeto con data, loading, error, execute y reset
 * 
 * @example
 * const { data, loading, error, execute } = useApi(projectService.getProjects)
 * 
 * useEffect(() => {
 *   execute(1, 10, '')
 * }, [])
 */
export const useApi = <T, P extends any[] = any[]>(
  apiFunction: (...args: P) => Promise<T>
): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const execute = useCallback(
    async (...args: P): Promise<T | null> => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiFunction(...args)
        setData(result)
        return result
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Ha ocurrido un error al realizar la petición'
        setError(errorMessage)
        setData(null)
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}

