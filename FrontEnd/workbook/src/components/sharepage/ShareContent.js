import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShareDeleteModal from "./ShareDeleteModal";
import ShareModeModal from "./ShareModeModal";
import ShareUpdateModal from "./ShareUpdateModal";
import styled, { css } from "styled-components";
import axios from "axios";
import { COLORS, API } from "../../constants/index";

export default function ShareContent(props) {
  const token = sessionStorage.getItem("token");
  const userId = props.userid;

  const [sharedWorkbook, setSharedWorkbook] = useState([
    {
      workBook: {
        id: "",
        title: "",
        content: "",
        share: "",
        username: "",
        count: "",
        type: "",
        image: "",
        regDate: "",
        modDate: "",
      },
      user: {
        id: "",
        username: "",
        name: "",
        email: "",
        password: "",
        image: "",
      },
    },
  ]);

  let [shareUpdate, setShareUpdate] = useState(Array(100).fill(false));
  let [shareDeleteModal, setShareDeleteModal] = useState(false);
  let [shareModeModal, setShareModeModal] = useState(false);
  let [shareWorkbookId, setShareWorkbookId] = useState("");
  let [shareUsername, setShareUsername] = useState("");

  const ReadShared = async () => {
    const res = await axios.get(`${API}/share/${userId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setSharedWorkbook(res.data.dtoList);
  };

  // 클릭한 문제집만 모달 보이기
  const shareUpdateBoolean = (e) => {
    if (shareUpdate[e.target.value] === true) {
      const newarray = [...shareUpdate];
      newarray[e.target.value] = false;
      setShareUpdate(newarray);
    } else {
      const newarray = [...shareUpdate];
      for (let i = 0; i < newarray.length; i++) {
        if (i === e.target.value) {
          newarray[i] = true;
        } else {
          newarray[i] = false;
        }
      }
      setShareUpdate(newarray);
    }
  };

  const workbookId = (id) => {
    setShareWorkbookId(id);
  };

  const username = (username) => {
    setShareUsername(username);
  };

  useEffect(() => {
    ReadShared();
  }, []);

  return (
    <>
      <Article>
        <Myworkbook>
          <p>가져온 문제집</p>
        </Myworkbook>

        <Example>
          {sharedWorkbook.map((workbookdata, i) => {
            return (
              <ExampleLi
                onClick={(e) => {
                  setShareUpdate(!shareUpdate);
                  shareUpdateBoolean(e);
                  workbookId(workbookdata.workBook.id);
                  username(workbookdata.workBook.username);
                }}
                imageurl={workbookdata.workBook.image}
                value={i}
                key={workbookdata.workBook.id}
              >
                <Link
                  to={`/detail/${workbookdata.workBook.id}`}
                  state={{ username: workbookdata.workBook.username }}
                >
                  <ExampleP1>{workbookdata.workBook.title}</ExampleP1>
                  <ExampleP2>
                    마지막 수정 일시 :
                    {workbookdata.workBook.modDate.substring(0, 10)}
                  </ExampleP2>
                </Link>
                {shareUpdate[i] === true ? (
                  <ShareUpdateModal
                    workbookId={workbookdata.id}
                    setSharedWorkbook={setSharedWorkbook}
                    setSharedeletemodal={setShareDeleteModal}
                    sharedeletemodal={shareDeleteModal}
                    sharemodemodal={shareModeModal}
                    setSharemodemodal={setShareModeModal}
                  />
                ) : null}
              </ExampleLi>
            );
          })}

          {shareDeleteModal === true ? (
            <ShareDeleteModal
              workbookid={shareWorkbookId}
              userid={userId}
              sharedeletemodal={shareDeleteModal}
              setSharedeletemodal={setShareDeleteModal}
            />
          ) : null}

          {shareModeModal === true ? (
            <ShareModeModal
              shareusername={shareUsername}
              shareworkbookid={shareWorkbookId}
              sharemodemodal={shareModeModal}
              setSharemodemodal={setShareModeModal}
            />
          ) : null}
        </Example>
      </Article>
    </>
  );
}

const Article = styled.article`
  flex-basis: 70%;
  position: relative;
  margin: 0 auto;
  border: 3px solid ${COLORS.light_gray};
  border-radius: 15px;
`;

const Myworkbook = styled.div`
  height: 7%;
  border-bottom: 3px solid ${COLORS.light_gray};
  p {
    margin-left: 20px;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 3rem;
  }
`;

const Example = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 25px;
  padding: 1em 3em;
  max-height: 85%;
  overflow-x: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: ${COLORS.light_gray};
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.white};
  }
`;

const ExampleLi = styled.li`
  position: relative;
  margin: 20px 0;
  height: 20rem;
  cursor: pointer;
  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background: url(/img/basic.png) no-repeat center center/cover;
    z-index: -10;
    opacity: 0.6;

    ${(props) =>
      props.imageurl &&
      css`
        background: url(${(props) => props.imageurl}) no-repeat center
          center/cover;
      `}
  }
`;

const ExampleP1 = styled.p`
  margin-top: 25%;
  font-size: 1.6rem;
  font-weight: 550;
  text-align: center;
  z-index: 20;
  cursor: pointer;
`;

const ExampleP2 = styled.p`
  margin-bottom: 0;
  color: ${COLORS.gray};
  font-size: 0.3rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  z-index: 20;
`;
