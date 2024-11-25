import React from 'react'
import { Badge } from 'flowbite-react'

const StatusBadge = ({
     label,
     color,
     beeperColor,
     size = 'sm',
     beeperSize = 'xs'
}) => {
     return (
          <div className="w-fit m-auto relative">
               <Badge
                    size={size}
                    color={color}
                    className="w-fit scale-90"
               >
                    {label}
               </Badge>
               <Badge
                    size={beeperSize}
                    className={`size-4 scale-50 animate-pulse rounded-full absolute -top-1 -right-1 ${beeperColor}`}
               >
               </Badge>
          </div>
     )
}

export default StatusBadge