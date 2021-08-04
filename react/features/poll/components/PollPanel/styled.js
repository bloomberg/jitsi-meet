
import styled from 'styled-components';

import { ActionTrigger } from '../../constants';

export const ignoredChildClassName = 'ignore-child';


export const Button = styled.button`
  align-items: center;
  background-color: ${
    // eslint-disable-next-line no-confusing-arrow
    props => props.primary ? '#0056E0' : '#3D3D3D'
};
  border: 0;
  border-radius: 6px;
  display: flex;
  font-weight: unset;
  justify-content: center;

  &:hover {
    background-color: ${
    // eslint-disable-next-line no-confusing-arrow
    props => props.primary ? '#246FE5' : '#525252'
};
  }
`;

export const Container = styled.div`
  box-sizing: border-box;
  flex: 1;
  overflow-y: auto;
  position: relative;
  padding: 0 ${props => props.theme.panePadding}px;

  & > * + *:not(.${ignoredChildClassName}) {
    margin-top: 16px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Close = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 20px;
  justify-content: center;
  width: 20px;

  &:before, &:after {
    content: '';
    background-color: #a4b8d1;
    border-radius: 2px;
    height: 2px;
    position: absolute;
    transform-origin: center center;
    width: 21px;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

export const Footer = styled.div`
  background-color: #141414;
  display: flex;
  justify-content: flex-end;
  padding: 24px ${props => props.theme.panePadding}px;

  & > *:not(:last-child) {
    margin-right: 16px;
  }
`;

export const FooterButton = styled(Button)`
  height: 40px;
  font-size: 15px;
  padding: 0 16px;
`;

export const Header = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: ${props => props.theme.headerSize}px;
  padding: 0 20px;
`;

export const PollsActions = styled.div`
  align-items: center;
  z-index: 1;

  & > *:not(:last-child) {
    margin-right: 8px;
  }
`;

export const PollsContent = styled.div`
  align-items: center;
  box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.15);
  display: flex;
  flex: 1;
  height: 100%;
  overflow: auto;
  padding-right: ${props => props.theme.panePadding}px;
`;

export const PollsContainer = styled.div`
  align-items: center;
  color: white;
  display: flex;
  font-size: 13px;
  height: ${props => props.theme.participantItemHeight * 1.5}px;
  margin: 0 -${props => props.theme.panePadding}px;
  padding-left: ${props => props.theme.panePadding}px;
  position: relative;

  ${props => !props.isHighlighted && '&:hover {'}
    background-color: #292929;

    & ${PollsActions} {
      ${props => props.trigger === ActionTrigger.Hover && `
        display: flex;
      `}
    }

    & ${PollsContent} {
      box-shadow: none;
    }
  ${props => !props.isHighlighted && '}'}
`;

export const PollsTitle = styled.div`
  overflow: auto;
  height: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
`;

export const PollsTitleContainer = styled.div`
  display: flex;
  flex: 1;
  margin-right: 8px;
  overflow: auto;
`;
