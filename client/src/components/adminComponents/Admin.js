import React from 'react'
import './Admin.scss'
import AboutAdmin from './AboutAdmin'
import SocialAdmin from './SocialAdmin'
import BoardAdmin from './BoardAdmin'
import TechnicalsAdmin from './TechnicalsAdmin'


const Admin = () => {
    return (
        <div>
            <div className="main-container">
                <h2 className="title">Admin forms:</h2>
                <div className="admin-center">


                    <h4 className="admin-title">About Component</h4>
                    <AboutAdmin />


                    <br />
                    <br />
                    <hr style={{ border: "1px solid lightgray" }}></hr>
                    <br />


                    <h4 className="admin-title">Social Component</h4>
                    <SocialAdmin />


                    <br />
                    <br />
                    <hr style={{ border: "1px solid lightgray" }}></hr>
                    <br />


                    <h4 className="admin-title">Technicals Component</h4>
                    <TechnicalsAdmin />

                    <br />
                    <br />
                    <hr style={{ border: "1px solid lightgray" }}></hr>
                    <br />


                    <h4 className="admin-title">Board Component</h4>
                    <BoardAdmin />


                    <br />
                </div>
            </div>
        </div>
    )
}

export default Admin