import s from "./header.module.css"
import Image from 'next/image';
import title_Omniknight from "./img/title_Omniknight.png";
import SignUp from "./SingUp/page";

export default function Header() {
    return (
        <div className={s.header}>
            <Image src={title_Omniknight} className={s.title_Omniknight} alt="Omniknight" priority="true" />
            <div>
                <SignUp />
            </div>
        </div>
    )
}