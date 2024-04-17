import { Row, Col, Checkbox, Button, Input } from "antd";
import { InputDataType } from "../../App";
import { ChangeEvent, useState } from "react";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import "./TodoListItem.css";
import { useNotifications } from "../../hooks/useNotifications";

export interface TodoListItemProps {
  item: InputDataType;
  onDelete: (e: ChangeEvent<any>) => void;
  onSave: (e: ChangeEvent<any>) => void;
}

const TodoListItem = (data: TodoListItemProps) => {
  const { onDelete, onSave } = data;
  const { id, title, completed } = data.item;
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedInput, setEditedInput] = useState(title);
  const [isChecked, setIsChecked] = useState(completed);
  const { contextHolder, openNotification } = useNotifications();

  const onCheck = () => {
    let message;
    if (isChecked) {
      message = "Marked Todo as Undone";
    } else {
      message = "Marked Todo as Done";
    }
    openNotification(message);
    setIsChecked(!isChecked);
  };

  const onEditButtonClick = () => {
    setIsEditMode(!isEditMode);
  };

  const onSaveButtonClick = (e: ChangeEvent<any>) => {
    setIsEditMode(!isEditMode);
    setUpdatedTitle(editedInput);
    onSave(e);
  };

  const onChangeInEditedInput = (e: ChangeEvent<any>) => {
    setEditedInput(e.currentTarget.value);
  };

  if (isEditMode) {
    return (
      <>
        {contextHolder}
        <Row className="item">
          <Col className="contents">
            <Col className="checkbox">
              <Checkbox checked={isChecked} onChange={onCheck} />
            </Col>
            <Col className="inputBar">
              <Input
                value={editedInput}
                onInput={onChangeInEditedInput}
                onPressEnter={onSaveButtonClick}
              />
            </Col>
          </Col>
          <Col className="buttons">
            <Button
              className="editOrSaveButton"
              id={id}
              onClick={onDelete}
              icon={<DeleteOutlined />}
            />
            <Button
              className="deleteButton"
              id={id}
              onClick={onSaveButtonClick}
              icon={<SaveOutlined />}
            />
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <Row className="item">
        <Col className="contents">
          <Col className="checkbox">
            <Checkbox
              checked={isChecked}
              onChange={onCheck}
              defaultChecked={completed}
            />
          </Col>
          <Col className="title">{updatedTitle}</Col>
        </Col>
        <Col className="buttons">
          <Button
            className="editOrSaveButton"
            id={id}
            onClick={onEditButtonClick}
            icon={<EditOutlined />}
          />
          <Button
            className="deleteButton"
            id={id}
            onClick={onDelete}
            icon={<DeleteOutlined />}
          />
        </Col>
      </Row>
    </>
  );
};

export default TodoListItem;
