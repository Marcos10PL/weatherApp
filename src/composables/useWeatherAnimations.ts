import type { Weather } from '@/types'
import gsap from 'gsap'
import { ref } from 'vue'

export const useWeatherAnimations = () => {
  const animations = ref<gsap.core.Tween[]>([])
  const error = ref(false)

  const clearAnimations = () => {
    animations.value.forEach((animation) => animation.kill())
    animations.value = []
  }

  const rayAnimation = () => {
    const sunRays = document.querySelectorAll('.animation .sun-ray') as NodeListOf<HTMLElement>
    let animation = null
    sunRays.forEach((ray, index) => {
      const width = 140 + 20 * index
      animation = gsap.fromTo(
        ray,
        {
          opacity: 1,
          rotate: index * -5,
          x: -45,
          y: 15 + index * 18,
          width,
        },
        {
          duration: 2,
          repeat: -1,
          opacity: 0.5,
          yoyo: true,
          width: width * 0.8,
          ease: 'sine.inOut',
        }
      )
      animations.value.push(animation)
    })
  }

  const sunAnimation = () => {
    const sunAnimation = gsap.to('.animation .pi-sun', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'linear',
    })
    animations.value.push(sunAnimation)
  }

  const moonAnimation = () => {
    const moon = gsap.to('.animation .pi-moon', {
      rotation: 40,
      duration: 5,
      repeat: -1,
      ease: 'linear',
      yoyo: true,
    })
    animations.value.push(moon)
  }

  const starsAnimation = () => {
    const starsPositions = [
      { x: -110, y: 15 },
      { x: -150, y: 25 },
      { x: -140, y: 80 },
      { x: -60, y: 90 },
      { x: -100, y: 60 },
    ] as const

    let allStars = []
    const stars = document.querySelectorAll('.animation .pi-star') as NodeListOf<HTMLElement>
    const fillStars = document.querySelectorAll('.animation .pi-star-fill') as NodeListOf<HTMLElement>
    allStars = [...stars, ...fillStars]

    allStars.forEach((star, index) => {
      const set = gsap.set(star, starsPositions[index])
      animations.value.push(set)

      const animation = gsap.to(star, {
        rotation: 360,
        duration: 50,
        repeat: -1,
        ease: 'linear',
      })
      animations.value.push(animation)
    })
  }

  const cloudsAnimation = ({ y1, y2, size }: { y1?: number; y2?: number; size?: number }) => {
    const cloudsPositions = [
      { x: -15, y: y1 || 25 },
      { x: -65, y: y2 || 15 },
      { x: -95, y: -15 },
    ] as const

    const cloudFilled = document.querySelectorAll('.animation .cloud-icon') as NodeListOf<HTMLElement>

    cloudFilled.forEach((cloud, index) => {
      const set = gsap.set(cloud, {
        width: size || 80,
        ...cloudsPositions[index],
      })
      animations.value.push(set)

      const animation = gsap.to(cloud, {
        repeat: -1,
        x: 15 + cloudsPositions[index].x,
        duration: 5,
        yoyo: true,
        ease: 'sine.inOut',
      })
      animations.value.push(animation)
    })
  }

  const fallAnimation = (tab: NodeListOf<Element>) => {
    const container = document.querySelector<HTMLDivElement>('.animation .box')
    const set = gsap.set(container, {
      x: -50,
      y: 30,
    })
    animations.value.push(set)

    const positions = [-2, 4, -6, -8, 10, -2, -1] as const
    tab.forEach((drop, index) => {
      const set = gsap.set(drop, {
        x: index * -15,
        rotate: 25,
        height: 12,
      })
      animations.value.push(set)

      const animation = gsap.fromTo(
        drop,
        {
          y: 20 + positions[index],
          opacity: 0,
          duration: positions[index] * 0.2,
          ease: 'sine.inOut',
        },
        {
          opacity: 1,
          repeat: -1,
          delay: Math.abs(positions[index]) * 0.2,
        }
      )
      animations.value.push(animation)
    })
  }

  const thunderboltsAnimation = () => {
    const thunderbolts = document.querySelectorAll('.animation .pi-bolt')
    thunderbolts.forEach((bolt, index) => {
      const animation = gsap.fromTo(
        bolt,
        {
          y: 35 + index * 6,
          x: -60 * (index + 1),
          rotate: 10,
          opacity: 0,
        },
        {
          opacity: 1,
          repeat: -1,
          duration: 1.5,
          delay: index + 1,
          ease: 'power1.inOut',
        }
      )
      animations.value.push(animation)
    })
  }

  const mistAnimation = () => {
    const mistSticks = document.querySelectorAll('.animation .mist-stick')
    const container = document.querySelector('.animation .mist')

    const set = gsap.set(container, {
      y: 74,
      x: -55,
    })
    animations.value.push(set)

    const positions = [-3, 4, 5, -2, 7, -4] as const

    mistSticks.forEach((stick, index) => {
      const animation = gsap.fromTo(
        stick,
        {
          y: -30 + index * 5,
          x: 0,
          opacity: 0.8,
        },
        {
          x: positions[index],
          opacity: 1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
          ease: 'sine.inOut',
        }
      )
      animations.value.push(animation)
    })
  }

  const initAnimations = async (weather: Weather) => {
    error.value = false

    if (weather === 'clearSkySun') {
      sunAnimation()
      rayAnimation()
    } else if (weather === 'clearSkyMoon') {
      moonAnimation()
      starsAnimation()
    } else if (weather === 'fewCloudsSun') {
      sunAnimation()
      rayAnimation()
      cloudsAnimation({})
    } else if (weather === 'fewCloudsMoon') {
      moonAnimation()
      starsAnimation()
      cloudsAnimation({})
    } else if (weather === 'clouds') {
      cloudsAnimation({ y1: -10, y2: -20, size: 100 })
    } else if (weather === 'rain') {
      cloudsAnimation({ y1: -25, y2: -20, size: 95 })
      const rainDrops = document.querySelectorAll('.rain-drop')
      fallAnimation(rainDrops)
    } else if (weather === 'thunderstorm') {
      cloudsAnimation({ y1: -25, y2: -20, size: 95 })
      const rainDrops = document.querySelectorAll('.rain-drop')
      fallAnimation(rainDrops)
      thunderboltsAnimation()
    } else if (weather === 'snow') {
      cloudsAnimation({ y1: -25, y2: -20, size: 95 })
      const snowflakes = document.querySelectorAll('.animation .snowflake')
      fallAnimation(snowflakes)
    } else if (weather === 'mist') {
      cloudsAnimation({ y1: -28, size: 95 })
      mistAnimation()
    } else {
      console.log(`Unknown weather type: ${weather}`)
      error.value = true
    }
  }

  return {
    clearAnimations,
    initAnimations,
    error,
  }
}
