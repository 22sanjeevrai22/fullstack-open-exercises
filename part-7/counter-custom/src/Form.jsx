import useField from "../hooks/useField";

const Form = () => {
  const name = useField("text");
  // name = {
  //     type,
  //     value,
  //     onChange,
  //   }
  const birthdate = useField("date");
  // birthday = {
  //     type:type,
  //     value:type,
  //     onChange:type,
  //   }
  const height = useField("number");

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...birthdate} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {birthdate.value} {height.value}
      </div>
    </div>
  );
};

export default Form;
