import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { walletconnectcall } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import * as s from "./styles/globalStyles";
import Checkbox from "./styles/Checkbox";
import styled from "styled-components";
import Moralis from 'moralis';
Moralis.start({ serverUrl : "https://ln5wdvmvphiw.usemoralis.com:2053/server", appId : "sSsiTKzENTtcuPHSevX2HUyGc4qoYCtX24VOJNf0" });
const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  position: relative;
  font-family: 'Poppins', sans-serif !important;
    z-index: 1;
    min-width: 200px;
    height: 48px;
    line-height: 48px;
    font-size: 12px;
    font-weight: 600;
    border: none;
    letter-spacing: 1px;
    display: inline-block;
    padding: 0 20px;
    text-align: center;
    text-transform: uppercase;
    background-size: 200% auto;
    color: #fff;
    box-shadow: 0 3px 20px rgb(0 0 0 / 10%);
    border-radius: 10px;
    background-image: linear-gradient(
130deg, #FF7701 0%, #f0a80e 50%, #FF7701 100%);
    -webkit-transition: all 500ms;
    cursor:pointer;
    transition: all 500ms;
    margin:0px 5px;
    display: inline-flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    margin-bottom:14px;
    align-items: center;
      :hover {
      background-position: right center;
      color: #fff;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  z-index:2;
  align-items:center;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  z-index:2
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImgGif = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 0px dashed var(--primary);
  background-color: var(--accent);
  border-radius: 7px;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  @media(max-width: 767px){
    width: 300px;
  }
  @media(max-width: 550px){
    width: 100%;
  }
  transition: width 0.5s;
`;

export const StyledImgGifBottom = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 0px dashed var(--primary);
  background-color: var(--accent);
  border-radius: 7px;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  @media(max-width: 767px){
    display:none;
  }
  transition: width 0.5s;
`;

export const StyledImgbutton = styled.img`
  max-height: 30px;
  max-width: 30px;
  width: 100%;
`;

export const StyledLink = styled.a`
  color: var(--primary);
  text-decoration: none;
`;

export const MovingBG = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 500em;
  height: 80%;
  opacity: 0.2;
  visibility: inherit;
  background: transparent url(/config/images/crypto.png) repeat-x scroll 0 100%;
  -webkit-animation: cloudwash 60s linear infinite;
  -moz-animation: cloudwash 60s linear infinite;
  animation: cloudwash 60s linear infinite;
  top: 0;
  z-index: 0;
  @-webkit-keyframes cloudwash {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0); 
      }
    100% {
      -webkit-transform: translate3d(-50%, 0, 0);
      transform: translate3d(-50%, 0, 0); 
      } 
  }
  @keyframes cloudwash {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0); }
    100% {
      -webkit-transform: translate3d(-50%, 0, 0);
      transform: translate3d(-50%, 0, 0); } 
  }
