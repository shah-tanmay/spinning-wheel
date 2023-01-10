import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Wheel } from "react-custom-roulette";
import "./index.css";
//@ts-ignore
import SpinningSound from "../../components/spin-audio.mp3";
//@ts-ignore
import CheeringSound from "../../components/cheering.mp3";
import useSound from "use-sound";
import CustomModal from "../Modal";

const data = [
  { option: "₹10,000", style: { backgroundColor: "#fe5284" } },
  { option: "₹5,000", style: { backgroundColor: "#988cfa" } },
  { option: "₹2,000", style: { backgroundColor: "#f9c160" } },
  { option: "₹1,000", style: { backgroundColor: "#e55b50" } },
  { option: "₹500", style: { backgroundColor: "#70bf42" } },
];

let priceMoneyArray = Array(28).fill(500);
priceMoneyArray.push(10000);
for (let i = 0; i < 12; i++) priceMoneyArray.push(1000);
for (let i = 0; i < 6; i++) priceMoneyArray.push(2000);
for (let i = 0; i < 3; i++) priceMoneyArray.push(5000);

const CustomWheel = () => {
  const [spin, setSpin] = useState<boolean>(false);
  const [priceNumber, setPriceNumber] = useState<number>(1);
  const [complete, setComplete] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [playSpinSound] = useSound(SpinningSound);
  const [playCheeringSound, { stop }] = useSound(CheeringSound);

  useEffect(() => {
    if (localStorage.getItem("counter") === null) {
      localStorage.setItem("counter", (50 - priceMoneyArray.length).toString());
    }
    if (localStorage.getItem("prizeMoney") !== null) {
      priceMoneyArray = [];
      priceMoneyArray = JSON.parse(localStorage.getItem("prizeMoney")!);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setComplete(false), 3000);
  }, [complete]);

  const getPriceNumber = (priceMoney: number) => {
    if (priceMoney === 500) return 4;
    if (priceMoney === 1000) return 3;
    if (priceMoney === 2000) return 2;
    if (priceMoney === 5000) return 1;
    if (priceMoney === 10000) return 0;
  };

  const randomInteger = () =>
    Math.floor(Math.random() * priceMoneyArray.length);

  const getPriceMoney = () => {
    if (priceMoneyArray.length === 0) {
      alert("50 spins over");
      return;
    }
    playSpinSound();
    setIsOpen(false);
    const index = randomInteger();
    const priceMoney = priceMoneyArray[index];
    priceMoneyArray.splice(index, 1);
    const priceNumber = getPriceNumber(priceMoney);
    setSpin(true);
    setPriceNumber(priceNumber!);
    localStorage.setItem("counter", (50 - priceMoneyArray.length).toString());
    localStorage.setItem("prizeMoney", JSON.stringify(priceMoneyArray));
  };

  const getPriceMoneyFromPriceNumber = () => {
    if (priceNumber === 0) return 10000;
    if (priceNumber === 1) return 5000;
    if (priceNumber === 2) return 2000;
    if (priceNumber === 3) return 1000;
    if (priceNumber === 4) return 500;
  };
  return (
    <div style={{ marginTop: "205px" }}>
      <Confetti numberOfPieces={isOpen ? 500 : 0} />
      <div style={isOpen ? { zIndex: "-10", position: "relative" } : {}}>
        <Wheel
          mustStartSpinning={spin}
          prizeNumber={priceNumber}
          data={data}
          onStopSpinning={() => {
            setSpin(false);
            playCheeringSound();
            setIsOpen(true);
            setComplete(true);
          }}
          spinDuration={0.52}
          fontSize={30}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            getPriceMoney();
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "316px",
            alignItems: "center",
          }}
          className="button"
          disabled={spin}
        >
          Spin 2 Win
        </button>
      </div>
      <CustomModal
        closeModal={() => {
          setIsOpen(false);
          stop();
        }}
        isOpen={isOpen}
        price={getPriceMoneyFromPriceNumber()!}
      />
    </div>
  );
};



export default CustomWheel;
