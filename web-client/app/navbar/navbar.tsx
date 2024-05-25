'use client'
import Image from 'next/image';
import styles from './Navbar.module.css';
import Link from 'next/link';
import SignIn from './sign-in';
import { onAuthStateChangedHelper } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';


export default function navbar(){
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);
    return(
        <nav className={styles.nav}>
            <Link href="/">
                <span className={styles.logocontainer}>
                    <Image width={90} height={20}
            className={styles.logo}
            src="/next.svg" alt={''} /></span>
            
            </Link>
            <SignIn user={user}/>
            
        </nav>
    )
}