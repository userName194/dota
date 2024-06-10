import s from "./header.module.css"
import Image from 'next/image';
import background_Omni from "./img/background/title_Omniknight.png"

export default function Header() {
    return (
        <div className={s.header}>
            <Image src={background_Omni} className={s.background_Omni} alt="background_Omni" priority="true" />
        </div>
    )
}