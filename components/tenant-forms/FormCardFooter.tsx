import React from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const FormCardFooter = ({text, loading, handleClick}: {text: string; loading?: boolean; handleClick?: () => void}) => {
  return (
    <CardFooter className="p-4 border-t">
        <Button loading={loading} disabled={loading} type="submit" className="w-full" onCanPlay={handleClick}>
          {loading ? "Loading..." : text}
        </Button>
    </CardFooter>
  )
}

export default FormCardFooter