import s from './HeadingH3.module.css';

function HeadingH3(props) {
    return <h2 className={s.mainH3}>{props.children}</h2>;
}

export default HeadingH3;