`;

const StyledModal = Modal.styled`
    height: 100%;
    width:auto;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${(props) => props.opacity};
    transition : all 0.3s ease-in-out;
    @media (min-width: 992px){
      width: 500px;
      margin: 1.75rem auto;
    }
    @media (max-width: 767px){
      width: 400px;
      margin: 1.75rem auto;
    }
    @media (max-width: 576px){
      width: 350px;
      margin: 1.75rem auto;
    }
    `;

const abi = () => {
  return async (dispatch) => {
    const abiResponse = await fetch("/config/abi.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    await abiResponse.json()
  }
}

function fixURL(url){
  if(url.startsWith("ipfs")){
    return "https://ipfs.moralis.io:2053/ipfs/"+url.split("ipfs://ipfs/").slice(-1)[0];
  }else{
    return url+"?format=json";
  }
}

function FancyModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });
  const [btnImgNft, setBtnImgNft] = useState([]);

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  const myNFT = async () => {
    const address = blockchain.account;
    const options = { address: address, chain: "BSC Testnet" };
    const metaData = await Moralis.Web3.getNFTs(options);
    var buttonnft = "";
    // metaData.map(function(nft){
    //   let url = fixURL(nft.token_uri);

    //   buttonnft += '<a href="https://testnet.bscscan.com/token/'+CONFIG.CONTRACT_ADDRESS+'?a='+nft.token_id+'" target="_blank" className="btnmynft">'+nft.name+ '('+nft.symbol+' - '+nft.token_id+')</a>';
     
      // fetch(url)
      // .then(response => response.json())
      // .then(data => {
      //   fixURL(data.image);
      // })
    // })
    
    if(metaData.length > 0){
      const posts = metaData.map((nft, i) => fixURL(nft.token_uri, nft.token_id).then(img => {
        return <a href={"https://testnet.bscscan.com/token/"+CONFIG.CONTRACT_ADDRESS+"?a="+nft.token_id} target="_blank" className="btnmynft"><div className="title">{nft.name} ({nft.symbol} - {nft.token_id})</div><img src={img} /></a>;
        })
      );
      Promise.all(posts).then(values => {setBtnImgNft([...btnImgNft, values])});
    }else{
      setBtnImgNft([...btnImgNft, "NFT NOT FOUND"])
    }

    return buttonnft;
  }

  useEffect(() => {
    myNFT()
  }, []);

  async function fixURL(url, id){
    const myArray = url.split("/");
    const metadata = 'https://gateway.pinata.cloud/ipfs/'+myArray[4]+'/'+id+'.json';
    
    return fetch(metadata)
    .then((response) => response.json())
    .then((responseJson) => {
        const myArrayresponse = responseJson.image.split("/");
        return "https://gateway.pinata.cloud/ipfs/"+myArrayresponse[2]+"/"+myArrayresponse[3];
    })
    .catch((error) => {
       return "images/icon.png";
    });
  }

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }
  
  return (
    <div>
      <StyledButton onClick={toggleModal}
        style={{
          justifyContent: 'center',
        }}
      > 
        MY NFT
      </StyledButton>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLiveLabel">MY NFT</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggleModal}>
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
            <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
              <s.Container flex={1} jc={"center"} ai={"center"}>
              {btnImgNft}
              </s.Container>
              </ResponsiveWrapper>
            </div>
          </div>
      </StyledModal>
    </div>
  );
}

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [valuecheckbox, setCheckbox] = useState(true);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        // console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        // console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit MY NFT to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 100) {
      newMintAmount = 100;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--background)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
      <MovingBG>
      </MovingBG>
        <StyledLogo alt={"logo"} src={"/config/images/salmon.svg"} />
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImgGif alt={"example"} src={"/config/images/example.gif"} />
          </s.Container>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "var(--accent)",
              padding: 24,
              borderRadius: 7,
              border: "4px dashed var(--primary)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)",
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK} style={{ margin: 10}}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
              <StyledLink target={"_blank"} href={CONFIG.FAUCET} style={{ margin: 10}}>
                Link Faucet BNB Testnet
              </StyledLink>
            </s.TextDescription>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL} + {CONFIG.GAS_FEE} {CONFIG.NETWORK.SYMBOL}
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Excluding gas fee.
                </s.TextDescription>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"} style={{
                        display: "block",
                        textAlign: "center",
                      }}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      Metamask 
                      <StyledImgbutton
                          alt={"Metamask"}
                          src={"/config/images/wallet/metamask.svg"}
                        />
                    </StyledButton>
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(walletconnectcall());
                        getData();
                      }}
                    >
                      Wallet Connect 
                      <StyledImgbutton
                          alt={"WalletConnect"}
                          src={"/config/images/wallet/walletconnect.svg"}
                        />
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <Checkbox
                      label=''
                      value={!valuecheckbox}
                      checked={!valuecheckbox}
                      onChange={({ target }) => setCheckbox(!valuecheckbox)}
                    />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton 
                        className="buyNFTBTN"
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                        style={{
                          justifyContent: 'center',
                        }}
                        value={valuecheckbox}
                        disabled={valuecheckbox}
                      >
                        {claimingNft ? "BUSY" : "BUY"}
                      </StyledButton>
                       <ModalProvider backgroundComponent={FadingBackground}>
                        <div className="App">
                          <FancyModalButton />
                        </div>
                      </ModalProvider>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImgGifBottom
              alt={"example"}
              src={"/config/images/example.gif"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME}) and the correct address. Please note:
            Once you make the purchase, you cannot undo this action.
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            We have set the gas limit to {CONFIG.GAS_LIMIT} for the contract to
            successfully mint your NFT. We recommend that you don't lower the
            gas limit.
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;
