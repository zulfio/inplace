import { Button, Tabs } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  & h2 {
    font-size: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.positive};
    text-align: left;
  }
  & h3 {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.gray800};
    text-align: left;
  }

  & h4 {
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.gray800};
    text-align: left;
  }

  & p {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: ${({ theme }) => theme.gra600};
  }

  & h4 {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: ${({ theme }) => theme.gray600};
    text-align: left;
  }

  & span {
    font-size: 12px;
    font-weight: 400;
    text-align: left;
  }
`;

const InfoWrapper = styled.div`
  border: 1px solid;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

const InfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InfoRight = styled.div`
  display: flex;
  align-items: center;
`;

const FollowInfoWrapper = styled.div`
  display: flex;
`;

const EditButton = styled(Button)`
  color: ${({ theme }) => theme.gray700};
`;

const StyledTab = styled(Tabs)`
  margin-top: 20px;
  & div.ant-tabs-nav-wrap {
    display: flex;
    justify-content: center;
  }
  & .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${({ theme }) => theme.gray700};
  }

  & div.ant-tabs-ink-bar {
    background-color: ${({ theme }) => theme.gray700};
  }
`;

const P = {
  Wrapper,
  InfoWrapper,
  InfoLeft,
  InfoRight,
  FollowInfoWrapper,
  EditButton,

  StyledTab,
};

export default P;
