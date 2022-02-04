import ReactGa from "react-ga"

export function AdminClickHandler(feild, section) {
  ReactGa.event({
    category: "Admin Update!",
    action: `Admin ${feild} feild of ${section}`,
  })
}


export function UserLogin(feild, section) {
  ReactGa.event({
    category: "Admin login!",
    action: `An admin has Logged in`,
  })
}