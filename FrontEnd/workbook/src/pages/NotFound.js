import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../constants';

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Container>
      <Div>
        <Tit404>페이지를 찾을 수 없습니다.</Tit404>
        <div>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. 입력하신 주소가 정확한지 다시 한 번 확인해주세요.</div>
        <PrevBtn onClick={() => {navigate(-1)}}>이전 페이지</PrevBtn>
      </Div>
    </Container>
    )
}

const Container = styled.section`
  width: 700px;
  margin: 180px auto;
  border: 1px solid ${COLORS.light_gray};
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  margin: 100px 0 80px;
  div {
    width: 500px;
    font-size: 15px;
    color: ${COLORS.black};
  }
`

const Tit404 = styled.p`
  color: ${COLORS.black};
  font-size: 35px;
`

const PrevBtn = styled.button`
  width: 150px;
  height: 48px;
  border-radius: 30px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
`


