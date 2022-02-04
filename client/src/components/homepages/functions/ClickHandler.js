import ReactGa from "react-ga"

export function ClickHandler(loc, file) {
  ReactGa.event({
    category: "Click Button!",
    action: `Visitor clicked the ${loc} button from ${file}`,
  })
    console.log('triggered')
}
