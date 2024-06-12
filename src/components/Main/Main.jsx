"use client";
import { useRef } from 'react';
import s from "./main.module.css";
import Image from 'next/image';
import img_decencyReport from "./img/decency_report.png"
import img_feedback from "./img/feedback.png"
import img_skill_bracket from "./img/skillBracket.png"
import img_decency_compare_wr_low from "./img/decency_compare_wr/compare_wr_low.png"
import img_decency_compare_wr_norm from "./img/decency_compare_wr/compare_wr_norm.png"
import img_decency_compare_wr_high from "./img/decency_compare_wr/compare_wr_high.png"
import img_templarAssassin from "./img/templarAssassin.jpg"
export default function Main() {
    const refSectionGameSelectionSystem = useRef(null);
    const refSectionDecency = useRef(null);
    const refSectionSkillBracket = useRef(null);
    const refSectionReports = useRef(null);
    const refSectionСonclusion = useRef(null);
    const scrollSection = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className={s.main}>
            <div className="container">
                <section className="section">
                    <h1 className={s.page_title}>Скрытый пул, тильт</h1>
                    <p>
                        Одни постоянно говорят про тильт, другие считают их параноиками. И вот разгадка: тильт кроется в падении локальной порядочности и показателя skill bracket! Для раскрытия вопроса нужно доразобраться в следующем:
                    </p>
                </section>
                <nav>
                    <ul>
                        <li className="li_first_level"><button onClick={() => { scrollSection(refSectionGameSelectionSystem) }} className={s.navBtn}>Система подбора игр</button></li>
                        <li className="li_first_level"><button onClick={() => { scrollSection(refSectionDecency) }} className={s.navBtn}>Порядочность</button></li>
                        <li className="li_first_level"><button onClick={() => { scrollSection(refSectionSkillBracket) }} className={s.navBtn}>Skill bracket</button></li>
                        <li className="li_first_level"><button onClick={() => { scrollSection(refSectionReports) }} className={s.navBtn}>Про репорты</button></li>
                        <li className="li_first_level"><button onClick={() => { scrollSection(refSectionСonclusion) }} className={s.navBtn}>Вывод</button></li>
                    </ul>
                </nav>
                <section ref={refSectionGameSelectionSystem} className="section">
                    <h2 className={s.h2}>Система подбора игр</h2>
                    <p>
                        Система ищет игроков <mark >в одну игру</mark> с примерно равными рангами и общей порядочностью.
                        Однако, подбор игроков <mark >в команду</mark> отталкивается от дополнительных показателей: <mark className='weakMarker'>локальной порядочности</mark> и <mark className='weakMarker'>skill bracket</mark>.
                    </p>
                </section>
                <section ref={refSectionDecency} className="section">
                    <h2 className={s.h2}>Порядочность</h2>
                    <h3 className={s.listTitle}>Порядочность делится на два вида:</h3>
                    <ul>
                        <li className="li_first_level">общая(долгосрочная)</li>
                        <li className="li_first_level">локальная(кратковременная)</li>
                    </ul>
                    <p>
                        Общая порядочность хотя и имеет свои нюансы, но все же более-менее ясна, а вот локальная вовсе упускается из внимания. Именно она имеет прямое отношение к так называемому &quot;тильту&quot; или &quot;скрытому пулу&quot;.
                    </p>
                    <p>
                        Локальная порядочность <mark >растет при отыгрыше партии с получением положительных отзывов (commend<span className="reduceMarker">-ов</span>)</mark>, и наоборот — <mark >падает при выходе из игры до завершения (leave<span className="reduceMarker">-ов</span>) и получении report<span className="reduceMarker">-ов</span></mark>.
                    </p>
                    <p>
                        Игрок, имеющий низкую локальную порядочность отсортировывается <mark >в команду</mark>, с низкой локальной порядочностью при подборе игр, и скорей всего, обречен на серию поражений(lose streak).
                    </p>
                    <h3 className={s.listTitle}>Признаки понижения локальной порядочности:</h3>
                    <ul>
                        <li>долгий поиск игры;</li>
                        <li>отказы найденной игры;</li>
                        <li>отключения на стадии выбора персонажей;</li>
                        <li>выбор персонажей не по ролям;</li>
                        <li>отказ от выполнения роли;</li>
                        <li>ругань в чате;</li>
                        <li>
                            слишком пассивный отыгрыш, либо, напротив, гиперактивные и неосторожные действия;
                        </li>
                        <li>команда не желает взаимодействовать;</li>
                        <li>отключения во время игры;</li>
                        <li>
                            много упущенных возможностей:
                            простой ультов, умышленное растягивание партии когда можно уже выйграть;
                        </li>
                        <li>
                            в случае успеха в начале, легкомысленная отдача преимущества позже и т.д.
                        </li>
                    </ul>
                    <p>
                        Т.е. в команде собраны игроки, которые нахватались репортов(p.s. leave = report), и они продолжают делать все то, за что хочется кинуть репорт.
                    </p>
                    <p>
                        Текущее состояние порядочности скрыто, и становится известным только при получении отчета обновления порядочности.
                    </p>
                    <figure className={s.container_decency_report}>
                        <figcaption className="mediumMarker">
                            Отчет общей порядочности приходит каждые 15 игр:
                        </figcaption>
                        <Image src={img_decencyReport} className={`${s.img_decencyReport} ${s.img_centered}`} alt="decency report" />
                    </figure>
                    <mark className="mediumMarker">
                        Локальная порядочность работает в течении 15 игр между отчетами общей порядочности.
                    </mark>
                    <p>
                        После получения отчета о порядочности, состояние локальной порядочности сбрасывается до дефолтного состояния, и начинается стандартный подбор игр, в результате которых соотношение lose/win примерно 1/1 и выпадает поочередно. Если новые репорты не поступают и приходят положительные отзывы, то уровень локальной порядочности растет, и система подбирает в команду подобных игроков, от чего начинается серия побед(win streak).
                    </p>
                    <p>
                        Вот причина почему шанс выйграть с высокой локальной порядочносью больше(в качестве демонстрации отображен наглядный пример с приблизительными значениями):
                    </p>
                    <div className={s.containerCompareWr}>
                        <figure className={s.compare_wr}>
                            <figcaption>
                                В матче двух команд с низкой лок. порядочностью шанс победить примерно 50%,<br /> в остальных случаях шанс &lt; 50%.
                            </figcaption>
                            <Image src={img_decency_compare_wr_low} className={s.img_decency_compire_wr} alt="comparative of win ratings, where low decency loses normal and high decency" />
                        </figure>
                        <figure className={s.compare_wr}>
                            <figcaption>
                                В матче двух команд с средней лок. порядочностью шанс победить примерно 50%,<br /> против команды с низкой лок. порядочностью шанс победить &gt; 50%,<br /> против команды с высокой лок. порядочностью шанс победить &lt; 50%
                            </figcaption>
                            <Image src={img_decency_compare_wr_norm} className={s.img_decency_compire_wr} alt="comparative of win ratings, where normal decency beats low, but loses normal decency" />
                        </figure>
                        <figure className={s.compare_wr}>
                            <figcaption>
                                В матче двух команд с высокой лок. порядочностью шанс победить примерно 50%,<br /> в остальных случаях шанс &gt; 50%.
                            </figcaption>
                            <Image src={img_decency_compare_wr_high} className={s.img_decency_compire_wr} alt="comparative of win ratings, where high decency beats low and normal decency" />
                        </figure>
                    </div>
                    <p>
                        Поэтому есть смысл <mark >правильно войти в новый цикл локальной порядочности</mark>, т.е. 1<span className='reduceMarker'>-ую</span> партию в новом цикле(сразу после отчета обновления порядочности) отыграть так, чтобы улучшить или хотя бы не испортить этот показатель. Надежней всего выбрать позиции 4 или 5 с хорошим уроном(Warlock, Jakiro, Witch Doctor и др.) и качественно выполнить роль. В остальных случаях:
                    </p >
                    <ul>
                        <li>
                            при пике позиции 3 - может не быть позиции 4/5, от чего при иницииации сражений и поглащении большого количества урона будет обвинен в feed<span className='reduceMarker'>-е</span>;
                        </li>
                        <li>
                            при пике carry - может не быть позиции 4/5 и позиции 3, от чего carry не сможет атаковать в сражении, т.к. должен будет принимать на себя весь урон противника, а также не сможет фармить без вардинга;
                        </li>
                        <li>
                            при пике позиции 2 - все выше перечисленные причины + gank<span className='reduceMarker'>-и</span> суппортов противника + есть вероятность проиграть мид из-за неудачного контр пика, от чего команда явно решит перевести все стрелки поражения на него.
                        </li>
                    </ul>
                    <p>
                        Как бы не развернулась партия, даже при сильном преимуществе противника, когда carry и близко не может подойти к вражеским героям, support сможет нанести урон сдалека в то время, когда противник будет сносить здания, ведь для победы обязательным условием является разрушение Древнего(Ancient). В таком случае, support оценивается системой выше, от чего в следующей игре будут подобраны более сильные союзники, с которыми уже можно попробовать сыграть на других ролях.
                    </p>
                </section >
                <section ref={refSectionSkillBracket} className="section">
                    <h2 className={s.h2}>Skill bracket</h2>
                    <p>
                        Аналогично тому, как порядочность разделена на общую и временную, skill разделен на общий(рейтинг MMR) и временный(skill bracket). Показатель &quot;skill bracket&quot; можно посмотреть на сайте dotabuff:
                    </p>

                    <figure className={s.skill_bracket_container}>
                        <Image src={img_skill_bracket} className={`${s.img_skill_bracket} ${s.img_centered}`} alt="skill bracket" />
                        <figcaption>
                            <h3 className={s.listTitle}>Есть три уровня skill bracket:</h3>
                            <ul>
                                <li>Normal Skill</li>
                                <li>High Skill</li>
                                <li>Very High Skill</li>
                            </ul>
                        </figcaption>
                    </figure>
                    <p>
                        Это условное выражение показателя, которое базируется на числах, скрытых &quot;под капотом&quot;. Он быстро меняется от результатов предыдущего матча и влияет на подбор игроков в следующем. <mark>Skill bracket растет при высоких показателях партии</mark>.
                    </p>
                    <h3>Показатели партии вычисляются в зависимости от:</h3>
                    <ul>
                        <li>KDA(kills/dies/assists);</li>
                        <li>GPM(gold per minute);</li>
                        <li>EPM(experience per minute);</li>
                        <li>нанесенный урон по героям и зданиям противника;</li>
                        <li>полученный урон от героев, копий, суммонов противника(p.s. не считается урон от: Рошана, вышек, крипов, Терзателей(Divine Sentinel Cube));</li>
                        <li>лечение союзников(лечение сумонов и зданий не считается);</li>
                        <li>поднятые руны богатства;</li>
                        <li>потраченные деньги на расходники:
                            <ul>
                                <li>варды;</li>
                                <li>дасты;</li>
                                <li>смоки;</li>
                                <li>гем.</li>
                            </ul>
                        </li>
                    </ul>
                    <p>
                        Аналогично, <mark>skill bracket падает при низких показателях партии</mark>.
                    </p>
                    <h3>Можно подчеркнуть то, что:</h3>
                    <ul>
                        <li>при вычислении skill bracket<span className='reduceMarker'>-а</span>, <mark >показатели за матч считаются относительно союзников</mark>(но не относительно противников). Например, если игрок набил 100к урона(вроде бы много), но союзник набил 200к, то skill bracket игрока падает, а если игрок набил 10к урона(вроде бы мало), но союзник 5к, то skill bracket игрока растет. Показатели противников тут не важны. В докаллибровочных играх часто можно встретить абузеров skill bracket, т.к. он напрямую влияет на получение высокого рейтинга после каллибровки. Например, неуместное лечение по кд Ораклом, ульт Зевса по кд, напрасное поглощение урона в соло хардером вдали от команды и т.д. Правда, такой вариант не сулит победы, и как правило, замечается другими игроками и пресекается репортами, а в последствии испорченной порядочностью.</li>
                        <li>skill bracket <mark >не различает роли</mark>, т.е. 30к урона на суппорте и 30к урона на carry будут рассматриваться одинаково, это означает что идеально отыгранная партия за суппорта без большого потенциала маг урона, например, за Treant Protector или Chen будет понижать уровень skill bracket.</li>
                        <li>игрокам с одной команды skill bracket начисляется <mark >индивидуально</mark>, т.е. с одного матча игроки получат разный результат skill bracket, как правило, роли основы получают высше.</li>
                    </ul>
                    <h3 className={s.listTitle}>Признаки понижения показателя skill bracket:</h3>
                    <ul>
                        <li>на стадии выбора персонажей, игроки пытаются избегать своих ролей на позициях 3 и 5, например, 5<span className='reduceMarker'>-ка</span>  выбирает Magnus<span className='reduceMarker'>-а</span>, а 3<span className='reduceMarker'>-ка</span> Windranger, от чего в команде нет вардера и хардера;</li>
                        <li>суммарный урон carry в конце матча в разы меньше чем урон 5<span className='reduceMarker'>-ки</span>;</li>
                        <li>суммарный полученный урон 3<span className='reduceMarker'>-ки</span>  гораздо меньше остальных участников команды;</li>
                        <li>кастеры часто промахиваются спеллами;</li>
                        <li>союзники всю игру разбросаны по карте или наоборот слишком частые сражения неполным составом и т.д.</li>
                    </ul>
                </section>
                <section ref={refSectionReports} className="section">
                    <h2 className={s.h2}>Про репорты</h2>
                    <p>
                        В Dota2 подавляющая часть репортов обрабатываются автоматически, а процесс регулирования взаимоотношений - управляется самими игроками, образовывая своего рода игравую анархию. Репорты складируются в аккаунте игрока, а при достижении определенного количества, активируется система &quot;наказания&quot;. Разработчики игры создали такие условия, где репорты допускаются как от союзников, так и от противников. Автоматическое начисление репортов не обрабатывается должным образом, т.е. репорт может быть зачислен за чат, даже если игрок отключил все виды чата и не сказал/написал ни одного слова за весь матч. Также репорт может быть зачислен за препятствование игры, даже если игрок имеет идеальные показатели за матч и получил звание MVP(Most Valuable Player). Все это не проверяется и репорт слепо зачисляется.
                    </p>
                    <figure>
                        <figcaption className="mediumMarker"> При получении репорта в игре, после игры приходит опрос:</figcaption>
                        <Image src={img_feedback} className={`${s.img_feedback} ${s.img_centered}`} alt="feedback" />
                    </figure>
                    <p>
                        Некоторые репорты не отображаются в отчете порядочности и не влияют на общую порядочность, однако они влияют на локальную порядочность.
                    </p>
                    <h3 className={s.listTitle}>Союзники могут кинуть репорты за:</h3>
                    <ul>
                        <li className="li_first_level">злоупотребление способностей;</li>
                        <li className="li_first_level">разбивание вещей;</li>
                        <li className="li_first_level">токсичное поведение в чате(оскорбления, нытье);</li>
                        <li className="li_first_level">передача противнику расходников и вещей;</li>
                        <li className="li_first_level">выход из матча до его завершения;</li>
                        <li className="li_first_level">отклонение от текущей меты сборок вещей;</li>
                        <li className="li_first_level">умышленные и неумышленные смерти(feed);</li>
                        <li className="li_first_level">подсказки в чате противникам(&quot;слив информации&quot;), а также союзникам(&quot;указания что делать&quot;);</li>
                        <li className="li_first_level">воровство фрагов и крипов(stealing);</li>
                        <li className="li_first_level">пик не по роли;</li>
                        <li className="li_first_level">невыполнение роли:
                            <ul>
                                <li className="li_second_level">позиция 1 всю игру фармит и не сражается и т.д.</li>
                                <li className="li_second_level">позиция 2 не делает gank при достижении 6 lvl<span className='reduceMarker'>-а</span>;</li>
                                <li className="li_second_level">позиция 3 не инициирует сражения и не поглощает урон;</li>
                                <li className="li_second_level">позиция 4/5 не используют расходники;</li>
                            </ul>
                        </li>
                    </ul>
                    <h3 className={s.listTitle}>Противники могут кинуть репорты за:</h3>
                    <ul>
                        <li className="li_first_level">свое поражение(особенно тому кто явно выделился):
                            <ul>
                                <li className="li_second_level">контр пик;</li>
                                <li className="li_second_level">пристальный фокус;</li>
                                <li className="li_second_level">поражение 1 на 1 в миде(личное поражение);</li>
                                <li>издевательство под фонтаном(&quot;поставить ногу на грудь&quot;) и т.д.</li>
                            </ul>
                        </li>
                        <li className="li_first_level">неприязнь к определенному персонажу:
                            <ul>
                                <li className="li_second_level">Lion(стан + выкачка маны);</li>
                                <li className="li_second_level">Bounty Hunter(кража денег на линии и кража крипов у лесников в дебюте игры);</li>
                                <li className="li_second_level">Techies, Nyx Assassin, Lina(инвиз + мгновенный урон) и т.д.</li>
                            </ul>
                        </li>
                        <li className="li_first_level">
                            подозрение в читерстве:
                            <ul>
                                <li className="li_second_level">чрезмерное везение шансов(криты, баши, миссы);</li>
                                <li className="li_second_level">частые случайные попадания ненаправленными способностями(хук Пуджа, стрела Мираны, сан страйк Инвокера) и т.д.</li>
                            </ul>
                        </li>

                    </ul>
                    <p>
                        Большая часть репортов от команды противника необъективная, т.е. можно оправдать получение репорта за умышленные смерти, но часто бывает так, что игрок кидает репорт банально из обиды(человеческий фактор).
                    </p>
                </section>
                <section ref={refSectionСonclusion} className="section">
                    <h2 className={s.h2}>Вывод</h2>
                    <p>
                        Тильт кроется в падении локальной порядочности и показателя &quot;skill bracket&quot; в той или инной пропорции. Они тесно переплетены, т.е. снижение одного показателя тянет за собой другой. Чтобы не попадать в тильт или выйти с него нужно не получать репорты и делать хорошие результаты матча. Правильно входить в новый цикл локальной порядочности, т.е. считать 15 матчей после отчета(отчет приходит не сразу, а через пару минут после 15<span className='reduceMarker'>-ой</span> игры).
                    </p>
                    <h3 className={s.listTitle}>Для избежания понижения локальной порядочности:</h3>
                    <ul>
                        <li>отключить голосовой и текстовый чат;</li>
                        <li>ненавязчиво пользоваться колесом чата и колесом сигналов;</li>
                        <li>стараться максимально отыгрывать даже заведомо проигрышные партии;</li>
                        <li>не пытаться продвигать новые меты. Даже, если нестандартная сборка является очень эффективной, и возможно, через время станет топ мировой сборкой, то до того как это произойдет, такое поведение будет отталкивать игрока назад в порядочности и рейтинге, поэтому продвижение новых шаблонов сборок является рисковым и неблагодарным делом в рамках игры. Если команда одержит победу, то скорей всего, союзники дадут лайки за интересную игру, однако, если команда проиграет, то с большой вероятностью, союзники дадут репорты, потому что: <q>...вы посмотрите что он собрал?! Еул на СФ<span className='reduceMarker'>-a</span>... репорт однозначно!</q> (2017).
                        </li>
                    </ul>
                    <p>
                        Для избежания понижения показателя skill bracket нужно делать максимальные показатели матча расписанные ранее. Однако, на этом пункте нужно заострить внимание. Если действовать только в направлении повышения показателя skill bracket, то будет понижаться порядочность, т.к. все игроки будут пикать только damage dealer<span className='reduceMarker'>-ов</span>, и это проигрышный вариант, потому что пик будет несбалансированный и однобокий, в результате чего никто не сможет нормально наносить урон, ведь для этого нужен контроль(стан, замедление, хекс, сайленс и т.д.). Более того, с большой вероятностью, такая команда проиграет, при этом поссорится и обменяется репортами, к тому же сильно понизится и сам skill bracket. По моему мнению, нужно на стадии пика выбирать недостающее звено команды и пытаться сбалансировать пик, оставив предпочтительные позиции для менее опытных игроков, которые либо не умеют еще играть на всех ролях, либо имеют недостаточно желания победить, играя &quot;ради фана&quot; на определенном персонаже. Получается, изначально выбор нужно сосредотачивать на damage dealer/reducer<span className='reduceMarker'>-ов</span>, если команда принимает такой расклад, то подымаем skill bracket, если команда показывает намерение взять те же роли, то уступаем. В таком случае часть матчей будет сыграна на основных позициях, а часть на суппортах, и это нормально. В противном случае, снизится уровень порядочности, который повлечет за собой и снижение того же skill bracket<span className='reduceMarker'>-а</span> в следующих матчах. Тогда шанс выйграша минимальный даже при выборе недостающей роли. К тому же, сильно завышенный показатель skill bracket тоже нежелателен, потому что разгромно проигравшие противники будут кидать репорты из обиды. Как правило новый цикл начинается с 1-2 игр на среднем уровне, далее при правильном отыгрыше стремительно растет, и это трудно не заметить(уверенный win streak), аж до момента полного разгрома вражеских команд, от чего они начинают кидаться репортами и на этом win streak заканчивается в ожидании отчета о порядочности.
                    </p>
                    <figure>
                        <figcaption className="mediumMarker">Тайна раскрыта! Используй с умом...</figcaption>
                        <Image src={img_templarAssassin} className={s.img_templarAssassin} alt="Templar Assassin" />
                    </figure>
                </section>
            </div >
        </div >
    );
}