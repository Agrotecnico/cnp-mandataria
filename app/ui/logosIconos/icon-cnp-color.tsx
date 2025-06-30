import React from "react"

export type IconProps = {
  size?: string | number
  fillc?: string | number
  filln?: string | number
  fillp?: string | number
  fillm?: string | number
  sombraX?: string | number
  sombraY?: string | number
  filter?: string | number
} & React.SVGAttributes<SVGElement>

const IconCnpColor: React.FC<IconProps> = ({
  size=84,
  fillc= "#c87fc8",
  filln= "#d29fe8",
  fillp= "#ea7cea",
  fillm= "#b3b3b3",
  sombraX= "1",
  sombraY= "1",
  filter="filterCnp1",
  ...attributes
}) => {
  return (
    <svg
      width={size}
      viewBox="0 0 84 46"
      xmlns="http://www.w3.org/2000/svg"
      {...attributes}
      >
      <defs
        /* id="defs9" */>
        <filter
          id={filter}
          /* id="filter9554" */
          x="-0.030000000000000013"
          y="-0.030000000000000013"
          width="1.1299999999999999"
          height="1.1199999999999999">
          <feFlood
            flood-opacity="1"
            flood-color="rgb(85,85,85)"
            result="flood"
            id="feFlood9544"
            in="SourceGraphic" />
          <feComposite
            in="flood"
            in2="SourceGraphic"
            operator="in"
            result="composite1"
            id="feComposite9546" />
          <feGaussianBlur
            in="composite1"
            stdDeviation="0.4"
            result="blur"
            id="feGaussianBlur9548" />
          <feOffset
            dx={sombraX}
            dy={sombraY}
            result="offset"
            id="feOffset9550"
            preserveAlpha="false" />
          <feComposite
            in="SourceGraphic"
            in2="offset"
            operator="over"
            result="composite2"
            id="feComposite9552" />
        </filter>
      </defs>
      <g>
        <path
          d="m 19.808143,26.296834 c 3.47943,0 6.280647,2.424088 6.280647,5.435176 v 8.454717 c 0,3.011087 -2.801169,5.435175 -6.280647,5.435175 -3.479527,0 -6.280599,-2.424088 -6.280599,-5.435175 V 31.73201 c 0,-3.011088 2.801072,-5.435176 6.280599,-5.435176 z m 0,-26.08884156 c 3.47943,0 6.280647,2.42408826 6.280647,5.43517536 v 8.4547172 c 0,3.011087 -2.801169,5.435175 -6.280647,5.435175 -3.479527,0 -6.280647,-2.424088 -6.280647,-5.435175 V 5.6431678 c 0,-3.0110871 2.80112,-5.43517536 6.280647,-5.43517536 z m -14.0161339,0 h 0.977317 c 3.2086859,0 5.7919159,2.38790206 5.7919159,5.35405836 V 40.267844 c 0,2.966156 -2.58323,5.354058 -5.7919159,5.354058 H 5.7920091 C 2.5832264,45.621902 -3.70341e-6,43.234 -3.70341e-6,40.267844 V 5.5620508 C -3.70341e-6,2.5958945 2.5832264,0.20799244 5.7920091,0.20799244 Z"
          fill={`${fillc}`}
          filter={`url(#${filter})`}
        />
        <path
          d="m 47.553035,0.20799244 h 0.977221 c 3.208831,0 5.792012,2.38790206 5.792012,5.35405836 V 40.267844 c 0,2.966156 -2.583181,5.354058 -5.792012,5.354058 h -0.977221 c -3.208831,0 -5.792013,-2.387902 -5.792013,-5.354058 V 5.5620508 c 0,-2.9661563 2.583182,-5.35405836 5.792013,-5.35405836 z m -13.527547,0 h 0.97722 c 3.208831,0 5.792013,2.38790206 5.792013,5.35405836 V 40.267844 c 0,2.966156 -2.583182,5.354058 -5.792013,5.354058 h -0.97722 c -3.208831,0 -5.792013,-2.387902 -5.792013,-5.354058 V 5.5620508 c 0,-2.9661563 2.583182,-5.35405836 5.792013,-5.35405836 z"
          fill={`${filln}`}
          filter={`url(#${filter})`}
        />
        <path
          d="m 62.81531,0.20799244 h 0.977413 c 3.208735,0 5.791916,2.38790206 5.791916,5.35405836 V 40.267844 c 0,2.966156 -2.583181,5.354058 -5.791916,5.354058 H 62.81531 c -3.208735,0 -5.791917,-2.387902 -5.791917,-5.354058 V 5.5620508 c 0,-2.9661563 2.583182,-5.35405836 5.791917,-5.35405836 z m 14.016375,0 c 3.47943,0 6.28055,2.53182546 6.28055,5.67673876 V 17.238209 c 0,3.144913 -2.80112,5.676738 -6.28055,5.676738 -3.479527,0 -6.280696,-2.531825 -6.280696,-5.676738 V 5.8847312 c 0,-3.1449133 2.801121,-5.67673876 6.280696,-5.67673876 z"
          fill={`${fillp}`}
          filter={`url(#${filter})`}
        />
      </g>
    </svg>
  )
}

export default IconCnpColor