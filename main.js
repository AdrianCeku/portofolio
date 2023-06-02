import "/style.css"
import { updateSkydome } from "./3d"

document.querySelector("#switchmode").onclick = switchMode

var darkmode = true
let root = document.querySelector(":root")

function switchMode() {
    if(darkmode==true) {
        darkmode = false
        root.style.setProperty("--bg-color-main", "#e0cbc3")
        root.style.setProperty("--font-color-main", "#090000")
        root.style.setProperty("--font-color-secondary", "#656565")
        root.style.setProperty("--inverse-border-color", "#000000")
        root.style.setProperty("--accent-color", "#e83402")
    }
    else {
        darkmode= true
        root.style.setProperty("--bg-color-main", "#0a000c")
        root.style.setProperty("--font-color-main", "#ffffff")
        root.style.setProperty("--font-color-secondary", "#484848")
        root.style.setProperty("--inverse-border-color", "#ffffff")
        root.style.setProperty("--accent-color", "#7110ae")
    }
    updateSkydome()
}

export {darkmode, switchMode}
