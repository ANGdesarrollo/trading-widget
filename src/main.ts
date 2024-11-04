import './style.css'
import './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
      <div id="firstContainer" style="height: 100vh; width: 100vw;"></div>
  </div>
`
