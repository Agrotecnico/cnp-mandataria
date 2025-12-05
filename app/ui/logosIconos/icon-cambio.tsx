import React from "react"

export type IconProps = {
  size?: string | number
  fill?: string | number
  fill2?: string | number
} & React.SVGAttributes<SVGElement>

const IconCambio: React.FC<IconProps> = ({
  size=40,
  fill= "#fff",
  fill2= "#548eff",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
      >
      <circle 
        cx="12" 
        cy="12" 
        r="10" 
        strokeWidth="4">
      </circle>
      <path 
        fill={fill} 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
      </path>
    </svg>
  )
}

export default IconCambio