import React from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'

const FormCardFooter = ({text, handleClick}: {text: string; handleClick?: () => void}) => {
  return (
    <CardFooter className="p-4 border-t">
        <Button type="submit" className="w-full" onCanPlay={handleClick}>
            {text}
        </Button>
    </CardFooter>
  )
}

export default FormCardFooter