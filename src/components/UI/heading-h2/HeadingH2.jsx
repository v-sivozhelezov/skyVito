import s from './HeadingH2.module.css';

function HeadingH2(props) {
    return <h2 className={s.mainH2}>{props.children}</h2>;
}

export default HeadingH2;
