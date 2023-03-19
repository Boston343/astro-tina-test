import React from "react";

const InputTextWithWarning = (props) => {
  const { input, maxLen, inputClass, warningClass } = props;
  const strLen = input?.value?.length || 0;

  return (
    <div>
      <input name={input.name} type="text" className={inputClass} {...input} />
      {strLen > maxLen ? (
        <span className={warningClass}>
          The {input.name} should be shorter than {maxLen.toString()} characters
        </span>
      ) : null}
    </div>
  );
};

export default InputTextWithWarning;
