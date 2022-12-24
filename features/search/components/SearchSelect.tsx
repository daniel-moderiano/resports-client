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
          border: state.isFocused ? "none" : "none",
          borderRadius: "0",
          borderBottomLeftRadius: "0.25rem",
          borderTopLeftRadius: "0.25rem",
          backgroundColor: "#082145",
          outline: state.isFocused ? "2px solid #597cac" : "none",
          outlineOffset: "1px",
          boxShadow: "none",
          minWidth: "6.25rem",
          minHeight: "0",
          height: "2.25rem",
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
          backgroundColor: state.isSelected
            ? "#082145"
            : state.isFocused
            ? "rgba(161, 189, 217, 0.0784314)"
            : "#1d2125",
          "&:hover": {
            backgroundColor: state.isSelected
              ? "#082145"
              : "rgba(161, 189, 217, 0.0784314)",
          },

          "&:active": {
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
          color: "#579DFF",
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

        dropdownIndicator: (provided, state) => ({
          ...provided,
          padding: "0 0.5rem 0 0",
          width: "1.4rem",
          color: state.isFocused ? "#c7d1db" : "#b9d6ff",
          "&:hover": {
            color: "#c7d1db",
          },
        }),
      }}
    />
  );
}
