import React, { useContext } from 'react'
import './SignUp.scss'
import { DataContext } from '../../Context/GlobalContext'

const SignUp = () => {

    // const state = useContext(DataContext)
    // const [SignUp] = state.SignUp
    // console.log(SignUp)

    return (
        <div className="signUp">
            <div className="signUp__title">
                <h1>
                    Sign up for IEEE @ UIUC
                </h1>
            </div>
            <div className="signUp__body">
                <div className="signUp__body__grainger">
                    <div className="signUp__body__grainger__title">
                        Grainger Students:
                    </div>
                    <div className="signUp__body__grainger__body">
                        1.  Fill out: <a className="signUp__link" href="https://docs.google.com/forms/d/1gQF73sQWyAbGqa6fnYItwlMe2AAyja5_WWqXXPciO-Y/edit">Interest Form</a>
                        <br />
                        2.  And join: <a className="signUp__link" href="https://students.grainger.illinois.edu/feeds?type=club&type_id=23943&tab=home">Grainger IEEE Group</a>
                    </div>
                </div>
                <div className="signUp__body__nongrainger">
                    <div className="signUp__body__nongrainger__title">
                        Non-Grainger Students:
                    </div>
                    <div className="signUp__body__nongrainger__body">
                        1.	Manually create an account with the Portal (<a className="signUp__link" href="https://students.grainger.illinois.edu/home_login">https://students.grainger.illinois.edu/home_login</a>) using your school email address
                        <br/>2.	After creating your account, the College will ‘verify’ you within a day or two
                        <br/>3.	After you are verified register for the IEEE group (<a className="signUp__link" href="https://students.grainger.illinois.edu/feeds?type=club&type_id=23943&tab=home">https://students.grainger.illinois.edu/feeds?type=club&type_id=23943&tab=home</a>)
                        <br/><br/>If you have any issues please contact students-grainger@illinois.edu for access to the Grainger Student Portal.

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp