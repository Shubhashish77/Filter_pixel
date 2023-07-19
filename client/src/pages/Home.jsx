import { css, styled } from 'styled-components';
import { useImage } from '../features/useImage';
import { useState } from 'react';
import Spinner from '../ui/Spinner'

const Top = styled.div`
    margin: 2rem 4.8rem;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
`;

const Item = styled.div`
   display: flex;
   padding: 1rem;
   flex:1;
   align-items: center;
   justify-content: center;
   ${(props) =>
        props.type === "first" && props.state === "first" &&
        css`
       background-color: #fff;
       color: var(--color-grey-900);
    `}
    ${(props) =>
        props.type === "second" && props.state === "second" &&
        css`
       background-color: #fff;
       color: var(--color-grey-900);
    `}
   &:hover{
    background-color: #fff;
    color:var(--color-grey-900);
   }
   border-top-right-radius: 50px;
   border-top-left-radius: 50px;
`;

const Container = styled.div`
    margin: 2rem 4.8rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 15px;
`;

const Image = styled.img`
  border-radius: 10px;
  min-width: 200px;
  min-height: 200px;
  border: 3px solid black;
  color: white;
  &:hover{
    scale: 1.1;
    transition: all 1s;
  }
`;

const Home = () => {
    const [btnState, setButtonState] = useState("first");
    const { isLoading, imageList } = useImage();

    return (
        <>
            <Top>
                <Row>
                    <Item type='first' state={btnState} onClick={() => setButtonState("first")}>
                        Google Drive
                    </Item>
                    <Item type='second' state={btnState} onClick={() => setButtonState("second")}>
                        S3
                    </Item>
                </Row>
                <hr />
            </Top>

            <Container>
                {isLoading ? <Spinner /> : btnState === 'first' ? (
                    imageList?.data?.map((data) => {
                        return <Image src={data.webViewLink} key={data.name} alt={data.name} />
                    })
                ) : (<Row>Still Working on it...</Row>)}
            </Container>
        </>
    )
}

export default Home;