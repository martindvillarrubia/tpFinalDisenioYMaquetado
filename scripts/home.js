// Home screen functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize chart
  const canvas = document.getElementById("performanceChart")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data for candlestick-like chart
    const data = [
      { x: 0, open: 100, high: 120, low: 95, close: 115 },
      { x: 1, open: 115, high: 130, low: 110, close: 125 },
      { x: 2, open: 125, high: 135, low: 120, close: 130 },
      { x: 3, open: 130, high: 145, low: 125, close: 140 },
      { x: 4, open: 140, high: 150, low: 135, close: 145 },
      { x: 5, open: 145, high: 155, low: 140, close: 150 },
      { x: 6, open: 150, high: 165, low: 145, close: 160 },
      { x: 7, open: 160, high: 170, low: 155, close: 165 },
      { x: 8, open: 165, high: 175, low: 160, close: 170 },
      { x: 9, open: 170, high: 180, low: 165, close: 175 },
    ]

    // Draw chart
    const padding = 20
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barWidth = chartWidth / data.length

    // Find min and max values
    const allValues = data.flatMap((d) => [d.high, d.low])
    const minValue = Math.min(...allValues)
    const maxValue = Math.max(...allValues)
    const valueRange = maxValue - minValue

    // Draw candlesticks
    data.forEach((point, index) => {
      const x = padding + index * barWidth + barWidth / 2

      const highY = padding + ((maxValue - point.high) / valueRange) * chartHeight
      const lowY = padding + ((maxValue - point.low) / valueRange) * chartHeight
      const openY = padding + ((maxValue - point.open) / valueRange) * chartHeight
      const closeY = padding + ((maxValue - point.close) / valueRange) * chartHeight

      const isGreen = point.close > point.open
      const color = isGreen ? "#00ff88" : "#ff4444"

      // Draw wick
      ctx.strokeStyle = color
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, highY)
      ctx.lineTo(x, lowY)
      ctx.stroke()

      // Draw body
      ctx.fillStyle = color
      const bodyTop = Math.min(openY, closeY)
      const bodyHeight = Math.abs(closeY - openY)
      ctx.fillRect(x - 3, bodyTop, 6, bodyHeight || 1)
    })

    // Draw trend line
    ctx.strokeStyle = "#ff00ff"
    ctx.lineWidth = 2
    ctx.beginPath()
    data.forEach((point, index) => {
      const x = padding + index * barWidth + barWidth / 2
      const y = padding + ((maxValue - point.close) / valueRange) * chartHeight
      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()
  }

  // Period button functionality
  const periodButtons = document.querySelectorAll(".period-btn")
  periodButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      periodButtons.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Scroll tracking
  const main = document.querySelector("main")
  const scrollTrack = document.querySelector(".scroll-track")
  const scrollThumb = document.querySelector(".scroll-thumb")

  if (main && scrollTrack && scrollThumb) {
    main.addEventListener("scroll", () => {
      const scrollPercentage = main.scrollTop / (main.scrollHeight - main.clientHeight)
      const trackHeight = scrollTrack.clientHeight
      const thumbHeight = Math.max(30, trackHeight * (main.clientHeight / main.scrollHeight))
      const thumbTop = scrollPercentage * (trackHeight - thumbHeight)

      scrollThumb.style.height = thumbHeight + "px"
      scrollThumb.style.transform = `translateY(${thumbTop}px)`

      if (main.scrollHeight > main.clientHeight) {
        scrollTrack.classList.remove("hidden")
      } else {
        scrollTrack.classList.add("hidden")
      }
    })

    // Initial check
    main.dispatchEvent(new Event("scroll"))
  }
})