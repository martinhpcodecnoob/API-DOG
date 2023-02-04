import styles from './LandingPages.module.css'
import {Link} from 'react-router-dom'
import footprint from '../../img/footprint.png'
const LandingPages = () => {
    return (
        <div className={styles.background}>
            <main className={styles.grid}>
                <div className={styles.cardWelcome}>
                    <h4>Dog Lover Welcome!,🐕</h4>
                    <p>Here on this page you will find breeds of dogs and create breeds, you can also search by name or breed, you can also order them.</p>
                </div>
                <div className={styles.cardLink}>
                    <img className={styles.footprint} src={footprint} alt="" />
                    <div className={styles.leftLink}>
                        <h1>PI-Dogs</h1>
                        <p>My individual project for you. 💓</p>
                    </div>
                    <div className={styles.rightLink}>
                        <Link className={styles.linkBtn} to='/home' >
                            <div className={styles.innerBtn}>
                                Empezemos !!
                            </div>
                        </Link>
                    </div>
                </div>
                
            </main>
        </div>
    )
}

export default LandingPages