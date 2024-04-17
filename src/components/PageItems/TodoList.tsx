import { Button, Col, Input, Row, Typography } from "antd";
import TodoListItem from "./TodoListItem";
import { PlusOutlined } from "@ant-design/icons";
import { InputDataType } from "../../App";
import { ChangeEvent, useState } from "react";
import "./TodoList.css";
import { useNotifications } from "../../hooks/useNotifications";

export interface TodoListProps {
  data: InputDataType[];
}

const dummyUserId = 0;

const TodoList = (props: TodoListProps) => {
  const [data, setData] = useState<InputDataType[]>(props.data);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(data.length + 1);
  const { contextHolder, openNotification } = useNotifications();

  const onInput = (e: ChangeEvent<any>) => {
    e.preventDefault();
    e.stopPropagation();
    setInput(e.currentTarget.value);
  };

  const onSubmit = (e: ChangeEvent<any>) => {
    e.preventDefault();
    if (input) {
      const newEntry: InputDataType = {
        userId: dummyUserId,
        id: nextId,
        title: input,
        completed: false,
      };
      const newList = [...data, newEntry];
      setData(newList);
      setNextId(nextId + 1);
    }
    openNotification(`New Todo "${input}" added`);
    setInput("");
  };

  const onDelete = (e: ChangeEvent<any>) => {
    e.preventDefault();
    const copyOfData = data.slice();
    const modifiedData = copyOfData.filter(
      (obj) => Number(obj.id) !== Number(e.currentTarget.id)
    );
    setData(modifiedData);
    openNotification(`Successfully deleted Todo`);
  };

  const onSave = (e: ChangeEvent<any>) => {
    e.preventDefault();
    let copyOfData = data.slice();
    for (var i = 0; i < copyOfData.length; i++) {
      if (Number(copyOfData[i].id) === Number(e.currentTarget.id)) {
        copyOfData[i].title = e.currentTarget.value;
        break;
      }
    }
    setData(copyOfData);
    openNotification(`Sucessfully edited Todo`);
  };

  return (
    <>
      {contextHolder}
      <Col className="list">
        <Typography className="todoListTitle">Todo List</Typography>
        <Row className="contents">
          <Row className="inputBarAndButton">
            <Col className="inputBar">
              <Input
                size="large"
                placeholder="Add a task..."
                onInput={onInput}
                value={input}
                onPressEnter={onSubmit}
              />
            </Col>
            <Col className="addButton">
              <Button size="large" icon={<PlusOutlined />} onClick={onSubmit} />
            </Col>
          </Row>
          <Col>
            {data.map((item) => (
              <Row key={item.id} className="listOfItems">
                <TodoListItem item={item} onDelete={onDelete} onSave={onSave} />
              </Row>
            ))}
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default TodoList;
