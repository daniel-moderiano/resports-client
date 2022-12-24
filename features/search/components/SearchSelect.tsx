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
          borderWidth: "2px",
          borderColor: state.isFocused ? "#597cac" : "transparent",
          borderRadius: "0",
          backgroundColor: state.isDisabled ? "#616161" : "#1d2125",

          "&:hover": {
            borderColor: state.isFocused ? "#597cac" : "transparent",
          },
          width: "8rem",
          minHeight: "0px",
          maxHeight: "2rem",
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
          lineHeight: "1.5rem",
          padding: "0.625rem 0.875rem",
        }),

        valueContainer: (provided) => ({
          ...provided,
          margin: "0",
          padding: "0",
        }),

        singleValue: (provided) => ({
          ...provided,
          padding: "0.25rem",
          margin: "0",
          color: "#c7d1db",
          // fontSize: "1rem",
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
          padding: "0.25rem",
        }),
      }}
    />
  );
}
