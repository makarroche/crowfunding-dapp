import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useNetwork } from "wagmi";

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();
  const { connect, error } = useConnect({
    connector: new InjectedConnector(),
  });

  //Cuando se conecta pedir approve

  useEffect(() => {
   enabled === true ? connect(): disconnect();
  }, [enabled]);

  const { chain } = useNetwork();

  if (isConnected)
    return (
      <div className="py-1.5">
        {chain && (
          <div className="">
            <div className="py-7">
                Connected address:{" "}
                <span className="connectedSuccessfully text-emerald-400">{ensName ?? address} </span>
                <br></br>Network: <span className="connectedNetwork text-emerald-400">{chain.name}</span>
            </div>
          </div>
        )}
        <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`mx-3 ${
          enabled ? "bg-purple-600" : "bg-purple-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <span className="pb-2">Disconnect Wallet</span>
      </div>
    );

  return (
    <>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`mx-3 mt-7 ${
          enabled ? "bg-purple-600" : "bg-purple-200"
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            enabled ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <span>Connect Wallet</span>
    </>
  );
};

export default Toggle;
