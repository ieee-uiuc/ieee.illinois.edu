import React from "react"
import "./Membership.scss"
import Register from "./Register"
import Points from "./Points"

export default function Membership() {

  return (
    <div className="member">
      <h1 className="member__title">Membership</h1>

      <h1 className="margin-top">Join the Point System</h1>

      <div className="divide">
        <div className="section">
          <Register />
        </div>
        <div className="section">
          <div>
            <Points />
          </div>
        </div>
      </div>

      <body className="member__body">
        <h1>Basic Requirements</h1>
        <br />
        <ul>
          <li key="1">
            <b>1.</b>{" "}
            <i>
              All members of IEEE should be part of the IEEE Group on the
              Grainger Student Portal.
            </i>
          </li>
          <br />
          <li key="2">
            <b>2.</b>{" "}
            <i>
              https://students.grainger.illinois.edu/IEEE/club_signup This will
              also allow you to receive our newsletter which will send you
              updates about the IEEE RSO and nationally.
            </i>
          </li>
        </ul>
        <br />
        <h2>Active membership</h2>
        <br />
        <ul>
          <li key="local">
            <i>
              To be an active member of IEEE, you must attend a total of 3 IEEE
              meetings or events.
            </i>
          </li>
          <br />
          <i>
            Active members willbe able to participate in the reward system for
            attending events, have higher priority to attend events with limited
            capacity, be added to our{" "}
            <a target="blank" href="https://forms.gle/n879smKJE2b1zCdi9">
              {" "}
              resume book
            </a>
          </i>
        </ul>
        <br />
        <h2>National membership</h2>
        <br />
        <ul>
          <li key="national">
            <i>
              Being a national organization, there is a national membership you
              can pay for on the
              <a target="blank" href="https://www.ieee.org/">
                {" "}
                IEEE website
                <br />
              </a>
              Use code FUTURE50 to get 50% off
            </i>
          </li>
          <br />
          <li key="bene">
            <h3>Benefits from being a national member:</h3>
            <ul>
              <li key="net">
                Network with other professionals in your local area or within a
                specific technical interest
              </li>
              <li key="dis">
                <i>
                  get discounts and free software including: GE Appliances, UPS
                  Shipping, Dell Technologies, and Wolfram. For more see
                  <a
                    target="blank"
                    href="https://www.ieee.org/membership/discounts/index.html"
                  >
                    {" "}
                    here{" "}
                  </a>
                  and
                  <a target="blank" href="https://site.ieee.org/r4-sac/misc/ ">
                    {" "}
                    here
                    <br />
                  </a>
                </i>
              </li>
              <br />
              <li key="info">
                for more information on membership benefits see{" "}
                <a
                  target="blank"
                  href="https://www.ieee.org/membership/join/index.html"
                >
                  {" "}
                  here
                  <br />
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <br />
      </body>
    </div>
  )
}
