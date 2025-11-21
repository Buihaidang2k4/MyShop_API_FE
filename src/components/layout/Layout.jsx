import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                   <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}