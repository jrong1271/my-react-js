import React, { FC } from "react";
import styled from "@emotion/styled";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
  "&:hover >button": {
    visibility: "visible",
  },
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});
const Button = styled.button({
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: 20,
  color: "red",
  marginLeft: "auto",
  visibility: "hidden",
  "&:hover": {
    color: "darkred",
  },
});

export interface TodoItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
  onDelete: (id:string) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  id,
  label,
  checked = false,
  onChange,
  onDelete,
}) => {
  return (
    <Wrapper 
      className="group"
      >
      <Checkbox
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(id, !checked)}
      />
      <Label checked={checked}>{label}</Label>
      <Button
        onClick={() => onDelete(id)}
      >
        ✕
      </Button>
    </Wrapper>
  );
};
