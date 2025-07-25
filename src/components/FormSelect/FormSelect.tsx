import Select from 'react-select';
import style from './FormSelect.module.css';
import './FormSelect.css';

const images = [
  { label: 'bench press', value: 'bench-press' },
  { label: 'squat', value: 'squat' },
  { label: 'deadlift', value: 'deadlift' },
  { label: 'overhead press', value: 'overhead-press' },
  { label: 'pull-up', value: 'pull-up' },
  { label: 'dumbbell row', value: 'dumbbell-row' },
  { label: 'barbell curl', value: 'barbell-curl' },
  { label: 'tricep dip', value: 'tricep-dip' },
  { label: 'leg press', value: 'leg-press' },
  { label: 'lat pulldown', value: 'lat-pulldown' },
  { label: 'seated row', value: 'seated-row' },
  { label: 'leg curl', value: 'leg-curl' },
  { label: 'leg extension', value: 'leg-extension' },
  { label: 'calf raise', value: 'calf-raise' },
  { label: 'shoulder press', value: 'shoulder-press' },
  { label: 'lateral raise', value: 'lateral-raise' },
  { label: 'front raise', value: 'front-raise' },
  { label: 'bicep curl', value: 'bicep-curl' },
];

interface FormSelectProps {
  query: string;
  onSubmit: (query: string) => void;
}
export default function FormSelect({ query, onSubmit }: FormSelectProps) {
  const handleChange = (newValue: { label: string; value: string } | null) => {
    if (newValue) {
      onSubmit(newValue.value);
    }
  };
  return (
    <div className={style.box}>
      <p className={style.text}>Your gym exercise: &nbsp;</p>
      <Select
        className={style.select}
        classNamePrefix="react-select"
        isSearchable
        options={images}
        value={{ label: query, value: query }}
        onChange={handleChange}
      />
    </div>
  );
}
