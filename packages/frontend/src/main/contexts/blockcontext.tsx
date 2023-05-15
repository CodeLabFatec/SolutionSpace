import { CircularProgress } from "@mui/material";
import { createContext, useState } from "react";
import BlockUi from "react-block-ui";

export const BlockContext = createContext({} as any)

export const BlockProvider = ({ children }: any) => {

    const [block,setBlock] = useState(false)

    return (
        <BlockContext.Provider value={{ block, setBlock }}>
            <BlockUi keepInView loader={<CircularProgress />} blocking={block}>
                {children}
            </BlockUi>
        </BlockContext.Provider>
    )
}