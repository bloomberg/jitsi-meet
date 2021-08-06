
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

export const AddOptionsButton = styled(Button)`
  align-self: center;
  font-size: 15px;
`;


export const PollCreateButton = styled(Button).attrs({
    primary: true
})`
font-size: 15px;
height: 40px;
width: 100%;

& > *:not(:last-child) {
  margin-right: 8px;
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

export const Heading = styled.div`
  color: #d1dbe8;
  font-style: normal;
  font-size: 15px;
  line-height: 24px;
  margin: 8px 0 ${props => props.theme.panePadding}px;
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
  justify-content: space-between;
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

export const PollOptionsContainer = styled.div`
  align-items: center;
  color: white;
  display: flex;
  font-size: 13px;
  height: ${props => props.theme.participantItemHeight}px;
  margin: 0 -${props => props.theme.panePadding}px;
  padding-left: ${props => props.theme.panePadding}px;
  position: relative;

  
  ${props => !props.isHighlighted && '}'}
`;

export const PollsTitle = styled.div`
  overflow: auto;
  height: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
`;

export const PollOptionsTitle = styled.div`
  overflow: auto;
  height: 100%;
  padding-top: 10px;
  margin-bottom: 10px;
  width: 100%;
`;

export const PollsTitleContainer = styled.div`
  display: flex;
  flex: 1;
  margin-right: 8px;
  overflow: auto;
`;

export const TitleInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: 1px solid white;
  padding: 10px 15px;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 14px;
`;


export const Option = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 15px;
  height: 25px;

`;

export const OptionInput = styled.input`
  display: block;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid white;
`;

export const CustomizedAnswerInput = styled.input`
  display: block;
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid white;
  height: 80%;
`;


export const AddOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;


// export const ProgressBar = styled.div`
// background: rgba(255,255,255,0.1);
// justify-content: flex-start;
// border-radius: 100px;
// align-items: center;
// position: relative;
// padding: 0 5px;
// display: flex;
// height: 10px;
// width: 100%;
// `;

// export const Progress = styled.div`
// animation: load 3s normal forwards;
// box-shadow: 0 10px 40px -10px #fff;
// border-radius: 100px;
// background: #fff;
// height: 30px;
// width: 0;
// `;

export const ProgressBarConatainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &:hover {
    opacity: 0.8;
    }
`;

export const ProgressBarComplete = styled.div`
  position: absolute;
  left: 0;
  top: 0px;
  height: 100%;
  background-color: #5225bd;
  z-index: 2;
`;

export const ProgressBarLiquid = styled.div`
  z-index: 1;
  height: 100%;
  position: absolute;
  right: -5px;
  top: -10px;
  background-color: #5225bd;
  
`;

export const Progress = styled.span`
  z-index: 2;
`;
