import React, {createContext, useState} from 'react';

export const SignInContext = createContext<{
  isConnect: boolean;
  setIsConnect: React.Dispatch<React.SetStateAction<boolean>>;
  isWelcome: boolean;
  setIsWelcome: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isConnect: false,
  setIsConnect: () => {},
  isWelcome: false,
  setIsWelcome: () => {},
});

export const SignInContextProvider = (props: any) => {
  //

  const [isConnect, setIsConnect] = useState(false);
  const [isWelcome, setIsWelcome] = useState(false);

  return (
    <SignInContext.Provider
      value={{isConnect, setIsConnect, isWelcome, setIsWelcome}}>
      {props.children}
    </SignInContext.Provider>
  );
};
