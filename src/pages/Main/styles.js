import Styled, { keyframes, css } from "styled-components";

export const Form = Styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;

  input{
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px; 
  }
`;

const rotate = keyframes`
  /*Cria um css rotate e guarda na variavel.*/
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

export const SubmitButton = Styled.button.attrs(props => ({
  type: "submit",
  disabled: props.laoding,
}))`
  color: #fff;
  background: #303030;
  border: 0;
  padding: 15px 15px;
  margin-left: 10px;
  border-radius: 4px; 

  display: flex;
  flex-direction: center;
  align-items: center;

  /*Se DISABLED for TRUE desabilita botão*/
  &[disabled] { 
    cursor:  not-allowed;
    opacity: 0.6;
  }
  /*Se PROPS.LOADING for TRUE aplica animação. */
  ${props => 
    props.laoding &&
    css`
      svg {
          /*Aplica animação com a rotação */ 
          animation: ${rotate} 2s linear infinite;  
        }
    `
  }

`;
export const List = Styled.ul`

  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  li {
    border-top: 1px solid #eee;
  }

  a {
    color: #4682B4;
    text-decoration: none;
  }


`;