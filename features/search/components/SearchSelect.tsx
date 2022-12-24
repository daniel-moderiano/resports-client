import Select, { Props, GroupBase } from "react-select";

export function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <Select
      {...props}
      styles={{
        control: (provided, state) => ({
          ...provided,
          border: "none",
          borderRadius: "0",
          borderBottomLeftRadius: "0.25rem",
          borderTopLeftRadius: "0.25rem",
          backgroundColor: state.isDisabled ? "#616161" : "#1d2125",
          outline: state.isFocused ? "2px solid #597cac" : "none",

          "&:hover": {
            borderColor: state.isFocused ? "#597cac" : "transparent",
          },
          minWidth: "7rem",
          minHeight: "0",
          height: "2rem",
          transition: "none",
        }),

        menu: (provided) => ({
          ...provided,
          backgroundColor: "#1d2125",
          borderRadius: "8px",
          margin: "0.5rem 0",
        }),

        menuList: (provided) => ({
          ...provided,
          maxHeight: "20rem",
        }),

        option: (provided, state) => ({
          ...provided,
          color: "#c7d1db",
          fontSize: "0.9rem",
          backgroundColor: state.isSelected ? "#082145" : "#1d2125",
          "&:hover": {
            backgroundColor: state.isSelected
              ? "#082145"
              : "rgba(161, 189, 217, 0.0784314)",
          },
        }),

        valueContainer: (provided) => ({
          ...provided,
          margin: "0",
          padding: "0",
        }),

        singleValue: (provided) => ({
          ...provided,
          padding: "0 0 0 0.5rem",
          margin: "0",
          color: "#c7d1db",
          fontSize: "0.9rem",
        }),

        clearIndicator: (provided) => ({
          ...provided,
          margin: "0",
          padding: "0 0.1rem",
        }),

        indicatorSeparator: (provided) => ({
          ...provided,
          display: "none",
        }),

        dropdownIndicator: (provided) => ({
          ...provided,
          padding: "0 0.5rem 0 0",
          width: "1.4rem",
        }),
      }}
    />
  );
}
