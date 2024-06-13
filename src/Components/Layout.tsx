import { Card } from "./Card";
import { Header } from "./Header";

export const Layout = ({children}: any) => {
    return (
        <>
        <Header />
          <Card />
            {children}
        </>
    )
}
