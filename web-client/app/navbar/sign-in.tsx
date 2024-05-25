'use client'
import { Fragment } from "react";

import { signInWithGoogle, signOut } from "../firebase/firebase";
import  Styles from "./sign-in.module.css";
import { User } from "firebase/auth";


interface Props {
    user: User | null;
  }

export default function SignIn({user}: Props) {
    return (
        <Fragment>
            {
                user ?
                (
                    <button className={Styles.signin} onClick={signOut}>
                Sign Out
                </button>
                )
                :
                (
                    <button className={Styles.signin} onClick={signInWithGoogle}>
                Sign In
                </button>
                )
            }
        </Fragment>

        );
  }