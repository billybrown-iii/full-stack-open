const Filter = ({ filterName, setFilterName }) => {
  return (
    <div>
      Filter by name:{" "}
      <input
        value={filterName}
        onChange={(e) => {
          setFilterName(e.target.value);
        }}
      />
    </div>
  );
};

export default Filter;
