import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { StopOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import { useDispatch } from "react-redux";
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const ListWrapper = styled(List)`
  margin-bottom: 10px;
  text-align: center;
`;
const ButtonWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`;
const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();

  const onClickUnFollow = (id) => {
    if (header === "팔로잉") {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    } else if (header === "팔로워") {
      dispatch({
        type: REMOVE_FOLLOWER_REQUEST,
        data: id,
      });
    }
  };

  return (
    <>
      <ListWrapper
        grid={{ gutter: 4, xs: 2, md: 3, lg: 3 }}
        style={{ marginBottom: 20 }}
        size="small"
        bordered
        header={<div>{header}</div>}
        loadMore={
          <ButtonWrapper>
            <button>더보기</button>
          </ButtonWrapper>
        }
        dataSource={data}
        renderItem={(item) => (
          <List.Item style={{ marginTop: 20 }}>
            <Card
              actions={[
                <StopOutlined
                  key="stop"
                  onClick={() => onClickUnFollow(item.id)}
                />,
              ]}
            >
              <Card.Meta description={item.nickname} />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};
export default FollowList;
