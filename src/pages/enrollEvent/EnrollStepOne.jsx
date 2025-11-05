import styled from "styled-components";
import { useState } from "react";

import InputBox from "../../components/enrollEvent/InputBox";
import Calender from "../../components/Calender";
import CustomCheckbox from "../../components/enrollEvent/CustomCheckbox";


function EnrollStepOne(){
    const [isChecked, setIsChecked] = useState(false);

    return(
        <Container>
            <Section>
                <Label>카테고리 선택 *</Label>
                <BtnArea>
                    <Button>공연</Button>
                    <Button>전시</Button>
                    <Button>기타</Button>
                </BtnArea>

            </Section>

            <Section> 
                <Label>공연/전시 이름 *</Label>
                <InputBox max={38}/>
            </Section>

            <Section> 
                <Label>포스터</Label>
            </Section>

            <Section> 
                <Label>장소 *</Label>
                <ExplainTxt>
                    <p>장소 이름만 입력해주세요</p>
                    <ul>
                        <li>서울 서대문구 이화여대길 52 (X) - 상세설명에 작성 가능</li>
                        <li>이화여대 대강당 (O) </li>
                    </ul>
                </ExplainTxt>
                <InputBox max={25} placeholder={"장소명"}/>
            </Section>

            <Section> 
                <Label>일시 *</Label>
                <Calender />
            </Section>

            <Section2> 
                <Section>
                    <Label>시작시간 *</Label>
                    <InputBox placeholder={"-"}/>
                </Section>
                <Section>
                    <Label>끝나는 시간</Label>
                    <InputBox placeholder={"-"}/>
                </Section>
            </Section2>

            <Section> 
                <Label>일시 예외사항</Label>
                <ExplainTxt>
                    <p>일시 관련하여 예외사항이 있다면 작성해주세요</p>
                    <p>예시) 토요일만 4시 마감 </p>
                </ExplainTxt>
                <InputBox max={25} placeholder={"예외사항"}/>
            </Section>

            <Section> 
                <Label>가격 *</Label>
                <CheckBoxArea>
                    <CustomCheckbox 
                        checked={isChecked}
                        onChange={setIsChecked}/>
                    <span>무료</span>
                </CheckBoxArea>

                <InputBox />
            </Section>

            <Section> 
                <Label>예매 링크 *</Label>
                <CheckBoxArea>
                    <CustomCheckbox 
                        checked={isChecked}
                        onChange={setIsChecked}/>
                    <span>예매 필요 없음</span>
                </CheckBoxArea>
                <InputBox />
            </Section>

            <Section> 
                <Label>주최 단체명 *</Label>
                <ExplainTxt>
                    <p>한글만 사용, 최대한 짧게 작성해주세요</p>
                    <ul>
                        <li>이화여대 아마추어 오케스트라 에세이오스 ESAOS (X)</li>
                        <li>에세이오스 (O)</li>
                        <li>이화여대 디자인학부 (O) </li>
                    </ul>

                </ExplainTxt>
                <InputBox max={23} placeholder={"최대한 짧게 작성해주세요"}/>
            </Section>
        </Container>
    )
}

export default EnrollStepOne;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    
    margin-top: 16px;

`
const Section = styled.div`
    display: flex;
    flex-direction: column;
`
const ExplainTxt = styled.div`
    p{
        color: ${({ theme }) => theme.colors.gray6};
        font-size: ${({ theme }) => theme.font.fontSize.label12};
        font-weight: ${({ theme }) => theme.font.fontWeight.regular};
        line-height: ${({ theme }) => theme.font.lineHeight.wide};
    }
    ul{
        list-style-position: outside;
        list-style-type: disc;
        padding-inline-start: 20px;
        margin: 0px;
    }

    li{
        color: ${({ theme }) => theme.colors.gray6};
        font-size: ${({ theme }) => theme.font.fontSize.label12};
        font-weight: ${({ theme }) => theme.font.fontWeight.regular};
        line-height: ${({ theme }) => theme.font.lineHeight.wide};
    }
    li::marker {
        font-size: 0.8em;
    }
`
const Section2 = styled.div`
    display: flex;
    gap: 8px;
`
const Label = styled.h3`
    color: ${({ theme }) => theme.colors.blackMain};
    font-size: ${({ theme }) => theme.font.fontSize.title15};
    font-weight: ${({ theme }) => theme.font.fontWeight.semiBold};
    line-height: ${({ theme }) => theme.font.lineHeight.normal};
`
const BtnArea = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
`
const Button = styled.div`
    display: flex;
    width: 78px;
    height: 32px;
    //padding: 6px 26px 5px 27px;
    justify-content: center;
    align-items: center;

    color: ${({ theme }) => theme.colors.gray8};
    font-size: ${({ theme }) => theme.font.fontSize.body14};
    font-weight: ${({ theme }) => theme.font.fontWeight.regular};
    line-height: ${({ theme }) => theme.font.lineHeight.wide};

    border-radius: 100px;
    border: 1px solid ${({ theme }) => theme.colors.gray4};
`
const CheckBoxArea = styled.div`
    margin-top: 8px;
    display: flex;
    gap: 6px;
    align-items: center;

    span{
        color: ${({ theme }) => theme.colors.gray7};
        font-size: ${({ theme }) => theme.font.fontSize.body14};
        font-weight: ${({ theme }) => theme.font.fontWeight.regulr};
        line-height: ${({ theme }) => theme.font.lineHeight.wide};
    }
`