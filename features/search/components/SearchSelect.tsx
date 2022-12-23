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
          borderWidth: "1px",
          borderColor: state.isFocused ? "#FFFFFF" : "#000000",
          borderRadius: "8px",
          boxShadow: state.isFocused ? "#FFFFFF" : "#000000",
          padding: "0.5625rem 0.8125rem",
          backgroundColor: state.isDisabled ? "#FFFFFF" : "#000000",

          "&:hover": {
            borderColor: state.isFocused ? "#FFFFFF" : "#000000",
            cursor: "pointer",
          },
        }),

        menu: (provided) => ({
          ...provided,
          boxShadow:
            "0px 12px 16px -4px rgba(16, 24, 40, 0.1), 0px 4px 6px -2px rgba(16, 24, 40, 0.05)",
          borderRadius: "8px",
          margin: "0.5rem 0",
        }),

        menuList: (provided) => ({
          ...provided,
          maxHeight: "20rem",
        }),

        option: (provided, state) => ({
          ...provided,
          color: "#FFFFFF",
          lineHeight: "1.5rem",
          padding: "0.625rem 0.875rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor:
            state.isFocused || state.isSelected ? "#FFFFFF" : "#FFFFFF",

          "&:hover": {
            backgroundColor: `#FFFFFF`,
          },
        }),

        valueContainer: (provided) => ({
          ...provided,
          margin: "0",
          padding: "0",
        }),

        placeholder: (provided) => ({
          ...provided,
          color: "#FFFFFF",
          lineHeight: "1.5rem",
          display: "flex",
          alignContent: "center",
          margin: "0",
        }),

        singleValue: (provided) => ({
          ...provided,
          lineHeight: "1.5rem",
          display: "flex",
          alignContent: "center",
          margin: "0",
        }),

        clearIndicator: (provided) => ({
          ...provided,
          margin: "0",
          padding: "0 0.1rem",
        }),
      }}
    />
  );
}
