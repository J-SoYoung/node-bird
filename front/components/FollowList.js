import { StopOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import React from "react";
import styled from "styled-components";

const ListWrapper = styled(List)`
  margin-bottom: 10px;
  text-align: center;
`;
const ButtonWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;
const FollowList = ({ header, data }) => {
  return (
    <>
      <ListWrapper
        grid={{ gutter: 4, xs: 2, md: 3, lg: 3 }}
        style={{ marginBottom: 20 }}
        dataSource={data}
        size="small"
        header={<div>{header}</div>}
        loadMore={
          <ButtonWrapper>
            <button>더보기</button>
          </ButtonWrapper>
        }
        bordered
        renderItem={(item) => (
          <List.Item style={{ marginTop: 20 }}>
            <Card actions={[<StopOutlined key="stop" />]}>
              <Card.Meta description={item.nickname} />
              {item.nickname}
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
export default FollowList;
