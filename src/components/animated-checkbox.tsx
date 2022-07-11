import React, { useEffect, memo } from 'react'
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolateColor
} from 'react-native-reanimated'
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'

const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN
const checkMarkPath =
  'M7 28.8725C22.2702 43.9819 20.9181 49.2531 18.3333 50C48.6351 16.452 57.4035 15.7478 58 19.5892'
const outLineBoxPath =
  'M24 0.5H40C52.9787 0.5 63.5 11.0213 63.5 24V40C63.5 52.9787 52.9787 63.5 40 63.5H24C11.0213 63.5 0.5 52.9787 0.5 40V24C0.5 11.0213 11.0213 0.5 24 0.5Z'

const AnimatedPath = Animated.createAnimatedComponent(Path)
const AnimatedStoke = Animated.createAnimatedComponent(Path)

interface Props {
  checked?: boolean
  hightlightColor: string
  boxOutlineColor: string
  checkmarkColor: string
  onPress?: () => void
}

const AnimatedCheckbox = (props: Props) => {
  const { checked, checkmarkColor, hightlightColor, boxOutlineColor } = props
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(checked ? 1 : 0, {
      duration: checked ? 300 : 100,
      easing: Easing.linear
    })
  }, [checked])

  const animatedBoxProps = useAnimatedProps(
    () => ({
      stroke: interpolateColor(
        Easing.bezierFn(0.16, 1, 0.3, 1)(progress.value),
        [0, 1],
        [boxOutlineColor, hightlightColor],
        'RGB'
      ),

      fill: interpolateColor(
        Easing.bezierFn(0.16, 1, 0.3, 1)(progress.value),
        [0, 1],
        ['#00000000', hightlightColor],
        'RGB'
      )
    }),
    [hightlightColor, boxOutlineColor]
  )

  return (
    <Svg
      fill="none"
      viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}
    >
      <Defs>
        <ClipPath id="clipPath">
          <Path
            fill="white"
            stroke="gray"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={outLineBoxPath}
          ></Path>
        </ClipPath>
      </Defs>
      <AnimatedPath
        d={outLineBoxPath}
        strokeWidth={7}
        strokeLinejoin="round"
        strokeLinecap="round"
        animatedProps={animatedBoxProps}
      />
      <G clipPath="url(#clipPath)">
        <AnimatedStoke
          // progress={progress}
          d={checkMarkPath}
          stroke={checkmarkColor}
          strokeWidth={10}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeOpacity={checked || false ? 1 : 0}
        />
      </G>
    </Svg>
  )
}

export default AnimatedCheckbox
