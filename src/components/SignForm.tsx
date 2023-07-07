import { useAccount, useNetwork, useSignTypedData } from "@starknet-react/core";
import { FormEvent, useState } from "react";
import { typedData } from "starknet";
import "./SignForm.css";

export default function SignForm() {
  const [showSign, setShowSign] = useState(false);
  const [message, setMessage] = useState("");
  const [secretWord, setSecretWord] = useState("");
  const [messageSigned, setMessageSigned] = useState(false);
  const [signatureDetails, setSignatureDetails] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  // Prepare the message to sign
  const typedMessage: typedData.TypedData = {
    types: {
      StarkNetDomain: [
        { name: "name", type: "string" },
        { name: "version", type: "felt" },
        { name: "chainId", type: "felt" },
      ],
      Message: [
        { name: "message", type: "string" },
        { name: "secretWord", type: "string" },
      ],
    },
    primaryType: "Message",
    domain: {
      name: "Starknet Source app",
      version: "1",
      chainId: chain ? chain.id.toString() : "SN_GOERLI",
    },
    message: {
      message,
      secretWord,
    },
  };

  // Hook to sign the message
  const { data, signTypedData } = useSignTypedData(typedMessage);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    // Check if the user is logged in (simulated)
    if (isConnected) {
      // Perform the authentication process here (simulated)
      // For example, check if the message and secretWord match the expected values
      const expectedMessage = "Hello";
      const expectedSecretWord = "Secret";

      if (message === expectedMessage && secretWord === expectedSecretWord) {
        // Simulated authentication success
        alert("Message successfully signed!");

        // Sign the message
        await signTypedData();

        // Set messageSigned to true
        setMessageSigned(true);

        // Store the signature details in the state
        setSignatureDetails(data);
      } else {
        // Simulated authentication failure
        alert("Authentication failed. Invalid message or secret word.");
      }
    } else {
      // User is not logged in, show an error or redirect to the login page
      alert("Please log in to perform the authentication.");
    }
  }

  function handleDetailsClick() {
    setShowDetails(true);
  }

  function handleCloseDetails() {
    setShowDetails(false);
  }

  return (
    <div className="ml-auto">
      <button type="button" onClick={() => setShowSign(!showSign)}>
        Sign a message
      </button>
      {showSign && (
        <div className="sign-form-overlay">
          <div className="sign-form">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="message"
                placeholder="Sign this"
                value={message}
                required
                onChange={(evt) => setMessage(evt.target.value)}
              />
              <input
                type="text"
                name="secretWord"
                placeholder="Secret word"
                value={secretWord}
                required
                onChange={(evt) => setSecretWord(evt.target.value)}
              />
              <button type="submit" className="btn">
                Sign
              </button>
              <button
                type="button"
                className="underline"
                onClick={() => setShowSign(!showSign)}
              >
                Close
              </button>
              {messageSigned && (
                <>
                  <p>Message has been signed successfully!</p>
                  <button
                    type="button"
                    className="underline"
                    onClick={handleDetailsClick}
                  >
                    View details
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
      {showDetails && (
        <div className="details-overlay">
          <div className="details">
            <p>Signature Details:</p>
            {signatureDetails && (
              <div className="signature-details">
                <p>Signature Points: {signatureDetails[0]}</p>
                <p>Output Hash: {signatureDetails[1]}</p>
              </div>
            )}
            <button className="close-button" onClick={handleCloseDetails}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
