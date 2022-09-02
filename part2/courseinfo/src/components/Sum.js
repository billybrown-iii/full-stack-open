const Sum = ({ parts }) => {
  return (
    <div>
      <b>Total number of exercises: </b>
      {parts.reduce((prev, next) => prev + next.exercises, 0)}
    </div>
  );
};

export default Sum;
