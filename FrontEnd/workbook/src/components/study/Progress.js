<<<<<<< HEAD
import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function Progress({ mode, total, currentQuestion }) {
  return (
    <>
      {mode ? (
        <ProgressCheck>총 {total} 문제</ProgressCheck>
      ) : (
        <ProgressCheck>문제 {currentQuestion + 1} of {total}</ProgressCheck>
      )}
    </>
  )
}

const ProgressCheck = styled.h2`
  margin: 6px 20px;
  color: ${COLORS.gray};
  font-size: 15px;
`;
=======
import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function Progress({ mode, total, currentQuestion }) {
  return (
    <>
      {mode === "exam" ? (
        <ProgressCheck>총 {total} 문제</ProgressCheck>
      ) : (
        <ProgressCheck>문제 {currentQuestion + 1} of {total}</ProgressCheck>
      )}
    </>
  )
}

const ProgressCheck = styled.h2`
  margin: 6px 20px;
  color: ${COLORS.gray};
  font-size: 15px;
  @media (max-width: 640px) { 
    display: none;
  }
`;
>>>>>>> 06f68097701e569c9cf3517a15b981fdce0f81e4
