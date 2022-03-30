import React, { useState } from "react";
import "./styles.css";
import { useCallback } from "react";

// 1. Prevenet the re-render of the preloaded counter buttons
//ok

//2. The app will have one page, the Contacts Page.
//Contact entity contains: firstName, lastName, email, phone.

// Contacts Page needs to contain:
// - header with search field + Add Contact button
// - table with contacts:
//     - columns for each field + Actions for Edit/Delete
//     - Add/Edit Contact dialog
//     - confirm Delete Contact dialog

// All CRUD actions need to be linked to store;

// The following should be used:
// - validators for email/phone
// - use of store

export default function App() {
  const [countUp, setCountUp] = useState(0);
  const [countDown, setCountDown] = useState(0);

  const onCountUp = useCallback(() => setCountUp((c) => c + 1), []);
  const onCountDown = useCallback(() => setCountDown((c) => c - 1), []);

  return (
    <div className="App">
      {/* 2. The contatcts page app goes here */}

      <h2>Counter buttons</h2>
      {/* 1. The contatcts page app goes here */}
      <h1>Count UP: {countUp}</h1>
      <h1>Count Down:{countDown}</h1>

      <CountButtonMemo onClick={onCountUp} >Count Up</CountButtonMemo>
      <CountButtonMemo onClick={onCountDown}>Count Down</CountButtonMemo>
    </div>
  );
}

const Clicker = (props) => {
  console.log("render Clicker", JSON.stringify(props));
  return <button onClick={props.onClick}>{props.children}</button>;
};
const CountButtonMemo = React.memo(Clicker);
