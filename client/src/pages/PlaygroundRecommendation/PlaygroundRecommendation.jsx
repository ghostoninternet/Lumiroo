import React, { useEffect } from 'react'
import { getPlayground } from '../../apis/playground'

function PlaygroundRecommendation() {

  const fetchPlayground = async () => {
    try {
      const response = await getPlayground()
      const data = response.data
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPlayground()
  }, [])

  return (
    <div>PlaygroundRecommendation</div>
  )
}

export default PlaygroundRecommendation