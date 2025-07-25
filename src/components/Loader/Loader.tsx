import { BarLoader } from 'react-spinners';
import style from './Loader.module.css';

export default function Loader() {
  return (
    <div className={style.backdrop}>
      <BarLoader color="#24a14f" width={220} height={10} />
    </div>
  );
}
