/* eslint-disable react/prop-types */
import { ChangeEvent, useEffect, useState } from "react";

import Styles from "./colorPickerStyle.scss";

const ColorPicker: React.FC<{value: string}> = (props) => {

  const [color, setColor] = useState(props.value);
  const [isCopied, setCopied] = useState(false);

  const pickerID = `color-picker_${Date.now()}`;

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(color).then(() => {
      setCopied(true);
    });

    setTimeout(() => setCopied(false), 600);
  };

  useEffect(() => setColor(props.value), [props.value]);

  return (
    <section className={Styles.base}>
      <input onChange={handleColorChange} type="color" id={pickerID} className={Styles.input}/>

      <section className={Styles.baseCor}>
        <label htmlFor={pickerID}>
            <div style={{ backgroundColor: color }} className={Styles.color} />
        </label>
    </section>
    <button onClick={handleCopyToClipBoard} className={Styles.button}>{isCopied ? "Copied" : color}</button>
        
    </section>
  );
};

export default ColorPicker;
